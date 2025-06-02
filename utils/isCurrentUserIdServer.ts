import { cookies } from 'next/headers';
import { decodeToken } from './jwt';

async function isCurrentUserIdServer(): Promise<number | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return null;
    }

    const decodedToken = decodeToken<{
      user_id: number;
      user_url: string;
      user_nickname: string;
      sub: string;
      iat: number;
      exp: number;
    }>(token);

    return decodedToken.user_id;
  } catch (error) {
    console.error('현재 사용자 ID 가져오기 실패:', error);
    return null;
  }
}

export default isCurrentUserIdServer;
