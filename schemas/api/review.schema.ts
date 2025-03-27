import { z } from "zod";
import { createApiResponseSchema } from "./generic.schema";

export const reviewBaseSchema = z.object({
  star: z.number().min(0).max(5),
  content: z.string(),
});

export const reviewItemSchema = reviewBaseSchema.extend({
  id: z.number(),
  nickname: z.string(),
  profile_url: z.string().url(),
});

// 리뷰 목록 스키마
export const reviewListSchema = z.array(reviewItemSchema);

// 요청 스키마 - 생성/수정
export const reviewRequestSchema = reviewBaseSchema;

// 응답 스키마 - 단일 리뷰 기본 필드에 대한 응답
export const reviewFieldsResponseSchema =
  createApiResponseSchema(reviewBaseSchema);

// 조회 관련 스키마들
export const getReviewListResponseSchema =
  createApiResponseSchema(reviewListSchema);
export const getReviewItemResponseSchema =
  createApiResponseSchema(reviewItemSchema);

// 타입 정의
export type ReviewBase = z.infer<typeof reviewBaseSchema>;
export type ReviewItem = z.infer<typeof reviewItemSchema>;
export type ReviewRequest = z.infer<typeof reviewRequestSchema>;
export type ReviewFieldsResponse = z.infer<typeof reviewFieldsResponseSchema>;
export type GetReviewListResponse = z.infer<typeof getReviewListResponseSchema>;
export type GetReviewItemResponse = z.infer<typeof getReviewItemResponseSchema>;

export type CreateReviewRequest = ReviewRequest;
export type PatchReviewRequest = ReviewRequest;
export type CreateReviewResponse = ReviewFieldsResponse;
export type PatchReviewResponse = ReviewFieldsResponse;
