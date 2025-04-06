import { z } from 'zod';
import { createApiResponseSchema } from './generic.schema';

export const uploadImageResponseDataSchema = z.object({
  image_url: z.string().url(),
});

export const uploadImageResponseSchema = createApiResponseSchema(
  uploadImageResponseDataSchema
);

export type UploadImageResponseData = z.infer<
  typeof uploadImageResponseDataSchema
>;
export type UploadImageResponse = z.infer<typeof uploadImageResponseSchema>;
