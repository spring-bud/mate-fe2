import type { NextConfig } from 'next';

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
      'mate-dev-s3.s3.ap-northeast-2.amazonaws.com',
      // test
      'picsum.photos',
      'i.pravatar.cc',
    ],
  },
};

export default nextConfig;
