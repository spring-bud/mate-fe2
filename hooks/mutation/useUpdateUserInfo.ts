'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userURL, authURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { User } from '@/schemas/api/user.schema';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { useAuthStore } from '@/store/authStore';
import { getTokenRemainingTime } from '@/utils/jwt';
import { reissueResponseSchema } from '@/schemas/api/auth.schema';
import { deleteAuthToken, setAuthToken } from '@/utils/jwt';

const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const initializeAuth = useAuthStore((state) => state.initialize);

  return useMutation({
    mutationFn: async (data: Partial<User>) => {
      return apiClient.patch(userURL.update, {
        params: data,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });

      // 토큰 삭제 후 재발급
      try {
        deleteAuthToken();

        const response = await apiClient.post(authURL.reissue, {
          schema: reissueResponseSchema,
        });

        if (response && response.access_token) {
          const access_token = response.access_token;
          const maxAge = getTokenRemainingTime(access_token);

          setAuthToken(access_token, maxAge);
          initializeAuth();

          window.location.reload();
        }
      } catch (error) {
        console.error('액세스 토큰 재발급 중 오류:', error);
      }
    },
  });
};

export default useUpdateUserInfo;
