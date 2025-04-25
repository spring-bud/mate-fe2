'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import {
  CreateReviewRequest,
  CreateReviewResponseSchema,
} from '@/schemas/api/review.schema';
import { queryKeys } from '@/lib/react-query/queryKeys';

interface Props {
  productId: string;
  data: CreateReviewRequest;
}

const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, data }: Props) => {
      return apiClient.post(reviewURL.create(productId), {
        params: data,
        schema: CreateReviewResponseSchema,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all });
    },
  });
};

export default useCreateReview;
