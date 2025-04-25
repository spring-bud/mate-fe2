'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import laptopCatImage from '@/assets/images/laptop-cat.png';

interface IntroPageProps {
  goToMobilePage: (pageNumber: number) => void;
}

const IntroPage = ({ goToMobilePage }: IntroPageProps) => {
  return (
    <motion.div
      className='min-h-screen flex flex-col'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
            <p className='text-textLight text-sm'>쉽게 작성하는 외주 제안서</p>
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
  );
};

export default IntroPage;
