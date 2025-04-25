'use client';

import { useState } from 'react';

import {
  HeroSection,
  FeaturesSection,
  CategoriesSection,
  CTASection,
  IntroPage,
  CategoriesPage,
} from './index';

const HomeClient = () => {
  const [currentMobilePage, setCurrentMobilePage] = useState(1);

  const goToMobilePage = (pageNumber: number) => {
    setCurrentMobilePage(pageNumber);
  };

  return (
    <div className='min-h-screen bg-bgDark text-textPrimary'>
      {/* 데스크톱 버전 - md 이상에서만 표시 */}
      <div className='hidden md:block'>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <CTASection />
      </div>

      {/* 모바일 버전 - md 미만에서만 표시 */}
      <div className='block md:hidden'>
        {/* 모바일 페이지 1: 서비스 소개 */}
        {currentMobilePage === 1 && (
          <IntroPage goToMobilePage={goToMobilePage} />
        )}

        {/* 모바일 페이지 2: 바로가기 페이지 */}
        {currentMobilePage === 2 && <CategoriesPage />}
      </div>
    </div>
  );
};

export default HomeClient;
