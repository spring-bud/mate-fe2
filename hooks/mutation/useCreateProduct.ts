'use client';

import { useMutation } from '@tanstack/react-query';
import { productURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api';
import { PostFormData } from '@/schemas/validations/postForm.schema';
import { productResponseSchema } from '@/schemas/api/product.schema';

const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (data: PostFormData) => {
      return apiClient.post(productURL.create, {
        params: data,
        schema: productResponseSchema,
      });
    },
  });
};

export default useCreateProduct;
