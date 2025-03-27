import { z } from "zod";

// 제네릭 API 응답 스키마 생성 함수
export function createApiResponseSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    data: schema,
  });
}
