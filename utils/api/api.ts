import { ErrorMessage } from '@/constant/errorMessage';
import { z } from 'zod';
import { createApiResponseSchema } from '@/schemas/api/generic.schema';
import { reissueResponseSchema } from '@/schemas/api/auth.schema';
import { getTokenRemainingTime } from '@/utils/jwt';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 토큰 재발급 관련 변수들
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// 쿠키에서 액세스 토큰을 가져오는 함수
export const getAccessToken = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;

  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    ?.split('=')[1];
};

// 🎯 특정 조건 체크 함수 - GET 요청이고 products detail URL인 경우
const shouldUseCookieAuth = (method: string, path: string): boolean => {
  return (
    method === 'GET' &&
    path.includes('/products/') &&
    /\/products\/\d+$/.test(path)
  );
};

// 기본 헤더 생성 함수 (Authorization 방식)
export const getApiHeaders = (): Headers => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  // 액세스 토큰이 있으면 Authorization 헤더에 추가
  const accessToken = getAccessToken();
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return headers;
};

// 쿠키 헤더 생성 함수 (특수한 경우용)
export const getCookieHeaders = (): Headers => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  // 액세스 토큰이 있으면 Cookie 헤더에 추가
  const accessToken = getAccessToken();
  if (accessToken) {
    headers.set('Cookie', `access_token=${accessToken}`);
  }

  return headers;
};

// 헤더 변수 (매 요청마다 업데이트됨)
export let apiHeaders = getApiHeaders();

// 토큰 재발급 함수
const refreshAccessToken = async (): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/auth/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 리프레시 토큰이 쿠키에 있으므로
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    const apiResponseSchema = createApiResponseSchema(reissueResponseSchema);
    const validatedData = apiResponseSchema.parse(data);
    const access_token = validatedData.data.access_token;

    // 쿠키에 새 토큰 저장 (클라이언트 사이드에서만)
    if (typeof document !== 'undefined') {
      const maxAge = getTokenRemainingTime(access_token);
      document.cookie = `access_token=${access_token}; path=/; max-age=${maxAge}; samesite=lax; ${
        process.env.NODE_ENV === 'production' ? 'secure;' : ''
      }`;
    }

    return access_token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};

const handleMutateRequest = <P>(params: P) => {
  const isFormData = params instanceof FormData;
  let body;

  // 최신 헤더 가져오기
  apiHeaders = getApiHeaders();

  if (isFormData) {
    apiHeaders.delete('Content-Type');
    body = params as FormData;
  } else {
    apiHeaders.set('Content-Type', 'application/json');
    body = JSON.stringify(params);
  }

  return { body };
};

const parseResponseData = async (res: Response) => {
  if (res.status === 204) {
    return null;
  }

  const contentType = res.headers.get('Content-Type');
  if (!contentType) {
    throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR);
  }

  if (contentType.includes('application/json')) {
    return res.json();
  }

  throw new Error(`Unsupported response type: ${contentType}`);
};

// 응답 처리 함수
const handleResponse = async <R>(
  res: Response,
  schema?: z.ZodType<R>,
  requestOptions?: {
    method: string;
    path: string;
    params?: any;
    requestInit?: RequestInit;
  }
): Promise<R> => {
  try {
    // 204코드 처리
    if (res.status === 204) {
      return {} as R;
    }

    // 401 에러 처리 로직
    if (res.status === 401) {
      let errorData;
      try {
        errorData = await res.json();
      } catch (e) {
        errorData = { message: '인증 오류가 발생했습니다.' };
      }

      // 토큰 만료 확인 및 재요청 로직
      if (
        errorData?.message === '유효하지 않은 토큰 입니다' &&
        requestOptions
      ) {
        // 이미 토큰 갱신 중이면 대기
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              // 최신 헤더로 요청 재시도
              return apiClient[
                requestOptions.method.toLowerCase() as
                  | 'get'
                  | 'post'
                  | 'patch'
                  | 'delete'
              ]<R>(requestOptions.path, {
                params: requestOptions.params,
                schema,
                requestInit: requestOptions.requestInit,
              });
            })
            .catch((err) => Promise.reject(err));
        }

        // 토큰 갱신 프로세스 시작
        isRefreshing = true;

        try {
          // 여기서는 Promise를 저장해두고 재사용
          if (!refreshPromise) {
            refreshPromise = refreshAccessToken();
          }

          const newToken = await refreshPromise;
          refreshPromise = null;
          isRefreshing = false;

          // 대기 중인 요청 처리
          processQueue(null, newToken);

          // 현재 요청 재시도 (최신 헤더 사용)
          apiHeaders = getApiHeaders(); // 새로 발급된 토큰으로 헤더 갱신
          return apiClient[
            requestOptions.method.toLowerCase() as
              | 'get'
              | 'post'
              | 'patch'
              | 'delete'
          ]<R>(requestOptions.path, {
            params: requestOptions.params,
            schema,
            requestInit: requestOptions.requestInit,
          });
        } catch (refreshError) {
          isRefreshing = false;
          refreshPromise = null;
          processQueue(refreshError as Error);

          // 로그인 페이지로 이동
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }

          // 표준 에러 throw
          throw new Error('로그인이 필요합니다');
        }
      }

      // 인증 관련 에러
      throw new Error(errorData?.message || '인증되지 않았습니다');
    }

    const responseBody = await parseResponseData(res);

    if (res.ok) {
      if (responseBody === null) {
        return {} as R;
      }
      if (schema) {
        try {
          const apiSchema = createApiResponseSchema(schema);
          const validated = apiSchema.parse(responseBody);
          return validated.data as R;
        } catch (validationError) {
          console.error('스키마 검증 오류:', validationError);
          throw new Error('API 응답 형식이 유효하지 않습니다');
        }
      } else {
        // 스키마가 없는 경우, data 필드 자동 추출
        if (
          responseBody &&
          typeof responseBody === 'object' &&
          'data' in responseBody
        ) {
          return responseBody.data as R;
        }
        return responseBody as R;
      }
    }

    // 오류 응답 처리
    let errorMessage = responseBody;

    if (
      responseBody &&
      typeof responseBody === 'object' &&
      'message' in responseBody
    ) {
      errorMessage = responseBody.message;
    } else if (res.status === 404) {
      errorMessage = '요청한 리소스를 찾을 수 없습니다';
    }

    // 표준 Error 객체로 throw
    throw new Error(errorMessage);
  } catch (error: any) {
    // 네트워크 오류 등 처리
    if (typeof window !== 'undefined') {
      throw new Error(error.message || '네트워크 오류가 발생했습니다');
    }
    return res.status as R;
  }
};

