'use client';

import React from 'react';
import { ProductDetailResponse } from '@/hooks/query/useProductDetail';
import Image from 'next/image';

// 상품 상세 내용 컴포넌트
const ProductContent = ({ product }: { product: ProductDetailResponse }) => {
  const { content, product_tags, count, thumbnail_url } = product;

  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert('URL이 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('URL 복사 실패:', err);
      });
  };

  return (
    <div className='w-full'>
      {/* 태블릿/모바일에서만 보이는 썸네일 대체 이미지 */}
      <div className='mb-8 overflow-hidden rounded-lg border border-border md:hidden'>
        <div className='w-full h-64 bg-bgDark flex items-center justify-center'>
          <Image
            src={thumbnail_url}
            alt='thumbnail'
            width={0}
            height={0}
            className='w-full h-full object-cover'
            sizes='100vw'
          />
        </div>
      </div>

      {/* 제품 내용 */}
      <div className='bg-sidebar border border-border rounded-lg px-6'>
        <div
          className='prose prose-invert max-w-none'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* 태그 목록 */}
      {product_tags && product_tags.length > 0 && (
        <div className='mt-10 flex flex-wrap gap-2'>
          {product_tags.map((tag) => (
            <span
              key={tag.tag_id}
              className='px-3 py-1 bg-black text-white rounded text-sm hover:bg-blue-600 transition-colors cursor-pointer'
            >
              # {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* 공유 및 액션 버튼 */}
      <div className='mt-10 pt-6 border-t border-border flex justify-between items-center'>
        <div className='flex gap-2'>
          <button
            onClick={handleShare}
            className='flex items-center gap-1 px-3 py-1.5 bg-bgDark text-textPrimary rounded text-sm hover:bg-hover transition-colors'
          >
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 9.84066C7.54305 9.32015 6.80891 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C6.80891 15 7.54305 14.6798 8.08261 14.1593L15.0227 18.6294C15.0077 18.7508 15 18.8745 15 19C15 20.6569 16.3431 22 18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C17.1911 16 16.457 16.3202 15.9174 16.8407L8.97733 12.3706C8.99229 12.2492 9 12.1255 9 12C9 11.8745 8.99229 11.7508 8.97733 11.6294L15.9174 7.15934C16.457 7.67985 17.1911 8 18 8Z'
                fill='#D4D4D4'
              />
            </svg>
            공유하기
          </button>
        </div>
        <div className='flex gap-2'>
          <button className='flex items-center gap-1 px-3 py-1.5 bg-bgDark text-textPrimary rounded text-sm hover:bg-hover transition-colors'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z'
                fill='#D4D4D4'
              />
            </svg>
            좋아요 {count?.like_count || 0}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
