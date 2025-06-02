import { z } from 'zod';

// 리뷰 항목 스키마
const ReviewItemSchema = z.object({
  id: z.number(),
  star: z.number().min(0).max(5),
  review_user_id: z.number(),
  content: z.string(),
  nickname: z.string().optional(),
  profile_url: z.string().url().optional(),
});

export type ReviewItemType = z.infer<typeof ReviewItemSchema>;

const ReviewItemsArraySchema = z.array(ReviewItemSchema).nullable();

// 리뷰 생성 요청 스키마
const CreateReviewRequestSchema = z.object({
  star: z.number().min(0).max(5),
  content: z.string(),
});

export type CreateReviewRequest = z.infer<typeof CreateReviewRequestSchema>;

// 리뷰 수정 요청 스키마
const UpdateReviewRequestSchema = z.object({
  id: z.number(),
  star: z.number().min(0).max(5),
  content: z.string(),
});

const CreateReviewResponseSchema = UpdateReviewRequestSchema;

export type CreateReviewResponse = z.infer<typeof UpdateReviewRequestSchema>;

export {
  ReviewItemSchema,
  CreateReviewRequestSchema,
  UpdateReviewRequestSchema,
  ReviewItemsArraySchema,
  CreateReviewResponseSchema,
};
