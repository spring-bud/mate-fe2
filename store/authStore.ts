import { create } from 'zustand';
import { AccessTokenPayload } from '@/schemas/api/auth.schema';
import { getUserFromToken, isValidToken } from '@/utils/jwt';

interface AuthState {
  isLoggedIn: boolean;
  user: AccessTokenPayload | null;
  loading: boolean;

  // 액션
  initialize: () => void;
  logout: () => void;
  setUser: (user: AccessTokenPayload) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  loading: true,

  initialize: () => {
    try {
      // 쿠키에서 access_token 가져오기
      const cookies = document.cookie
        .split(';')
        .reduce<Record<string, string>>((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          if (key) acc[key] = value;
          return acc;
        }, {});

      const accessToken = cookies['access_token'];

      if (accessToken && isValidToken(accessToken)) {
        // 토큰에서 사용자 정보 추출
        const userInfo = getUserFromToken(accessToken);
        set({ user: userInfo, isLoggedIn: true, loading: false });
      } else {
        set({ user: null, isLoggedIn: false, loading: false });
      }
    } catch (error) {
      console.error('사용자 정보 로드 중 오류:', error);
      set({ user: null, isLoggedIn: false, loading: false });
    }
  },

  logout: () => {
    // 쿠키 만료시간 과거로 변경해서 브라우저에서 삭제.
    document.cookie =
      'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    set({ user: null, isLoggedIn: false });
  },

  setUser: (user: AccessTokenPayload) => {
    set({ user, isLoggedIn: true });
  },
}));
