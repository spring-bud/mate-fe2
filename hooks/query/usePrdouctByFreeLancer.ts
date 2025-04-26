'use client';

import { useQuery } from '@tanstack/react-query';
import { productURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { ProductByFreeLancerResponseSchema } from '@/schemas/api/product.schema';

const useProductByFreeLancer = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.products.byFreeLancer(userId),
    queryFn: async () => {
      const response = await apiClient.get(productURL.byFreeLancer(userId), {
        schema: ProductByFreeLancerResponseSchema,
      });
      return response;
    },
  });
};

export default useProductByFreeLancer;
