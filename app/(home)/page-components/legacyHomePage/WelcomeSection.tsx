'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function WelcomeSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    const elements = containerRef.current?.querySelectorAll('.animate-in');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='flex flex-col items-center justify-center min-h-screen px-6 md:px-12 lg:px-24 bg-gradient-to-b from-bgDarker to-bgDark'
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='max-w-4xl mx-auto text-center'
      >
        <h1 className='typo-head1 mb-8 animate-in'>
          <span className='text-active'>MATE</span>
          <span className='block mt-2'>
            개발자와 디자이너를 위한 프리랜서 허브
          </span>
        </h1>

        <p className='typo-body1 mb-12 animate-in opacity-0 transition-opacity duration-1000 delay-300 max-w-2xl mx-auto'>
          MATE는 탁월한 개발자와 디자이너를 프로젝트와 외주 기회에 연결해주는
          전문 플랫폼입니다. 당신의 역량을 발휘하고 성장할 수 있는 최적의 기회를
          찾아보세요.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='flex flex-col sm:flex-row justify-center gap-4 animate-in opacity-0 transition-opacity duration-1000 delay-500'
        >
          <button className='typo-button1 px-8 py-3 bg-active hover:bg-blue-600 transition-colors rounded-md'>
            프리랜서 가입하기
          </button>
          <button className='typo-button1 px-8 py-3 border border-border hover:bg-hover transition-colors rounded-md'>
            프로젝트 등록하기
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className='absolute bottom-10 animate-bounce'
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='text-textDim'
        >
          <path d='M12 5v14M19 12l-7 7-7-7' />
        </svg>
      </motion.div>
    </div>
  );
}
