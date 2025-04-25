import React from 'react';
import HomeClient from './page-components/HomeClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MATE | 프리랜서 허브',
  description:
    '클라이언트와 프리랜서를 빠르게 연결하는 MATE에서 최고의 개발자와 디자이너를 만나보세요. 24시간 내 매칭, 투명한 가격, 만족도 보장.',
  alternates: {
    canonical: '/',
  },
};

function Page() {
  return (
    <div>
      <HomeClient />
    </div>
  );
}

export default Page;
