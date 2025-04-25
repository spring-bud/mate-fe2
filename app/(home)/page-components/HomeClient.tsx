'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

// 이미지 임포트 (경로는 실제 프로젝트에 맞게 조정 필요)
import laptopCatImage from '@/assets/images/laptop-cat.png';
import teamUserImage from '@/assets/images/laptop-cat2.png';
import drawingCatImage from '@/assets/images/drawing-cat.png';

const HomeClient = () => {
  // 모바일 페이지 상태
  const [currentMobilePage, setCurrentMobilePage] = useState(1);

  // 모바일 페이지 전환 함수
  const goToMobilePage = (pageNumber: number) => {
    setCurrentMobilePage(pageNumber);
  };

  return (
    <div className='min-h-screen bg-bgDark text-textPrimary'>
      {/* 데스크톱 버전 - md 이상에서만 표시 */}
      <div className='hidden md:block'>
        {/* 히어로 섹션 */}
        <section className='relative pt-32 pb-20 overflow-hidden'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col md:flex-row items-center'>
              <motion.div
                className='md:w-1/2 z-10 mb-12 md:mb-0'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-textLight mb-6 leading-tight'>
                  프리랜서를 위한 허브
                  <br />
                  <span className='text-active'>쉽고 빠른 매칭!</span>
                  <br />
                  <span className='text-active typo-head1'>MATE</span>
                </h1>
                <p className='text-lg md:text-xl text-textPrimary mb-8 max-w-lg'>
                  복잡한 과정, 어떠한 수수료도 없이 빠르게 매칭이 가능해요!
                </p>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <Link
                    href='/products'
                    className='px-6 py-3 bg-active text-white rounded-md hover:bg-opacity-90 transition-all text-center typo-button1'
                  >
                    프로젝트 둘러보기
                  </Link>
                  <Link
                    href='/help'
                    className='px-6 py-3 bg-transparent border border-border text-textLight rounded-md hover:bg-hover transition-all text-center typo-button1'
                  >
                    서비스 알아보기
                  </Link>
                </div>

                {/* 통계 수치 */}
                <div className='mt-12 flex flex-wrap gap-x-8 gap-y-4'>
                  <div>
                    <p className='text-2xl font-bold text-active'>10K+</p>
                    <p className='text-textDim text-sm'>등록된 프리랜서</p>
                  </div>
                  <div>
                    <p className='text-2xl font-bold text-active'>5K+</p>
                    <p className='text-textDim text-sm'>완료된 프로젝트</p>
                  </div>
                  <div>
                    <p className='text-2xl font-bold text-active'>10m</p>
                    <p className='text-textDim text-sm'>평균 매칭 시간</p>
                  </div>
                </div>
                <p className='mt-4 text-textDim'>이고 싶습니다.</p>
              </motion.div>

              <motion.div
                className='md:w-1/2 relative'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className='relative h-[380px] w-full'>
                  <Image
                    src={laptopCatImage}
                    alt='MATE 서비스 이미지'
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>

                {/* 떠다니는 아바타 요소 */}
                <motion.div
                  className='absolute -bottom-5 -right-5'
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: 'easeInOut',
                  }}
                >
                  <div className='bg-bgDarker rounded-md shadow-lg border border-border'>
                    <Image
                      src={teamUserImage}
                      alt='프리랜서'
                      width={70}
                      height={70}
                    />
                    <p className='text-textLight text-center mt-2 text-sm'>
                      웹 개발자
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className='absolute top-10 -left-5 hidden lg:block'
                  animate={{ y: [0, 15, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                >
                  <div className='bg-bgDarker rounded-md shadow-lg border border-border'>
                    <Image
                      src={drawingCatImage}
                      alt='디자이너'
                      width={60}
                      height={60}
                      className='bg-white'
                    />
                    <p className='text-textLight text-center mt-2 text-sm'>
                      디자이너
                    </p>
                  </div>
                </motion.div>

                {/* 코드 블록 장식 요소 */}
                <div className='absolute bottom-16 left-0 transform -translate-x-1/2 hidden xl:block'>
                  <motion.div
                    className='bg-bgDarker p-4 rounded-md shadow-lg border border-border max-w-xs'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <div className='flex items-center mb-2'>
                      <div className='w-3 h-3 rounded-full bg-error mr-2'></div>
                      <div className='w-3 h-3 rounded-full bg-warning mr-2'></div>
                      <div className='w-3 h-3 rounded-full bg-success'></div>
                    </div>
                    <code className='font-mono text-sm'>
                      <span className='text-info'>const</span>{' '}
                      <span className='text-warning'>developer</span> ={' '}
                      <span className='text-success'>프리랜서</span>;<br />
                      <span className='text-info'>function</span>{' '}
                      <span className='text-textLight'>findProject</span>()
                      &#123;
                      <br />
                      &nbsp;&nbsp;<span className='text-info'>return</span>{' '}
                      <span className='text-warning'>MATE</span>;<br />
                      &#125;
                    </code>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 배경 장식 요소 */}
          <div className='absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-bgLight to-transparent opacity-10 z-0'></div>
        </section>

        {/* 주요 기능 섹션 */}
        <section id='features' className='py-20 bg-bgLight'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h2 className='text-3xl md:text-4xl font-bold text-textLight mb-4'>
                  MATE의 특별한 기능
                </h2>
                <p className='text-textPrimary max-w-2xl mx-auto'>
                  은 많이는 없지만, 쉽고 편리한 경험을 제공해드립니다!
                </p>
              </motion.div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {/* 기능 1 */}
              <motion.div
                className='bg-bgDarker p-6 rounded-lg border border-border hover:border-active transition-all'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className='w-14 h-14 bg-active bg-opacity-20 rounded-lg flex items-center justify-center mb-4'>
                  <svg
                    width='28'
                    height='28'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                    <path
                      d='M12 6V12L16 14'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-textLight mb-3'>
                  빠른 매칭 시스템
                </h3>
                <p className='text-textPrimary'>
                  MATE에 등록된 프로덕트를 참고하여 중간 과정없이 해당
                  프리랜서에게 다이렉트 채팅!
                </p>
              </motion.div>

              {/* 기능 2 */}
              <motion.div
                className='bg-bgDarker p-6 rounded-lg border border-border hover:border-active transition-all'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className='w-14 h-14 bg-active bg-opacity-20 rounded-lg flex items-center justify-center mb-4'>
                  <svg
                    width='28'
                    height='28'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M9 3H5C4.44772 3 4 3.44772 4 4V8C4 8.55228 4.44772 9 5 9H9C9.55228 9 10 8.55228 10 8V4C10 3.44772 9.55228 3 9 3Z'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                    <path
                      d='M19 3H15C14.4477 3 14 3.44772 14 4V8C14 8.55228 14.4477 9 15 9H19C19.5523 9 20 8.55228 20 8V4C20 3.44772 19.5523 3 19 3Z'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                    <path
                      d='M9 13H5C4.44772 13 4 13.4477 4 14V18C4 18.5523 4.44772 19 5 19H9C9.55228 19 10 18.5523 10 18V14C10 13.4477 9.55228 13 9 13Z'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                    <path
                      d='M19 13H15C14.4477 13 14 13.4477 14 14V18C14 18.5523 14.4477 19 15 19H19C19.5523 19 20 18.5523 20 18V14C20 13.4477 19.5523 13 19 13Z'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                    <line
                      x1='7'
                      y1='9'
                      x2='7'
                      y2='13'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      className='text-active'
                    />
                    <line
                      x1='17'
                      y1='9'
                      x2='17'
                      y2='13'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      className='text-active'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-textLight mb-3'>
                  태그 기반 검색
                </h3>
                <p className='text-textPrimary'>
                  원하는 기술스택 또는 적절한 태그를 검색하여 필터링된 외주
                  프로덕트를 검색할 수 있어요!
                </p>
              </motion.div>

              {/* 기능 3 */}
              <motion.div
                className='bg-bgDarker p-6 rounded-lg border border-border hover:border-active transition-all'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className='w-14 h-14 bg-active bg-opacity-20 rounded-lg flex items-center justify-center mb-4'>
                  <svg
                    width='28'
                    height='28'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                    <path
                      d='M14 2V8H20'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                    <line
                      x1='8'
                      y1='13'
                      x2='16'
                      y2='13'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      className='text-active'
                    />
                    <line
                      x1='8'
                      y1='17'
                      x2='16'
                      y2='17'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      className='text-active'
                    />
                    <line
                      x1='8'
                      y1='9'
                      x2='10'
                      y2='9'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      className='text-active'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-textLight mb-3'>
                  외주 제안서
                </h3>
                <p className='text-textPrimary'>
                  작성된 하나의 제안서로 여러 프리랜서에게 쉽게 전달할 수
                  있어요!
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 카테고리 섹션 */}
        <section className='py-20 bg-bgDark'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              className='text-center mb-16'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className='text-3xl md:text-4xl font-bold text-textLight mb-4'>
                전문 분야
              </h2>
              <p className='text-textPrimary max-w-2xl mx-auto'>
                다양한 분야, 다양한 레벨의 프리랜서들이 여러분의 프로젝트를
                기다리고 있어요!
              </p>
            </motion.div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {/* 개발 카테고리 */}
              <motion.div
                className='bg-bgLight p-6 rounded-lg border border-border hover:shadow-lg transition-all'
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-active bg-opacity-20 rounded-full flex items-center justify-center mr-4'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M16 18L22 12L16 6'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-active'
                      />
                      <path
                        d='M8 6L2 12L8 18'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-active'
                      />
                    </svg>
                  </div>
                  <h3 className='text-xl font-semibold text-textLight'>개발</h3>
                </div>
                <p className='text-textPrimary mb-4'>
                  웹, 모바일, 백엔드, 프론트엔드, 풀스택 등 다양한 개발 분야의
                  프리랜서를 만나보세요.
                </p>
                <Link
                  href='/products?category=develop'
                  className='inline-flex items-center text-active hover:text-active hover:underline'
                >
                  <span>개발자 찾아보기</span>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='ml-1'
                  >
                    <path
                      d='M5 12H19'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M12 5L19 12L12 19'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Link>
              </motion.div>

              {/* 디자인 카테고리 */}
              <motion.div
                className='bg-bgLight p-6 rounded-lg border border-border hover:shadow-lg transition-all'
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-active bg-opacity-20 rounded-full flex items-center justify-center mr-4'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 19L19 12L22 15L15 22L12 19Z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-active'
                      />
                      <path
                        d='M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-active'
                      />
                      <path
                        d='M2 2L9.586 9.586'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-active'
                      />
                      <path
                        d='M11 13C12.1046 13 13 12.1046 13 11C13 9.89543 12.1046 9 11 9C9.89543 9 9 9.89543 9 11C9 12.1046 9.89543 13 11 13Z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-active'
                      />
                    </svg>
                  </div>
                  <h3 className='text-xl font-semibold text-textLight'>
                    디자인
                  </h3>
                </div>
                <p className='text-textPrimary mb-4'>
                  UI/UX, 그래픽, 웹, 앱, 로고, 일러스트레이션 등 다양한 디자인
                  분야의 프리랜서를 만나보세요.
                </p>
                <Link
                  href='/products?category=design'
                  className='inline-flex items-center text-active hover:text-active hover:underline'
                >
                  <span>디자이너 찾아보기</span>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='ml-1'
                  >
                    <path
                      d='M5 12H19'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M12 5L19 12L12 19'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className='py-20 bg-bgDarker'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='max-w-4xl mx-auto bg-bgLight p-8 sm:p-12 rounded-lg border border-border shadow-lg'>
              <motion.div
                className='text-center'
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className='relative inline-block mb-6'>
                  <Image
                    src={laptopCatImage}
                    alt='MATE 로고'
                    width={80}
                    height={80}
                    className='rounded-md'
                  />
                </div>
                <h2 className='text-3xl md:text-4xl font-bold text-textLight mb-4'>
                  지금 바로 시작하세요!
                </h2>
                <p className='text-textPrimary mb-8 max-w-xl mx-auto'>
                  MATE와 함께 수수료 없이 프로젝트를 시작하고, 빠르게 결과물을
                  얻어보아요!
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Link
                    href='/products'
                    className='px-6 py-3 bg-active text-white rounded-md hover:bg-opacity-90 transition-all text-center typo-button1'
                  >
                    프로젝트 둘러보기
                  </Link>
                  <Link
                    href='/login'
                    className='px-6 py-3 bg-transparent border border-active text-active rounded-md hover:bg-active hover:bg-opacity-10 transition-all text-center typo-button1'
                  >
                    지금 시작하기
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* 모바일 버전 - md 미만에서만 표시 */}
      <div className='block md:hidden'>
        {/* 모바일 페이지 1: 서비스 소개 */}
        {currentMobilePage === 1 && (
          // 모바일 부분 코드 - 앞부분 코드에 이어서 붙입니다

          <motion.div
            className='min-h-screen flex flex-col'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 헤더 */}

            {/* 메인 콘텐츠 */}
            <main className='flex-1 px-4 flex flex-col'>
              <div className='mt-8 mb-6'>
                <motion.h2
                  className='text-3xl font-bold text-textLight mb-3'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  프리랜서들 위한 <span className='text-active'>허브</span>
                  <br />
                  <span className='text-active'>MATE</span>
                </motion.h2>
                <motion.p
                  className='text-sm text-textDim'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  개발과 디자인을 하나로 연결하는
                  <br />
                  프리랜서 허브 플랫폼
                </motion.p>
              </div>

              {/* 이미지 */}
              <motion.div
                className='relative h-52 w-full my-6'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Image
                  src={laptopCatImage}
                  alt='프리랜서 작업'
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </motion.div>

              {/* 특징 */}
              <motion.div
                className='my-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className='flex items-center mb-3'>
                  <div className='w-8 h-8 rounded-full bg-active bg-opacity-20 flex items-center justify-center mr-3'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M22 11.08V12a10 10 0 1 1-5.93-9.14'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-active'
                      />
                      <path
                        d='M22 4L12 14.01l-3-3'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-active'
                      />
                    </svg>
                  </div>
                  <p className='text-textLight text-sm'>중개없는 빠른 매칭</p>
                </div>
                <div className='flex items-center mb-3'>
                  <div className='w-8 h-8 rounded-full bg-active bg-opacity-20 flex items-center justify-center mr-3'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M22 11.08V12a10 10 0 1 1-5.93-9.14'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-active'
                      />
                      <path
                        d='M22 4L12 14.01l-3-3'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-active'
                      />
                    </svg>
                  </div>
                  <p className='text-textLight text-sm'>태그 기반 검색서비스</p>
                </div>
                <div className='flex items-center'>
                  <div className='w-8 h-8 rounded-full bg-active bg-opacity-20 flex items-center justify-center mr-3'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M22 11.08V12a10 10 0 1 1-5.93-9.14'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-active'
                      />
                      <path
                        d='M22 4L12 14.01l-3-3'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-active'
                      />
                    </svg>
                  </div>
                  <p className='text-textLight text-sm'>
                    쉽게 작성하는 외주 제안서
                  </p>
                </div>
              </motion.div>

              {/* 버튼 영역 */}
              <div className='mt-4 mb-8'>
                <motion.button
                  className='w-full bg-active text-white py-3 rounded-md font-medium mb-3'
                  whileTap={{ scale: 0.98 }}
                  onClick={() => goToMobilePage(2)}
                >
                  시작하기
                </motion.button>
              </div>
            </main>
          </motion.div>
        )}

        {/* 모바일 페이지 2: 바로가기 페이지 */}
        {currentMobilePage === 2 && (
          <motion.div
            className='min-h-screen flex flex-col'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 메인 콘텐츠 */}
            <main className='flex-1 px-4 py-6'>
              <motion.h2
                className='text-2xl font-bold text-textLight mb-6 text-center'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                어떤 서비스를
                <br />
                이용하고 싶으신가요?
              </motion.h2>

              {/* 카테고리 카드 */}
              <div className='space-y-4 mt-8'>
                {/* 개발 카드 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Link href='/products?category=DEVELOP'>
                    <div className='bg-bgLight rounded-lg overflow-hidden border border-border hover:border-active transition-colors'>
                      <div className='p-4'>
                        <div className='flex items-center mb-3'>
                          <div className='w-10 h-10 rounded-full bg-active bg-opacity-20 flex items-center justify-center mr-3'>
                            <svg
                              width='20'
                              height='20'
                              viewBox='0 0 24 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M16 18L22 12L16 6'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='text-active'
                              />
                              <path
                                d='M8 6L2 12L8 18'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='text-active'
                              />
                            </svg>
                          </div>
                          <h3 className='text-lg font-semibold text-textLight'>
                            개발
                          </h3>
                        </div>
                        <p className='text-sm text-textDim mb-3'>
                          웹, 앱, 백엔드, 프론트엔드 등 다양한 개발 프로젝트
                        </p>
                        <div className='flex justify-between items-center'>
                          <span className='text-xs text-active'>바로가기</span>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M5 12H19'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='text-active'
                            />
                            <path
                              d='M12 5L19 12L12 19'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='text-active'
                            />
                          </svg>
                        </div>
                      </div>
                      <div className='h-3 bg-active'></div>
                    </div>
                  </Link>
                </motion.div>

                {/* 디자인 카드 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Link href='/products?category=DESIGN'>
                    <div className='bg-bgLight rounded-lg overflow-hidden border border-border hover:border-active transition-colors'>
                      <div className='p-4'>
                        <div className='flex items-center mb-3'>
                          <div className='w-10 h-10 rounded-full bg-active bg-opacity-20 flex items-center justify-center mr-3'>
                            <svg
                              width='20'
                              height='20'
                              viewBox='0 0 24 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M12 19L19 12L22 15L15 22L12 19Z'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='text-active'
                              />
                              <path
                                d='M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='text-active'
                              />
                              <path
                                d='M2 2L9.586 9.586'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='text-active'
                              />
                              <path
                                d='M11 13C12.1046 13 13 12.1046 13 11C13 9.89543 12.1046 9 11 9C9.89543 9 9 9.89543 9 11C9 12.1046 9.89543 13 11 13Z'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='text-active'
                              />
                            </svg>
                          </div>
                          <h3 className='text-lg font-semibold text-textLight'>
                            디자인
                          </h3>
                        </div>
                        <p className='text-sm text-textDim mb-3'>
                          UI/UX, 그래픽, 로고, 일러스트 등 디자인 프로젝트
                        </p>
                        <div className='flex justify-between items-center'>
                          <span className='text-xs text-active'>바로가기</span>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M5 12H19'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='text-active'
                            />
                            <path
                              d='M12 5L19 12L12 19'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='text-active'
                            />
                          </svg>
                        </div>
                      </div>
                      <div className='h-3 bg-warning'></div>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* 코드 블록 */}
              <motion.div
                className='mt-8 bg-bgDarker p-4 rounded-md border border-border'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className='flex items-center mb-2'>
                  <div className='w-3 h-3 rounded-full bg-error mr-1'></div>
                  <div className='w-3 h-3 rounded-full bg-warning mr-1'></div>
                  <div className='w-3 h-3 rounded-full bg-success'></div>
                </div>
                <code className='font-mono text-xs'>
                  <span className='text-info'>const</span>{' '}
                  <span className='text-warning'>MATE</span> = &#123;
                  <br />
                  &nbsp;&nbsp;<span className='text-textLight'>
                    connect
                  </span>:{' '}
                  <span className='text-success'>&quot;reallyFast&quot;</span>,
                  <br />
                  &nbsp;&nbsp;<span className='text-textLight'>
                    charge?
                  </span>:{' '}
                  <span className='text-success'>&quot;neverEver&quot;</span>
                  <br />
                  &#125;
                </code>
              </motion.div>

              {/* 하단 버튼 */}
              <div className='mt-8'>
                <Link href='/login'>
                  <motion.button
                    className='w-full bg-active text-white py-3 rounded-md font-medium mb-3'
                    whileTap={{ scale: 0.98 }}
                  >
                    로그인하기
                  </motion.button>
                </Link>
                <motion.p
                  className='text-center text-textDim text-xs'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  회원가입 없이도 둘러보실 수 있습니다
                </motion.p>
              </div>
            </main>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomeClient;
