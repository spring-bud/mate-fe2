'use client';

import { useQuery } from '@tanstack/react-query';
import { reviewURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { ReviewItemsArraySchema } from '@/schemas/api/review.schema';

// 제품의 리뷰 목록을 가져오는 훅
const useFreeLancerReview = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.reviews.byFreeLancer(userId),
    queryFn: async () => {
      const requestBody = {
        userid: userId,
      };
      const response = await apiClient.get(reviewURL.byFreeLancer(), {
        params: requestBody,
        schema: ReviewItemsArraySchema,
      });
      return response;
    },
  });
};

export default useFreeLancerReview;
