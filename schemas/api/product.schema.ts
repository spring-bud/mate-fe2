import { z } from 'zod';

export const productResponseSchema = z.object({
  product_id: z.number(),
});

// Tag 스키마
const TagSchema = z.object({
  tag_id: z.number(),
  name: z.string(),
});

// 유저 정보 스키마
const UserSchema = z.object({
  user_id: z.number(),
  nickname: z.string(),
  profile_url: z.string().url(),
});

// 카운트 스키마
const CountSchema = z.object({
  like_count: z.number(),
  review_count: z.number(),
});

// 제품 상태 enum
const ProductStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'PENDING', 'SOLD']);

// 제품 카테고리 enum
const ProductCategoryEnum = z.enum(['DEVELOP', 'DESIGN', 'MARKETING', 'OTHER']);

// 제품 상세 스키마
export const ProductDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  thumbnail_url: z.string().url(),
  category: ProductCategoryEnum,
  status: ProductStatusEnum,
  product_tags: z.array(TagSchema),
  owner: UserSchema,
  count: CountSchema,
  is_liked: z.boolean(),
});
