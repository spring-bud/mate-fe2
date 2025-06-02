'use client';

import { useMutation } from '@tanstack/react-query';
import { productURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { PostFormData } from '@/schemas/validations/postForm.schema';
import { productResponseSchema } from '@/schemas/api/product.schema';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { useQueryClient } from '@tanstack/react-query';

const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PostFormData) => {
      return apiClient.post(productURL.create, {
        params: data,
        schema: productResponseSchema,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
};

export default useCreateProduct;
