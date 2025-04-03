// utils/server-jwt.ts
import { jwtDecode } from 'jwt-decode';
import {
  AccessTokenPayload,
  accessTokenPayloadSchema,
} from '@/schemas/api/auth.schema';

export function getUserFromToken(token: string): AccessTokenPayload | null {
  try {
    const decoded = jwtDecode(token);

    // 필요한 경우 zod 스키마로 추가 검증 수행
    try {
      return accessTokenPayloadSchema.parse(decoded);
    } catch (parseError) {
      console.error('스키마 검증 실패:', parseError);
      return null;
    }
  } catch (error) {
    console.error('서버에서 토큰 디코딩 중 오류:', error);
    return null;
  }
}
