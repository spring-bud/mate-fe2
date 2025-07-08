'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const CategoriesSection = () => {
  return (
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
            다양한 분야, 다양한 레벨의 프리랜서들이 여러분의 프로젝트를 기다리고
            있어요!
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
              href='/products?category=DEVELOP&sort=CREATE'
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
              <h3 className='text-xl font-semibold text-textLight'>디자인</h3>
            </div>
            <p className='text-textPrimary mb-4'>
              UI/UX, 그래픽, 웹, 앱, 로고, 일러스트레이션 등 다양한 디자인
              분야의 프리랜서를 만나보세요.
            </p>
            <Link
              href='/products?category=DESIGN&sort=CREATE'
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
  );
};

export default CategoriesSection;
