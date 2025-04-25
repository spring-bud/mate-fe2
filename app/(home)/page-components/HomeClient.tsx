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
                  클라이언트와 프리랜서를
                  <br />
                  <span className='text-active'>빠르게 연결하는</span>
                  <br />
                  <span className='text-active typo-head1'>MATE</span>
                </h1>
                <p className='text-lg md:text-xl text-textPrimary mb-8 max-w-lg'>
                  복잡한 과정 없이 빠르게 프로젝트를 진행하세요. 개발과 디자인
                  전문 프리랜서들이 기다리고 있습니다.
                </p>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <Link
                    href='/products'
                    className='px-6 py-3 bg-active text-white rounded-md hover:bg-opacity-90 transition-all text-center typo-button1'
                  >
                    프로젝트 둘러보기
                  </Link>
                  <Link
                    href='#features'
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
                    <p className='text-2xl font-bold text-active'>24H</p>
                    <p className='text-textDim text-sm'>평균 매칭 시간</p>
                  </div>
                </div>
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
                  프리랜서와 클라이언트 모두에게 최적화된 경험을 제공합니다
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
                  평균 24시간 이내에 적합한 프리랜서와 매칭됩니다. 복잡한
                  프로세스 없이 빠르게 프로젝트를 시작하세요.
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
                      d='M22 12H18L15 21L9 3L6 12H2'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-textLight mb-3'>
                  투명한 가격 정책
                </h3>
                <p className='text-textPrimary'>
                  숨겨진 비용 없이 명확한 가격 정책을 제공합니다. 프로젝트
                  예산을 효율적으로 관리하세요.
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
                      d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                    <path
                      d='M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                    <path
                      d='M9 9H9.01'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                    <path
                      d='M15 9H15.01'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-active'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-textLight mb-3'>
                  만족도 보장 시스템
                </h3>
                <p className='text-textPrimary'>
                  98%의 높은 고객 만족도를 자랑합니다. 결과물에 만족하지 못하면
                  수정 요청이 가능합니다.
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
                다양한 분야의 전문 프리랜서들이 여러분의 프로젝트를 기다리고
                있습니다
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
                  분야의 전문가들이 있습니다.
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
                  <div className='absolute -bottom-3 -right-3 bg-active text-white px-2 py-1 rounded-md text-xs'>
                    VS Code 테마
                  </div>
                </div>
                <h2 className='text-3xl md:text-4xl font-bold text-textLight mb-4'>
                  지금 바로 시작하세요!
                </h2>
                <p className='text-textPrimary mb-8 max-w-xl mx-auto'>
                  MATE와 함께라면 프로젝트를 빠르게 시작하고, 품질 높은 결과물을
                  얻을 수 있습니다. 지금 무료로 가입하고 프리랜서와
                  연결해보세요.
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
                  빠른 <span className='text-active'>프리랜서</span>
                  <br />
                  매칭 서비스
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
                className='relative h-64 w-full my-6'
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
                  <p className='text-textLight text-sm'>
                    24시간 내 매칭 시스템
                  </p>
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
                  <p className='text-textLight text-sm'>투명한 가격 정책</p>
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
                  <p className='text-textLight text-sm'>98% 고객 만족도</p>
                </div>
              </motion.div>

              {/* 버튼 영역 */}
              <div className='mt-auto mb-8'>
                <motion.button
                  className='w-full bg-active text-white py-3 rounded-md font-medium mb-3'
                  whileTap={{ scale: 0.98 }}
                  onClick={() => goToMobilePage(2)}
                >
                  시작하기
                </motion.button>
                <p className='text-center text-textDim text-xs'>
                  스와이프하여 다음 페이지로
                </p>
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
                  <Link href='/products?category=develop'>
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
                  <Link href='/products?category=design'>
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
                  </span>: <span className='text-success'>빠른 연결</span>,
                  <br />
                  &nbsp;&nbsp;<span className='text-textLight'>
                    quality
                  </span>: <span className='text-success'>최고 품질</span>
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
