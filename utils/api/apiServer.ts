'use server';

import { z } from 'zod';
import { getServerApiHeaders } from './header';
import { handleServerResponse } from './response';
import { CustomHttpError } from './error';
import { ErrorMessage } from '@/constant/errorMessage';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiServerGet = async <R>(
  path: string,
  options?: {
    params?: Record<string, any>;
    schema?: z.ZodType<R>;
  }
): Promise<R> => {
  try {
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
  } catch (error: any) {
    throw new CustomHttpError(
      error.status || 500,
      error.message || ErrorMessage.NETWORK_ERROR
    );
  }
};

export const apiServerPost = async <R, P = any>(
  path: string,
  options?: {
    params?: P;
    schema?: z.ZodType<R>;
  }
): Promise<R> => {
  try {
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
  } catch (error: any) {
    throw new CustomHttpError(
      error.status || 500,
      error.message || ErrorMessage.NETWORK_ERROR
    );
  }
};
