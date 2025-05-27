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
const ProductCategoryEnum = z.enum(['DEVELOP', 'DESIGN']);

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

// 제품 목록 아이템 스키마
export const ProductListItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  thumbnail_url: z.string().url(),
  category: ProductCategoryEnum,
  product_tags: z.array(TagSchema),
  created_at: z.string(),
  status: ProductStatusEnum, // status 지워져야함
  owner: UserSchema,
  count: CountSchema,
  is_liked: z.boolean(),
});

export type ProductListItem = z.infer<typeof ProductListItemSchema>;

// 제품 목록 응답 스키마
export const ProductListSchema = z.array(ProductListItemSchema);

// 제품 목록 응답 스키마 (페이징 포함)
export const ProductListResponseSchema = z.object({
  content: z.array(ProductListItemSchema),
  current_page: z.number(),
  has_next: z.boolean(),
});

export type ProductListResponseType = z.infer<typeof ProductListResponseSchema>;

// 태그 검색 응답 스키마
export const TagSearchResponseSchema = z.array(z.string());

// 인기 태그 아이템 스키마
export const PopularTagItemSchema = z.object({
  name: z.string(),
  count: z.number(),
});

// 인기 태그 응답 스키마
export const PopularTagsResponseSchema = z.array(PopularTagItemSchema);

// 검색 정렬 옵션 enum
export const SortOptionEnum = z.enum(['LIKE', 'CREATE']);

// 검색 파라미터 스키마
export const ProductSearchBodySchema = z.object({
  category: z.string().optional(),
  sort: z.string().optional(),
  tag: z.array(z.string()).optional(),
  title: z.string().optional(),
  size: z.number().optional().default(4),
  page: z.number().optional().default(0),
});

export type ProductSearchBody = z.infer<typeof ProductSearchBodySchema>;

// 태그 검색 파라미터 스키마
export const TagSearchBodySchema = z.object({
  tag: z.string(),
});

// 이전 이름과의 호환성을 위한 타입 별칭
export const ProductSearchParamsSchema = ProductSearchBodySchema;
export const TagSearchParamsSchema = TagSearchBodySchema;

export const ProductByFreeLancerSchema = z.object({
  id: z.number(),
  title: z.string(),
  thumbnail_url: z.string().url(),
  category: z.string(),
  created_at: z.string(),
  count: CountSchema,
});

export type ProductByFreeLancer = z.infer<typeof ProductByFreeLancerSchema>;
export const ProductByFreeLancerResponseSchema = z
  .array(ProductByFreeLancerSchema)
  .nullable();

export const productUpdateSchema = z.object({
  title: z.string(),
  content: z.string(),
  thumbnail_url: z.string().url(),
  category: z.string(),
  tags: z.array(TagSchema),
});

export type ProductUpdate = z.infer<typeof productUpdateSchema>;
