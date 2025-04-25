'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import laptopCatImage from '@/assets/images/laptop-cat.png';
import teamUserImage from '@/assets/images/laptop-cat2.png';
import drawingCatImage from '@/assets/images/drawing-cat.png';

const HeroSection = () => {
  return (
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
                  <span className='text-textLight'>findProject</span>() &#123;
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
  );
};

export default HeroSection;
