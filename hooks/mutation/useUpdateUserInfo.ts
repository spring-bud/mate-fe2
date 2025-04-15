'use client';

import { useMutation } from '@tanstack/react-query';
import { userURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api';
import { userSchema, User } from '@/schemas/api/user.schema';

const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn: async (data: User) => {
      return apiClient.patch(userURL.update, {
        params: data,
        schema: userSchema,
      });
    },
  });
};

export default useUpdateUserInfo;
