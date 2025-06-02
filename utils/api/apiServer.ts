'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { ErrorMessage } from '@/constant/errorMessage';
import { createApiResponseSchema } from '@/schemas/api/generic.schema';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getServerApiHeaders = async (): Promise<Headers> => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return headers;
};

const parseResponseData = async (res: Response) => {
  const contentType = res.headers.get('Content-Type');
  if (!contentType) {
    throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR);
  }

  if (contentType.includes('json')) {
    return res.json();
  }

  throw new Error(`Unsupported response type: ${contentType}`);
};

const handleServerResponse = async <R>(
  res: Response,
  schema?: z.ZodType<R>
): Promise<R> => {
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

  // 에러 응답 처리
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

  // 원본 Error 객체에 status 속성 추가
  const error = new Error(
    typeof errorMessage === 'string'
      ? errorMessage
      : JSON.stringify(errorMessage)
  );
  (error as any).status = res.status;
  throw error;
};

export const apiServerGet = async <R>(
  path: string,
  options?: {
    params?: Record<string, any>;
    schema?: z.ZodType<R>;
  }
): Promise<R> => {
  const { params, schema } = options || {};
  let fullPath = path;

  const apiHeaders = await getServerApiHeaders();

  if (params) {
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(
          ([, v]) => v !== undefined && !(typeof v === 'number' && isNaN(v))
        )
        .map(([k, v]) => [k, String(v)])
    ).toString();

    if (queryString) {
      fullPath += (fullPath.includes('?') ? '&' : '?') + queryString;
    }
  }

  const res = await fetch(`${BASE_URL}${fullPath}`, {
    method: 'GET',
    headers: apiHeaders,
    next: { revalidate: 0 },
  });

  return await handleServerResponse<R>(res, schema);
};

export const apiServerPost = async <R, P = any>(
  path: string,
  options?: {
    params?: P;
    schema?: z.ZodType<R>;
  }
): Promise<R> => {
  const { params, schema } = options || {};
  const apiHeaders = await getServerApiHeaders();

  let body;
  if (params instanceof FormData) {
    // Form데이터 예외처리위한 헤더 삭제(브라우저 자동설정)
    apiHeaders.delete('Content-Type');
    body = params;
  } else if (params) {
    body = JSON.stringify(params);
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: apiHeaders,
    body,
    next: { revalidate: 0 },
  });

  return await handleServerResponse<R>(res, schema);
};
