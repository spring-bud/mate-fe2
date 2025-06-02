'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { CreateReviewResponseSchema } from '@/schemas/api/review.schema';
import { queryKeys } from '@/lib/react-query/queryKeys';

interface UpdateReviewParams {
  reviewId: number;
  data: any;
}

const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, data }: UpdateReviewParams) => {
      return apiClient.patch(reviewURL.update(), {
        params: { id: reviewId, ...data },
        schema: CreateReviewResponseSchema,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all });
    },
    onError: (error) => {
      console.error('리뷰 수정 중 오류 발생:', error);
    },
  });
};

export default useUpdateReview;
