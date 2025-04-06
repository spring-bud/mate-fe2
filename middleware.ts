import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { reissueResponseSchema } from './schemas/api/auth.schema';
import { getTokenRemainingTime } from './utils/jwt';

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token');
  const accessToken = request.cookies.get('access_token');

  const nextResponse = NextResponse.next();

  // 디버깅용 쿠키 - 미들웨어 진입 확인
  nextResponse.cookies.set({
    name: 'debug_middleware_entered',
    value: 'true',
    path: '/',
    maxAge: 60 * 5, // 5분
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false, // 브라우저에서 확인 가능하도록
  });

  if (accessToken) {
    nextResponse.headers.set('Authorization', `Bearer ${accessToken.value}`);

    // 디버깅용 쿠키 - accessToken 존재 확인
    nextResponse.cookies.set({
      name: 'debug_has_access_token',
      value: 'true',
      path: '/',
      maxAge: 60 * 5,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
    });

    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      nextResponse.headers.set('cookie', cookieHeader);
    }
  }

  // 첫 로그인 후 홈 리다이렉트를 위한 코드 (refresh_token은 있지만 access_token이 없는 경우)
  if (refreshToken && !accessToken) {
    // 디버깅용 쿠키 - 리프레시 로직 진입 확인
    nextResponse.cookies.set({
      name: 'debug_refresh_condition',
      value: 'true',
      path: '/',
      maxAge: 60 * 5,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
    });

    try {
      // 디버깅용 쿠키 - 리프레시 로직 try 진입
      nextResponse.cookies.set({
        name: 'debug_refresh_try',
        value: 'true',
        path: '/',
        maxAge: 60 * 5,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
      });

      // 여기가 변경된 부분 - credentials: 'include' 추가, Cookie 헤더 제거
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reissue`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // 쿠키를 자동으로 포함
        }
      );

      // 디버깅용 쿠키 - API 응답 확인
      nextResponse.cookies.set({
        name: 'debug_api_response',
        value: `status:${response.status}`,
        path: '/',
        maxAge: 60 * 5,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
      });

      if (!response.ok) {
        // 디버깅용 쿠키 - API 오류 시
        nextResponse.cookies.set({
          name: 'debug_api_error',
          value: `${response.status}`,
          path: '/',
          maxAge: 60 * 5,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          httpOnly: false,
        });
        throw new Error(`Token refresh failed with status: ${response.status}`);
      }

      const data = await response.json();

      // 디버깅용 쿠키 - 데이터 파싱 전
      nextResponse.cookies.set({
        name: 'debug_before_parse',
        value: 'true',
        path: '/',
        maxAge: 60 * 5,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
      });

      const { access_token } = reissueResponseSchema.parse(data);
      const maxAge = getTokenRemainingTime(access_token);

      // 디버깅용 쿠키 - 액세스 토큰 파싱 완료
      nextResponse.cookies.set({
        name: 'debug_token_parsed',
        value: 'true',
        path: '/',
        maxAge: 60 * 5,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
      });

      nextResponse.cookies.set({
        name: 'access_token',
        value: access_token,
        path: '/',
        maxAge: maxAge,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      });

      // 디버깅용 쿠키 - 액세스 토큰 설정 완료
      nextResponse.cookies.set({
        name: 'debug_token_set',
        value: 'true',
        path: '/',
        maxAge: 60 * 5,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
      });

      // 새로 발급받은 액세스 토큰도 헤더에 추가
      nextResponse.headers.set('Authorization', `Bearer ${access_token}`);

      // 서버에서 받은 Set-Cookie 헤더 처리
      const setCookieHeaders = response.headers.getSetCookie();
      if (setCookieHeaders && setCookieHeaders.length > 0) {
        setCookieHeaders.forEach((cookie) => {
          nextResponse.headers.append('Set-Cookie', cookie);
        });

        // 디버깅용 쿠키 - Set-Cookie 헤더 처리
        nextResponse.cookies.set({
          name: 'debug_set_cookie_processed',
          value: `count:${setCookieHeaders.length}`,
          path: '/',
          maxAge: 60 * 5,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          httpOnly: false,
        });
      }

      return nextResponse;
    } catch (error) {
      // 디버깅용 쿠키 - 오류 발생
      nextResponse.cookies.set({
        name: 'debug_error',
        value:
          error instanceof Error
            ? error.message.substring(0, 100)
            : 'Unknown error', // 오류 메시지 일부분만
        path: '/',
        maxAge: 60 * 5,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
      });

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
