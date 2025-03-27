'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    id: 1,
    title: '글 작성하기',
    description:
      '당신의 재능과 서비스를 소개하는 글을 작성하세요. 포트폴리오를 추가하면 더 좋습니다.',
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M12 5v14M5 12h14'></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: '연결받기',
    description:
      '관심 있는 클라이언트로부터 연락을 받고 프로젝트에 대해 논의하세요.',
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'></path>
      </svg>
    ),
  },
  {
    id: 3,
    title: '프로젝트 완료',
    description:
      '프로젝트를 성공적으로 완료하고 긍정적인 리뷰를 통해 평판을 쌓아가세요.',
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
        <path d='M22 4L12 14.01l-3-3'></path>
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 애니메이션을 위한 Intersection Observer 설정
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
        threshold: 0.2,
      }
    );

    const elements = containerRef.current?.querySelectorAll('.animate-in');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className='flex flex-col items-center justify-center min-h-screen px-6 md:px-12 lg:px-24 bg-bgDark'
    >
      <div className='max-w-6xl w-full mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-8 md:mb-16'
        >
          <h2 className='typo-head2 mb-2 md:mb-4'>
            쉽게 시작하고, 쉽게 찾으세요
          </h2>
          <p className='typo-body1 max-w-2xl mx-auto text-textDim sm:px-4'>
            당신의 재능을 필요로 하는 프로젝트를 찾거나, 당신의 프로젝트에 딱
            맞는 프리랜서를 찾는 것이 이제 더 쉬워졌습니다.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8'
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className='flex flex-col items-center bg-bgLight p-6 sm:p-8 rounded-lg border border-border hover:border-active transition-all duration-300'
            >
              <div className='w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-selection text-textLight mb-4 sm:mb-6'>
                {feature.icon}
              </div>
              <h3 className='typo-head3 mb-2 sm:mb-3 text-center'>
                {feature.title}
              </h3>
              <p className='typo-body1 text-center text-textDim'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className='text-center mt-8 md:mt-16'
        >
          <button className='typo-button1 px-6 sm:px-8 py-3 bg-active hover:bg-blue-600 transition-colors rounded-md'>
            시작하기
          </button>
        </motion.div>
      </div>
    </div>
  );
}
