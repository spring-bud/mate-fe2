import { z } from 'zod';

// 스택 스키마 정의
export const stackSchema = z.object({
  stack_id: z.number(),
  name: z.string(),
});

// API 사용자 스키마 정의 (서버에서 받는 데이터 타입)
export const userSchema = z.object({
  user_id: z.number(),
  nickname: z.string(),
  profile_url: z.string().url(),
  job_type: z.string().nullable(),
  job_year: z.number().int().positive().nullable(),
  intro: z.string().nullable(),
  email: z.string().email().nullable(),
  contact: z.string().nullable(),
  github_url: z.string().url().nullable().optional(),
  blog_url: z.string().url().nullable().optional(),
  user_stacks: z.array(stackSchema),
  info_active: z.boolean().optional(),
});

export type Stack = z.infer<typeof stackSchema>;
export type User = z.infer<typeof userSchema>;
