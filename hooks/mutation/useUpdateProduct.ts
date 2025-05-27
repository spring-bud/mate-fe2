'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';

import { queryKeys } from '@/lib/react-query/queryKeys';
import { useRouter } from 'next/navigation';

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      productId,
      data,
    }: {
      productId: string;

      /**@todo 타입 수정 */
      data: any;
    }) => {
      return apiClient.patch(productURL.detail(productId), {
        params: data,
      });
    },
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.detail(productId),
      });

      router.push(`/products/${productId}`);
    },
    onError: (error) => {
      console.error('Product update error:', error);
      alert('상품 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export default useUpdateProduct;
