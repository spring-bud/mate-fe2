'use client';

import { useState } from 'react';
import useProductReviews from '@/hooks/query/useProductReviews';
import { ReviewItemType } from '@/schemas/api/review.schema';
import Image from 'next/image';
import KakaoLoginButton from '@/components/ui/button/KakaoLoginButton';
import { CustomHttpError } from '@/utils/api/api';
import ReviewModal from './ReviewModal';

// 별점 컴포넌트
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-warning' : 'text-border'
          }`}
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ))}
    </div>
  );
};

// 리뷰 아이템 컴포넌트
const ReviewItem = ({ review }: { review: ReviewItemType }) => {
  return (
    <div className='border-b border-border py-6 first:pt-0'>
      <div className='flex items-start gap-4'>
        <div className='flex-shrink-0'>
          <Image
            src={review.profile_url || '/api/placeholder/40/40'}
            width={40}
            height={40}
            alt={review.nickname || '익명'}
            className='w-10 h-10 rounded-full object-cover border border-border'
          />
        </div>
        <div className='flex-grow'>
          <div className='flex items-center justify-between mb-1'>
            <div className='font-medium text-textLight'>
              {review.nickname || '익명'}
            </div>
          </div>
          <div className='mb-3'>
            <StarRating rating={review.star} />
          </div>
          <p className='text-textPrimary text-sm'>{review.content}</p>
        </div>
      </div>
    </div>
  );
};

// 로그인 필요 컴포넌트
export const LoginRequired = () => {
  return (
    <div className='relative mt-12 pt-8 border-t border-border'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-textLight'>리뷰</h2>
      </div>

      {/* 블러 처리된 리뷰 백그라운드 */}
      <div className='relative'>
        {/* 더미 리뷰 아이템 (블러 처리) */}
        <div className='space-y-0 blur-sm pointer-events-none select-none'>
          {[1, 2, 3].map((index) => (
            <div key={index} className='border-b border-border py-6 first:pt-0'>
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-10 h-10 bg-bgLight rounded-full'></div>
                <div className='flex-grow'>
                  <div className='flex items-center justify-between mb-1'>
                    <div className='h-4 bg-bgLight rounded w-24'></div>
                  </div>
                  <div className='mb-3 flex'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className='w-5 h-5 bg-bgLight rounded-full mr-1'
                      ></div>
                    ))}
                  </div>
                  <div className='space-y-2'>
                    <div className='h-3 bg-bgLight rounded w-full'></div>
                    <div className='h-3 bg-bgLight rounded w-2/3'></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 로그인 유도 오버레이 */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='bg-bgDarker bg-opacity-90 p-6 rounded-lg border border-border shadow-lg max-w-md w-full mx-4 text-center'>
            <h3 className='text-xl font-semibold text-textLight mb-2'>
              로그인이 필요합니다
            </h3>
            <p className='text-textDim mb-6'>
              리뷰를 확인하려면 로그인이 필요합니다.
            </p>

            <KakaoLoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

// 리뷰 목록 컴포넌트
const ReviewList = ({ productId }: { productId: string }) => {
  const { data: reviews, isLoading, error } = useProductReviews(productId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 401 인증 오류 처리
  if (error && (error as CustomHttpError).status === 401) {
    return <LoginRequired />;
  }

  if (isLoading) {
    return (
      <div className='mt-12 pt-8 border-t border-border'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-semibold text-textLight'>리뷰</h2>
        </div>
        <div className='space-y-6'>
          {[1, 2].map((i) => (
            <div key={i} className='animate-pulse'>
              <div className='flex items-start gap-4'>
                <div className='w-10 h-10 bg-bgLight rounded-full'></div>
                <div className='flex-grow'>
                  <div className='flex justify-between'>
                    <div className='h-4 bg-bgLight rounded w-24 mb-2'></div>
                    <div className='h-3 bg-bgLight rounded w-16'></div>
                  </div>
                  <div className='h-4 bg-bgLight rounded w-28 mb-3'></div>
                  <div className='space-y-2'>
                    <div className='h-3 bg-bgLight rounded w-full'></div>
                    <div className='h-3 bg-bgLight rounded w-2/3'></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='mt-12 pt-8 border-t border-border'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold text-textLight'>리뷰</h2>
        </div>
        <div className='bg-error bg-opacity-10 border border-error border-opacity-20 text-error px-4 py-3 rounded'>
          <p>리뷰를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='mt-12 pt-8 border-t border-border'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-textLight'>
          리뷰 <span className='text-textDim'>({reviews?.length || 0})</span>
        </h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className='flex items-center gap-1 px-3 py-1.5 bg-active text-white rounded text-sm hover:opacity-90 transition-opacity'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z' fill='white' />
          </svg>
          리뷰 작성
        </button>
      </div>

      {reviews && reviews.length > 0 ? (
        <div className='space-y-0'>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className='py-12 flex flex-col items-center justify-center text-center'>
          <svg
            width='48'
            height='48'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='mb-3 text-textDim'
          >
            <path
              d='M4 4H20V16H5.17L4 17.17V4ZM4 2C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2H4ZM6 10H18V12H6V10ZM6 7H18V9H6V7Z'
              fill='currentColor'
            />
          </svg>
          <p className='text-textDim mb-2'>아직 리뷰가 없습니다.</p>
          <p className='text-textDim text-sm'>첫 번째 리뷰를 작성해 보세요!</p>
        </div>
      )}
      <ReviewModal
        productId={productId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ReviewList;
