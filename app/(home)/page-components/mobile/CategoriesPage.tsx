'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const CategoriesPage = () => {
  return (
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
            &nbsp;&nbsp;<span className='text-textLight'>connect</span>:{' '}
            <span className='text-success'>&quot;reallyFast&quot;</span>,
            <br />
            &nbsp;&nbsp;<span className='text-textLight'>charge?</span>:{' '}
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
  );
};

export default CategoriesPage;
