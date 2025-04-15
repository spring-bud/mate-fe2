import { z } from 'zod';

// 스택 스키마 정의
export const stackSchema = z.object({
  stack_id: z.number(),
  name: z.string(),
});

// 사용자 스키마 정의
export const userSchema = z.object({
  user_id: z.number(),
  nickname: z.string(),
  profile_url: z.string().url(),
  job_type: z.string(),
  job_year: z.number().int().positive(),
  intro: z.string(),
  email: z.string().email(),
  contact: z.string(),
  github_url: z.string().url().optional(),
  blog_url: z.string().url().optional(),
  user_stacks: z.array(stackSchema),
});

// TypeScript 타입 정의
export type Stack = z.infer<typeof stackSchema>;

export type User = z.infer<typeof userSchema>;
