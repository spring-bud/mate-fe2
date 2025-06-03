'use client';

import { useMutation } from '@tanstack/react-query';
import { userURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { useAuthStore } from '@/store/authStore';

export interface WithdrawRequest {
  reason: string[];
  detail?: string;
}

const useWithdraw = () => {
  const { initialize } = useAuthStore();

  return useMutation({
    mutationFn: async (data: WithdrawRequest) => {
      return apiClient.delete(userURL.withdraw, {
        params: data,
      });
    },
    onSuccess: () => {
      // 로그아웃 처리 및 토큰 삭제
      if (typeof document !== 'undefined') {
        document.cookie = `access_token=; path=/; domain=${
          window.location.hostname
        }; max-age=0; samesite=lax; ${
          process.env.NODE_ENV === 'production' ? 'secure;' : ''
        }`;

        // 인증 상태 초기화
        initialize();

        // 메인 페이지로 리다이렉트
        window.location.href = '/';
      }
    },
    onError: (error) => {
      console.error('회원 탈퇴 중 오류 발생:', error);
      alert('회원 탈퇴에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export default useWithdraw;
