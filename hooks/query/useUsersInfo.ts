'use client';

import { useQuery } from '@tanstack/react-query';
import { userURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { userSchema } from '@/schemas/api/user.schema';

// 사용자 정보를 가져오는 훅 (장기 캐싱 적용)
const useUserInfo = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: async () => {
      const response = await apiClient.get(userURL.info(userId), {
        schema: userSchema,
      });
      return response;
    },

    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,

    refetchOnWindowFocus: false,

    refetchOnReconnect: false,

    refetchOnMount: false,
  });
};

export default useUserInfo;
