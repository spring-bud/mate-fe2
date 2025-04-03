import { z } from 'zod';

export const reissueResponseSchema = z.object({
  access_token: z.string(),
});

export const accessTokenPayloadSchema = z.object({
  user_id: z.number(),
  user_url: z.string().url(),
  user_nickname: z.string(),
  sub: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export type ReissueResponse = z.infer<typeof reissueResponseSchema>;
export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
