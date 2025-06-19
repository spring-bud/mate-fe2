'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useMyLikeProducts from '@/hooks/query/useMyLikeProducts';

const LikedProducts: React.FC = () => {
  const { data: queryData, isLoading, error } = useMyLikeProducts();

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <h2 className='typo-head2 text-textLight mb-4'>좋아요한 Product</h2>
        <div className='flex justify-center items-center h-40'>
          <div className='text-textDim'>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='space-y-6'>
        <h2 className='typo-head2 text-textLight mb-4'>좋아요한 Product</h2>
        <div className='flex justify-center items-center h-40'>
          <div className='text-textDim'>
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        </div>
      </div>
    );
  }

  const likedProducts = (queryData as any)?.content || [];

  if (likedProducts.length === 0) {
    return (
      <div className='space-y-6'>
        <h2 className='typo-head2 text-textLight mb-4'>좋아요한 Product</h2>
        <div className='flex justify-center items-center h-40'>
          <div className='text-textDim'>좋아요한 Product가 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <h2 className='typo-head2 text-textLight mb-4'>좋아요한 Product</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {likedProducts.map((product: any) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className='typo-head3 text-textLight hover:text-active'
          >
            <div
              key={product.id}
              className='bg-bgLight border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow'
            >
              <div className='relative h-40 w-full'>
                <Image
                  src={product.thumbnail_url}
                  alt={product.title}
                  fill
                  sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                  className='object-cover'
                />
              </div>

              <div className='p-4'>
                <div className='flex justify-between items-start mb-2'>
                  {product.title}

                  <span className='px-2 py-1 bg-active bg-opacity-20 text-active rounded text-xs'>
                    {product.category}
                  </span>
                </div>

                <div className='flex items-center mt-3 space-x-4'>
                  <div className='flex items-center space-x-2'>
                    <div className='relative h-6 w-6 rounded-full overflow-hidden'>
                      <Image
                        src={product.owner.profile_url}
                        alt={product.owner.nickname}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <span className='text-textDim typo-caption1'>
                      {product.owner.nickname}
                    </span>
                  </div>

                  <div className='flex items-center space-x-4 ml-auto'>
                    <div className='flex items-center space-x-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 text-active'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                      </svg>
                      <span className='text-textDim typo-caption1'>
                        {product.count.like_count}
                      </span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 text-textDim'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                        />
                      </svg>
                      <span className='text-textDim typo-caption1'>
                        {product.count.review_count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LikedProducts;
