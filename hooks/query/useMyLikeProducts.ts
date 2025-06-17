'use client';

import { useQuery } from '@tanstack/react-query';
import { userURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';

const useMyLikeProducts = () => {
  return useQuery({
    queryKey: queryKeys.users.myLikeProducts(),
    queryFn: async () => {
      const response = await apiClient.get(userURL.myLikeProducts, {});
      return response;
    },
  });
};

export default useMyLikeProducts;
