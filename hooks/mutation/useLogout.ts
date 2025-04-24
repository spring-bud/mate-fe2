'use client';

import { useMutation } from '@tanstack/react-query';
import { authURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';

const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      return apiClient.post(authURL.logout, {});
    },
    onSuccess: () => {
      if (typeof document !== 'undefined') {
        // access_token 삭제
        document.cookie =
          'access_token=; path=/; domain=' +
          window.location.hostname +
          '; max-age=0; samesite=lax; ' +
          (process.env.NODE_ENV === 'production' ? 'secure;' : '');

        window.location.reload();
      }
    },
    onError: () => {
      if (typeof document !== 'undefined') {
        // access_token 삭제
        document.cookie =
          'access_token=; path=/; domain=' +
          window.location.hostname +
          '; max-age=0; samesite=lax; ' +
          (process.env.NODE_ENV === 'production' ? 'secure;' : '');

        window.location.reload();
      }
    },
  });
};

export default useLogout;
