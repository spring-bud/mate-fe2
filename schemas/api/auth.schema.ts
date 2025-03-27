import { z } from "zod";

export const reissueResponseSchema = z.object({
  access_token: z.string(),
});

export type ReissueResponse = z.infer<typeof reissueResponseSchema>;
