import { decodeToken } from './jwt';
import { getAccessToken } from './api/api';

/**
 * 제품의 소유자인지 확인하는 함수
 * @param token 사용자의 JWT 토큰
 * @param ownerId 제품 소유자의 ID
 * @returns 소유자인 경우 true, 아닌 경우 false
 */
function isOwner(ownerId: number): boolean {
  try {
    const token = getAccessToken();

    // 토큰이 없는 경우 처리
    if (!token) {
      console.error('액세스 토큰이 없습니다.');
      return false;
    }

    // 토큰 디코딩
    const decodedToken = decodeToken<{
      user_id: number;
      user_url: string;
      user_nickname: string;
      sub: string;
      iat: number;
      exp: number;
    }>(token);

    // 토큰에서 추출한 user_id와 제품 소유자 ID 비교
    return decodedToken.user_id === ownerId;
  } catch (error) {
    console.error('소유자 확인 중 오류 발생:', error);
    return false;
  }
}

export default isOwner;
