import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { reissueResponseSchema } from './schemas/api/auth.schema';
import { getTokenRemainingTime } from './utils/jwt';

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token');
  const accessToken = request.cookies.get('access_token');

  // 첫 로그인 후 홈 리다이렉트를 위한 코드.
  if (refreshToken && !accessToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reissue`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: `refresh_token=${refreshToken.value}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Token refresh failed with status: ${response.status}`);
      }

      const data = await response.json();
      const { access_token } = reissueResponseSchema.parse(data);
      const maxAge = getTokenRemainingTime(access_token);
      // 응답 객체 생성
      const nextResponse = NextResponse.next();

      // 액세스 토큰 쿠키 설정
      nextResponse.cookies.set({
        name: 'access_token',
        value: access_token, // 검증된 access_token 사용
        path: '/',
        maxAge: maxAge, // 7일
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      });

      // 응답 헤더에서 Set-Cookie 헤더 가져오기
      const setCookieHeaders = response.headers.getSetCookie();

      // 모든 Set-Cookie 헤더를 NextResponse에 추가
      if (setCookieHeaders && setCookieHeaders.length > 0) {
        setCookieHeaders.forEach((cookie) => {
          nextResponse.headers.append('Set-Cookie', cookie);
        });
      }

      return nextResponse;
    } catch (error) {
      console.error('Token reissue error:', error);
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth/reissue|login).*)',
  ],
};
