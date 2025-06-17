'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { ProductDetailResponse } from '@/hooks/query/useProductDetail';

const useLikeProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId }: { productId: string }) => {
      return apiClient.post(productURL.like(productId));
    },

    onMutate: async ({ productId }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.products.detail(productId),
      });

      // 롤백용
      const previousProduct = queryClient.getQueryData<ProductDetailResponse>(
        queryKeys.products.detail(productId)
      );

      if (previousProduct) {
        const newIsLiked = !previousProduct.is_liked;
        const likeCountChange = newIsLiked ? 1 : -1;

        const updatedProduct: ProductDetailResponse = {
          ...previousProduct,
          is_liked: newIsLiked,
          count: {
            ...previousProduct.count,
            like_count: Math.max(
              0,
              (previousProduct.count?.like_count || 0) + likeCountChange
            ),
          },
        };

        queryClient.setQueryData<ProductDetailResponse>(
          queryKeys.products.detail(productId),
          updatedProduct
        );
      }

      // 롤백용 컨텍스트 반환
      return { previousProduct, productId };
    },

    onError: (err, variables, context) => {
      console.error('좋아요 요청 실패:', err);

      if (context?.previousProduct && context?.productId) {
        queryClient.setQueryData(
          queryKeys.products.detail(context.productId),
          context.previousProduct
        );
      }

      if (typeof window !== 'undefined') {
        alert('좋아요 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.myLikeProducts(),
        refetchType: 'none',
      });
    },

    // 성공/실패와 관계없이 최종적으로 서버와 동기화 - 제거여부 파악필요
    onSettled: (data, error, { productId }) => {
      if (!error) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.products.detail(productId),
          refetchType: 'none',
        });
      }
    },
  });
};

export default useLikeProducts;
