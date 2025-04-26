'use client';

import { useQuery } from '@tanstack/react-query';
import { reviewURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { ReviewItemsArraySchema } from '@/schemas/api/review.schema';

// 제품의 리뷰 목록을 가져오는 훅
const useFreeLancerReview = (userId: string) => {
  const numericUserId = parseInt(userId, 10);

  return useQuery({
    queryKey: queryKeys.reviews.byFreeLancer(userId),
    queryFn: async () => {
      const response = await apiClient.post(reviewURL.byFreeLancer(), {
        params: { userid: 2 },
        schema: ReviewItemsArraySchema,
      });
      return response;
    },
  });
};

export default useFreeLancerReview;
