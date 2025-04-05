import type { NextConfig } from 'next';

// @netlify/next를 사용하는 부분 제거 후 Netlify 이슈 수정을 위한 설정 추가
const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: [
      'via.placeholder.com',
      'img1.kakaocdn.net',
      't1.kakaocdn.net',
      'k.kakaocdn.net',
    ],
  },
  // Netlify 배포에서 미들웨어가 올바르게 동작하도록 추가
  output: 'standalone',
};

export default nextConfig;
