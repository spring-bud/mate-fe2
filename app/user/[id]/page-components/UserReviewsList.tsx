// components/user/UserReviewsList.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { ReviewItemType } from '@/schemas/api/review.schema';

interface UserReviewsListProps {
  reviews: ReviewItemType[];
}

const StarRating = ({ star }: { star: number }) => {
  // 별점을 정수와 소수 부분으로 나눔
  const fullStars = Math.floor(star);
  const hasHalfStar = star % 1 >= 0.5;

  return (
    <div className='flex items-center'>
      {/* 꽉 찬 별 */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg
          key={`full-${i}`}
          className='w-5 h-5 text-warning'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ))}

      {/* 반 별 */}
      {hasHalfStar && (
        <svg
          className='w-5 h-5 text-warning'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <defs>
            <linearGradient
              id='half-star-gradient'
              x1='0'
              x2='100%'
              y1='0'
              y2='0'
            >
              <stop offset='50%' stopColor='currentColor' />
              <stop offset='50%' stopColor='none' stopOpacity='0' />
            </linearGradient>
          </defs>
          <path
            fill='url(#half-star-gradient)'
            d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
          />
        </svg>
      )}

      {/* 빈 별 */}
      {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map(
        (_, i) => (
          <svg
            key={`empty-${i}`}
            className='w-5 h-5 text-gray-300'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
        )
      )}

      <span className='ml-1 typo-caption1 text-textLight'>
        {star.toFixed(1)}
      </span>
    </div>
  );
};

const UserReviewsList: React.FC<UserReviewsListProps> = ({ reviews }) => {
  if (!reviews.length) {
    return (
      <div className='bg-bgLight border border-border rounded-lg p-8 text-center'>
        <p className='typo-body1 text-textDim'>아직 받은 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='bg-bgLight border border-border rounded-lg overflow-hidden'>
      <div className='p-6 sm:p-8'>
        <h2 className='typo-head3 text-textLight mb-6'>받은 리뷰</h2>

        <div className='space-y-6'>
          {reviews.map((review) => (
            <div
              key={review.id}
              className='border-b border-border pb-6 last:border-0 last:pb-0'
            >
              <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center text-textLight'>
                    <Image
                      src={review.profile_url || '/api/placeholder/40/40'}
                      alt={`${review.nickname}'s profile`}
                      width={40}
                      height={40}
                      className='rounded-full'
                    />
                  </div>
                  <span className='typo-body1 text-textLight'>
                    {review.nickname}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <StarRating star={review.star} />
                </div>
              </div>

              <p className='typo-body1 text-textDim'>{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserReviewsList;
