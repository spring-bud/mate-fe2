'use client';

import { useQuery } from '@tanstack/react-query';
import { userURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';

const useWithdrawReasons = () => {
  return useQuery({
    queryKey: queryKeys.users.withdrawReasons(),
    queryFn: async () => {
      try {
        const response = await apiClient.get(userURL.withdrawType);

        if (Array.isArray(response)) {
          return { data: response };
        } else {
          throw new Error('응답 데이터가 없습니다.');
        }
      } catch (error) {
        console.error('Error fetching withdraw reasons:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};

export default useWithdrawReasons;
