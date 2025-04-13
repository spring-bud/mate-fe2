import { ErrorMessage } from '@/constant/errorMessage';
import { z } from 'zod';
import { createApiResponseSchema } from '@/schemas/api/generic.schema';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 쿠키에서 액세스 토큰을 가져오는 함수
const getAccessToken = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;

  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    ?.split('=')[1];
};

// 헤더 생성 함수로 변경
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

// 기존 정적 헤더 대신 함수를 사용하도록 변경
export let apiHeaders = getApiHeaders();

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
  const contentType = res.headers.get('Content-Type');
  if (!contentType) {
    throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR);
  }

  if (contentType.includes('application/json')) {
    return res.json();
  }

  throw new Error(`Unsupported response type: ${contentType}`);
};

const handleResponse = async <R>(
  res: Response,
  schema?: z.ZodType<R>
): Promise<R> => {
  try {
    const responseBody = await parseResponseData(res);

    if (res.ok) {
      if (schema) {
        try {
          const apiSchema = createApiResponseSchema(schema);
          const validated = apiSchema.parse(responseBody);
          return validated.data as R;
        } catch (validationError) {
          console.error('Schema validation error:', validationError);
          throw new Error('API response format is invalid');
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

    let errorMessage = responseBody;

    if (
      responseBody &&
      typeof responseBody === 'object' &&
      'message' in responseBody
    ) {
      errorMessage = responseBody.message;
    } else if (res.status === 404) {
      errorMessage = ErrorMessage.BAD_REQUEST;
    }

    throw new CustomHttpError(res.status, errorMessage);
  } catch (error: any) {
    if (typeof window !== 'undefined') {
      throw new CustomHttpError(error.status || 500, error.message);
    }
    return res.status as R;
  }
};

// 커스텀 HTTP 에러
export class CustomHttpError extends Error {
  status: number;

  constructor(status: number, message: any) {
    super(typeof message === 'string' ? message : JSON.stringify(message));
    this.status = status;
    this.name = 'CustomHttpError';
  }
}

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

      // 요청 직전에 최신 헤더 가져오기
      apiHeaders = getApiHeaders();

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

      return handleResponse<R>(res, schema);
    } catch (error: any) {
      throw new CustomHttpError(
        error.status || 500,
        error.message || ErrorMessage.NETWORK_ERROR
      );
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

      return handleResponse<R>(res, schema);
    } catch (error: any) {
      throw new CustomHttpError(
        error.status || 500,
        error.message || ErrorMessage.NETWORK_ERROR
      );
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

      return handleResponse<R>(res, schema);
    } catch (error: any) {
      throw new CustomHttpError(
        error.status || 500,
        error.message || ErrorMessage.NETWORK_ERROR
      );
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

      return handleResponse<R>(res, schema);
    } catch (error: any) {
      throw new CustomHttpError(
        error.status || 500,
        error.message || ErrorMessage.NETWORK_ERROR
      );
    }
  },
};

export default apiClient;
