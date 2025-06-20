import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { reissueResponseSchema } from './schemas/api/auth.schema';
import { getTokenRemainingTime } from './utils/jwt';
import { createApiResponseSchema } from './schemas/api/generic.schema';

const PROTECTED_ROUTES = [
  '/products/create',
  '/products/edit/.*',
  '/mypage.*',
  '/chat',
];

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token');
  const accessToken = request.cookies.get('access_token');

  const nextResponse = NextResponse.next();
  const path = request.nextUrl.pathname;

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // 액세스 토큰이 있는 경우 요청 헤더에 Authorization 헤더 추가
  if (accessToken) {
    nextResponse.headers.set('Authorization', `Bearer ${accessToken.value}`);
  }
  // 리프레시 토큰은 있지만 액세스 토큰이 없는 경우 리프레시 로직 실행
  else if (refreshToken && !accessToken) {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reissue`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refresh_token=${refreshToken.value}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed with status: ${response.status}`);
      }

      const jsonData = await response.json();
      const apiResponseSchema = createApiResponseSchema(reissueResponseSchema);
      const validatedData = apiResponseSchema.parse(jsonData);
      const access_token = validatedData.data.access_token;

      const maxAge = getTokenRemainingTime(access_token);

      nextResponse.cookies.set({
        name: 'access_token',
        value: access_token,
        path: '/',
        maxAge: maxAge,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
      });

      // 새로 발급받은 액세스 토큰을 Authorization 헤더에 설정
      nextResponse.headers.set('Authorization', `Bearer ${access_token}`);

      const setCookieHeaders = response.headers.getSetCookie();
      if (setCookieHeaders && setCookieHeaders.length > 0) {
        setCookieHeaders.forEach((cookie) => {
          nextResponse.headers.append('Set-Cookie', cookie);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (accessToken && !refreshToken) {
    nextResponse.cookies.delete('access_token');

    return nextResponse;
  }

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return nextResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth/reissue|login).*)',
  ],
};
