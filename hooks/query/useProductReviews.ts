'use client';

import { useQuery } from '@tanstack/react-query';
import { reviewURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { ReviewItemsArraySchema } from '@/schemas/api/review.schema';

// 제품의 리뷰 목록을 가져오는 훅
const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: queryKeys.reviews.byProduct(productId),
    queryFn: async () => {
      const response = await apiClient.get(reviewURL.byProductId(productId), {
        schema: ReviewItemsArraySchema,
      });

      return response;
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선하게 유지
  });
};

export default useProductReviews;
