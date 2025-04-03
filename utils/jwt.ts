import { jwtDecode } from 'jwt-decode';
import {
  accessTokenPayloadSchema,
  AccessTokenPayload,
} from '@/schemas/api/auth.schema';

export function decodeToken<T = any>(token: string): T {
  try {
    return jwtDecode<T>(token);
  } catch (error) {
    console.error('JWT 디코딩 에러:', error);
    throw new Error('유효하지 않은 토큰입니다');
  }
}

/**
 * 토큰이 만료되었는지 확인
 * @param token JWT 토큰
 * @returns 만료 여부 (true: 만료됨, false: 유효함)
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeToken(token);
    const exp = (decoded as any).exp;

    if (!exp) return true;

    return Date.now() >= exp * 1000;
  } catch (error) {
    console.error('디코딩 에러:', error);
    return true; // 디코딩 에러 시 만료된 것으로 처리
  }
}

/**
 * 토큰 만료까지 남은 시간(초) 계산
 * @param token JWT 토큰
 * @returns 남은 시간(초), 만료된 경우 0 반환
 */
export function getTokenRemainingTime(token: string): number {
  try {
    const decoded = decodeToken(token);
    const exp = (decoded as any).exp;

    if (!exp) return 0;

    const remainingTime = exp * 1000 - Date.now();
    return remainingTime > 0 ? Math.floor(remainingTime / 1000) : 0;
  } catch (error) {
    console.error('디코딩 에러:', error);
    return 0; // 디코딩 에러 시 0 반환
  }
}

/**
 * 토큰에서 사용자 정보 추출 및 검증
 * @param token JWT 토큰
 * @returns 검증된 사용자 정보
 */
export function getUserFromToken(token: string): AccessTokenPayload {
  try {
    const decoded = decodeToken(token);
    return accessTokenPayloadSchema.parse(decoded);
  } catch (error) {
    console.error('토큰 파싱 에러:', error);
    throw new Error('유효하지 않은 사용자 정보입니다');
  }
}

/**
 * 토큰이 유효한지 확인 (만료되지 않았고, 디코딩 가능한지)
 * @param token JWT 토큰
 * @returns 유효 여부
 */
export function isValidToken(token: string): boolean {
  if (!token) return false;

  try {
    return !isTokenExpired(token);
  } catch (error) {
    console.error('디코딩 에러:', error);
    return false;
  }
}
