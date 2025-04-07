import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { reissueResponseSchema } from './schemas/api/auth.schema';
import { getTokenRemainingTime } from './utils/jwt';
import { createApiResponseSchema } from './schemas/api/generic.schema';

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token');
  const accessToken = request.cookies.get('access_token');

  const nextResponse = NextResponse.next();

  if (refreshToken && !accessToken) {
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
        httpOnly: true,
      });

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

  return nextResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth/reissue|login).*)',
  ],
};
