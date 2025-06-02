'use client';

import { useState } from 'react';
import useProductReviews from '@/hooks/query/useProductReviews';
import ReviewModal from './ReviewModal';
import ReviewItem from './ReviewItem';
import LoginRequired from './LoginRequired';

// 리뷰 목록 컴포넌트
const ReviewList = ({
  productId,
  isOwner,
}: {
  productId: string;
  isOwner: boolean;
}) => {
  const { data: reviews, isLoading, error } = useProductReviews(productId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 401 인증 오류 처리
  /**@todo errorcode 정리필요 */
  if (error) {
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
            <ReviewItem key={review.id} review={review} isOwner={isOwner} />
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
