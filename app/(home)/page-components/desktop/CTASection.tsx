'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import laptopCatImage from '@/assets/images/laptop-cat.png';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
