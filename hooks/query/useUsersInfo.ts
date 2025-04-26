'use client';

import { useQuery } from '@tanstack/react-query';
import { userURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { userSchema } from '@/schemas/api/user.schema';

/**
 * @todo
 * - 스케마로 모든 null 처리 필요
 * - 내 정보와 타 프리랜서 쿼리 및 쿼리키 구분 필요
 * - 그에따른 각각 다른 스테일 타임 필요
 */
// 사용자 정보를 가져오는 훅 (장기 캐싱 적용)
export const useUserInfo = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: async () => {
      const response = await apiClient.get(userURL.info(userId), {});
      return response;
    },
  });
};
