import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { reissueResponseSchema } from './schemas/api/auth.schema';
import { getTokenRemainingTime } from './utils/jwt';

export async function middleware(request: NextRequest) {
  // 디버깅을 위한 로그 추가
  console.log('Middleware 실행:', request.nextUrl.pathname);

  const refreshToken = request.cookies.get('refresh_token');
  const accessToken = request.cookies.get('access_token');

  // 디버깅을 위한 토큰 존재 여부 로깅
  console.log('토큰 상태:', {
    refreshToken: refreshToken ? '존재함' : '없음',
    accessToken: accessToken ? '존재함' : '없음',
  });

  // 응답 객체를 생성합니다
  const response = NextResponse.next();

  // 액세스 토큰이 있는 경우
  if (accessToken) {
    response.headers.set('Authorization', `Bearer ${accessToken.value}`);

    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      response.headers.set('cookie', cookieHeader);
    }

    return response;
  }

  // 리프레시 토큰은 있지만 액세스 토큰이 없는 경우
  if (refreshToken && !accessToken) {
    try {
      console.log('토큰 재발급 시도');

      // Netlify 환경에서도 작동하도록 credentials 옵션 추가
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reissue`;
      console.log('API URL:', apiUrl);

      const fetchResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refresh_token=${refreshToken.value}`,
        },
        credentials: 'include',
        cache: 'no-store',
      });

      if (!fetchResponse.ok) {
        console.error('토큰 재발급 실패:', fetchResponse.status);
        throw new Error(
          `Token refresh failed with status: ${fetchResponse.status}`
        );
      }

      const data = await fetchResponse.json();
      console.log('토큰 재발급 응답 수신');

      const { access_token } = reissueResponseSchema.parse(data);
      const maxAge = getTokenRemainingTime(access_token);

      // 쿠키 설정에서 domain 옵션 제거 (Netlify 환경에서 문제가 될 수 있음)
      response.cookies.set({
        name: 'access_token',
        value: access_token,
        path: '/',
        maxAge: maxAge,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      });

      // Authorization 헤더 설정
      response.headers.set('Authorization', `Bearer ${access_token}`);

      console.log('토큰 재발급 성공');
      return response;
    } catch (error) {
      console.error('토큰 재발급 에러:', error);
      return response;
    }
  }

  return response;
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth/reissue|login|_next/data).*)',
  ],
};
