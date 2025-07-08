import { z } from 'zod';
import { userSchema } from './user.schema';

export const FreeLancerSearchBodySchema = z.object({
  jobtype: z.string().optional(),
  nickname: z.string().optional(),
  tag: z.array(z.string()).optional(),
  size: z.number().optional(),
  page: z.number().optional(),
});

export type FreeLancerSearchBody = z.infer<typeof FreeLancerSearchBodySchema>;

export const FreeLancerSearchResponseSchema = z.object({
  content: z.array(userSchema),
  current_page: z.number(),
  has_next: z.boolean(),
});

export type FreeLancerSearchResponse = z.infer<
  typeof FreeLancerSearchResponseSchema
>;
