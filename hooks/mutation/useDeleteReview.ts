'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';

import { queryKeys } from '@/lib/react-query/queryKeys';

const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reviewId,
      productOwnerId,
    }: {
      reviewId: number;
      productOwnerId: number;
    }) => {
      return apiClient.delete(reviewURL.delete(), {
        params: {
          reviewid: reviewId,
          productownerid: productOwnerId,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
      });
    },
    onError: (error) => {
      console.error('Product update error:', error);
      alert('리뷰 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export default useDeleteReview;
