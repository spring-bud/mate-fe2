'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/laptop-cat.png';
import KakaoLoginButton from '@/components/ui/button/KakaoLoginButton';

export default function AnimatedLoginCard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <motion.div
      className='bg-bgLight border border-border rounded-xl p-6 sm:p-8 shadow-lg'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      {/* 로고 및 헤더 */}
      <motion.div
        className='flex flex-col items-center mb-8'
        variants={itemVariants}
      >
        <Link href='/' className='flex items-center mb-4'>
          <div className='relative w-12 h-12 mr-2'>
            <Image alt='logo' src={Logo} width={80} height={80} />
          </div>
          <span className='typo-head2 text-textLight'>MATE</span>
        </Link>
        <h1 className='typo-head3 text-center'>함께할 프리랜서를 찾아보세요</h1>
      </motion.div>

      {/* 로그인 섹션 */}
      <motion.div variants={itemVariants} className='space-y-6'>
        <KakaoLoginButton />
      </motion.div>
      <motion.div
        className='mt-8 pt-6 border-t border-border text-center'
        variants={itemVariants}
      >
        <p className='typo-caption1 text-textDim'>
          MATE의 &nbsp;
          <Link href='/policy/service' className='text-active hover:underline'>
            이용약관
          </Link>
          과 &nbsp;
          <Link href='/policy/privacy' className='text-active hover:underline'>
            개인정보 처리방침
          </Link>
          에 동의합니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
