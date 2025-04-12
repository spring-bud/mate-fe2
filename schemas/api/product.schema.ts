import { z } from 'zod';

export const productResponseSchema = z.object({
  product_id: z.number(),
});
