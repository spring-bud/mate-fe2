import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { reissueResponseSchema } from './schemas/api/auth.schema';
import { getTokenRemainingTime } from './utils/jwt';

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token');
  const accessToken = request.cookies.get('access_token');

  const nextResponse = NextResponse.next();

  if (accessToken) {
    nextResponse.headers.set('Authorization', `Bearer ${accessToken.value}`);

    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      nextResponse.headers.set('cookie', cookieHeader);
    }
  }

  // 첫 로그인 후 홈 리다이렉트를 위한 코드 (refresh_token은 있지만 access_token이 없는 경우)
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

      nextResponse.cookies.set({
        name: 'access_token',
        value: access_token,
        path: '/',
        maxAge: maxAge,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        domain:
          process.env.NODE_ENV === 'production'
            ? '.springbud.site'
            : 'localhost',
        httpOnly: true,
      });

      // 새로 발급받은 액세스 토큰도 헤더에 추가
      nextResponse.headers.set('Authorization', `Bearer ${access_token}`);

      // 서버에서 받은 Set-Cookie 헤더 처리
      const setCookieHeaders = response.headers.getSetCookie();
      if (setCookieHeaders && setCookieHeaders.length > 0) {
        setCookieHeaders.forEach((cookie) => {
          nextResponse.headers.append('Set-Cookie', cookie);
        });
      }

      return nextResponse;
    } catch (error) {
      console.error('Token reissue error:', error);
      // 에러가 발생해도 요청은 계속 진행
      return nextResponse;
    }
  }

  return nextResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth/reissue|login).*)',
  ],
};
