'use client';

import { useQuery } from '@tanstack/react-query';
import { productURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { ProductDetailSchema } from '@/schemas/api/product.schema';

// 제품 상세 정보를 가져오는 훅
const useProductDetail = (productId: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: async () => {
      const response = await apiClient.get(`${productURL.detail(productId)}`, {
        schema: ProductDetailSchema,
      });

      return response;
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선하게 유지
  });
};

export default useProductDetail;
