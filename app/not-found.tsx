'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LogoImage from '@/assets/images/404cat.png';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-bgDark flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-3xl bg-bgLight p-6 sm:p-8 rounded-lg border border-border shadow-xl'>
        <div className='md:hidden flex flex-wrap gap-3 mb-6 justify-center'>
          <Link
            href='/'
            className='inline-flex items-center px-3 py-1.5 bg-active text-white rounded text-sm hover:bg-opacity-90 transition-all'
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              className='mr-1'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z'
                fill='currentColor'
              />
            </svg>
            홈으로
          </Link>

          <button
            onClick={() => router.back()}
            className='inline-flex items-center px-3 py-1.5 bg-hover text-textPrimary rounded border border-border text-sm hover:bg-opacity-90 transition-all'
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              className='mr-1'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'
                fill='currentColor'
              />
            </svg>
            이전 페이지
          </button>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-4 md:gap-8'>
          {/* 이미지 영역 - 더 작게 조정 */}
          <div className='relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex-shrink-0'>
            <Image
              src={LogoImage}
              alt='로고'
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          {/* 내용 영역 */}
          <div className='flex-1 text-center md:text-left'>
            <div className='flex items-center justify-center md:justify-start mb-2'>
              <div className='bg-error px-3 py-1 rounded text-white font-mono text-xs mr-2'>
                404
              </div>
              <div className='text-error font-mono text-xs'>Not Found</div>
            </div>

            <h1 className='text-xl sm:text-2xl font-semibold text-textLight mb-2'>
              페이지를 찾을 수 없습니다
            </h1>

            <p className='text-sm sm:text-base text-textPrimary mb-4'>
              요청하신 페이지는 존재하지 않거나 준비 중입니다. 입력하신 주소가
              정확한지 확인해 주세요.
            </p>

            <div className='bg-bgDarker p-3 sm:p-4 rounded-md border border-border mb-4 sm:mb-6'>
              <div className='flex items-center mb-2'>
                <div className='w-3 h-3 rounded-full bg-error mr-1'></div>
                <div className='w-3 h-3 rounded-full bg-warning mr-1'></div>
                <div className='w-3 h-3 rounded-full bg-success'></div>
              </div>
              <code className='font-mono text-xs sm:text-sm text-textPrimary'>
                <span className='text-info'>const</span>{' '}
                <span className='text-warning'>page</span> ={' '}
                <span className='text-error'>404</span>;
                <br />
                <span className='text-info'>console</span>.
                <span className='text-textLight'>error</span>(
                <span className='text-success'>페이지를 찾을 수 없습니다</span>
                );
              </code>
            </div>

            {/* 데스크톱에서만 버튼 표시 */}
            <div className='hidden md:block space-y-4'>
              <div className='flex flex-wrap gap-3'>
                <Link
                  href='/'
                  className='inline-flex items-center px-4 py-2 bg-active text-white rounded hover:bg-opacity-90 transition-all'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    className='mr-2'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z'
                      fill='currentColor'
                    />
                  </svg>
                  홈으로 돌아가기
                </Link>

                <button
                  onClick={() => router.back()}
                  className='inline-flex items-center px-4 py-2 bg-hover text-textPrimary rounded border border-border hover:bg-opacity-90 transition-all'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    className='mr-2'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'
                      fill='currentColor'
                    />
                  </svg>
                  이전 페이지
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