// API 요청 메서드
export const apiClient = {
  get: async <R>(
    path: string,
    options?: {
      params?: Record<string, any>;
      schema?: z.ZodType<R>;
      requestInit?: RequestInit;
    }
  ): Promise<R> => {
    try {
      const { params, schema, requestInit } = options || {};
      let fullPath = path;

      //  특정 조건일 때 쿠키 헤더 사용, 아니면 기본 헤더 사용
      apiHeaders = shouldUseCookieAuth('GET', path)
        ? getCookieHeaders() // 🍪 Cookie: access_token=...
        : getApiHeaders(); // 🔑 Authorization: Bearer ...

      if (params) {
        const filteredParams: Record<string, string> = Object.fromEntries(
          Object.entries(params)
            .filter(
              ([, value]) =>
                (typeof value === 'number' && !isNaN(value)) ||
                value !== undefined
            )
            .map(([key, value]) => [key, String(value)])
        );
        const queryString = new URLSearchParams(filteredParams).toString();
        if (queryString) {
          fullPath += (fullPath.includes('?') ? '&' : '?') + queryString;
        }
      }

      const res = await fetch(`${BASE_URL}${fullPath}`, {
        method: 'GET',
        headers: apiHeaders,
        credentials: 'include',
        ...requestInit,
      });

      return handleResponse<R>(res, schema, {
        method: 'GET',
        path,
        params,
        requestInit,
      });
    } catch (error: any) {
      throw new Error(error.message || '네트워크 요청 중 오류가 발생했습니다');
    }
  },

  post: async <R>(
    path: string,
    options?: {
      params?: any;
      schema?: z.ZodType<R>;
      requestInit?: RequestInit;
    }
  ): Promise<R> => {
    try {
      const { params, schema, requestInit } = options || {};
      const { body } = handleMutateRequest(params);

      const res = await fetch(`${BASE_URL}${path}`, {
        method: 'POST',
        headers: apiHeaders,
        body,
        credentials: 'include',
        ...requestInit,
      });

      return handleResponse<R>(res, schema, {
        method: 'POST',
        path,
        params,
        requestInit,
      });
    } catch (error: any) {
      throw new Error(error.message || '네트워크 요청 중 오류가 발생했습니다');
    }
  },

  patch: async <R>(
    path: string,
    options?: {
      params?: any;
      schema?: z.ZodType<R>;
      requestInit?: RequestInit;
    }
  ): Promise<R> => {
    try {
      const { params, schema, requestInit } = options || {};
      const { body } = handleMutateRequest(params);

      const res = await fetch(`${BASE_URL}${path}`, {
        method: 'PATCH',
        headers: apiHeaders,
        body,
        credentials: 'include',
        ...requestInit,
      });

      return handleResponse<R>(res, schema, {
        method: 'PATCH',
        path,
        params,
        requestInit,
      });
    } catch (error: any) {
      throw new Error(error.message || '네트워크 요청 중 오류가 발생했습니다');
    }
  },

  delete: async <R>(
    path: string,
    options?: {
      params?: any;
      schema?: z.ZodType<R>;
      requestInit?: RequestInit;
    }
  ): Promise<R> => {
    try {
      const { params, schema, requestInit } = options || {};
      const { body } = handleMutateRequest(params);

      const res = await fetch(`${BASE_URL}${path}`, {
        method: 'DELETE',
        headers: apiHeaders,
        body,
        credentials: 'include',
        ...requestInit,
      });

      return handleResponse<R>(res, schema, {
        method: 'DELETE',
        path,
        params,
        requestInit,
      });
    } catch (error: any) {
      throw new Error(error.message || '네트워크 요청 중 오류가 발생했습니다');
    }
  },
};

export default apiClient;
