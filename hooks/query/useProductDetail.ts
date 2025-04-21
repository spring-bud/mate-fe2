'use client';

import { useQuery } from '@tanstack/react-query';
import { productURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { ProductDetailSchema } from '@/schemas/api/product.schema';
import { z } from 'zod';

// API 응답 타입 정의
export type ProductDetailResponse = z.infer<typeof ProductDetailSchema>;

// 제품 상세 정보를 가져오는 훅
const useProductDetail = (productId: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: async () => {
      const response = await apiClient.get(productURL.detail(productId), {
        schema: ProductDetailSchema,
      });
      return response;
    },
  });
};

export default useProductDetail;
