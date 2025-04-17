import { z } from 'zod';
import { ErrorMessage } from '@/constant/errorMessage';
import { createApiResponseSchema } from '@/schemas/api/generic.schema';
import { CustomHttpError } from './error';

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

export const handleServerResponse = async <R>(
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
    throw new CustomHttpError(error.status || 500, error.message);
  }
};
