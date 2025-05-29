import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/utils/api/api';
import { productURL } from '@/service/endpoints/endpoints';
import { useRouter } from 'next/navigation';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { useQueryClient } from '@tanstack/react-query';

const useDeleteProducts = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      apiClient.delete(productURL.delete(productId)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });
      router.push('/products');
    },
    onError: (error) => {
      console.error('상품 삭제 중 오류 발생:', error);
      alert('상품 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export default useDeleteProducts;
