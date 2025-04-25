'use client';

import { motion } from 'framer-motion';

const FeaturesSection = () => {
  return (
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
              MATE에 등록된 프로덕트를 참고하여 중간 과정없이 해당 프리랜서에게
              다이렉트 채팅!
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
              작성된 하나의 제안서로 여러 프리랜서에게 쉽게 전달할 수 있어요!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
