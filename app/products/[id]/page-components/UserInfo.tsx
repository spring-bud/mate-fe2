'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductDetailResponse } from '@/hooks/query/useProductDetail';

// 작성자 정보 표시 컴포넌트
const UserInfo = ({ product }: { product: ProductDetailResponse }) => {
  const { owner, product_tags, thumbnail_url } = product;

  return (
    <div className='w-full mt-0 md:mt-0'>
      {/* 데스크탑에서만 보이는 썸네일 대체 이미지 */}
      <div className='mb-6 overflow-hidden rounded-lg hidden md:block'>
        <div className='w-full h-48 bg-bgDark flex items-center justify-center'>
          <Image
            src={thumbnail_url}
            alt='thumbnail'
            className='w-full h-full object-cover'
            width={0}
            height={0}
            sizes='100vw'
          />
        </div>
      </div>

      {/* 유저 정보 카드 */}
      <div className='bg-sidebar border border-border rounded-lg p-5 mb-6'>
        <div className='flex items-center gap-4 mb-4'>
          <div className='relative w-16 h-16 rounded-full overflow-hidden border border-border'>
            <Image
              src={owner.profile_url}
              alt={owner.nickname}
              fill
              className='object-cover'
              sizes='64px'
            />
          </div>
          <div>
            <h3 className='font-semibold text-lg text-textLight'>
              {owner.nickname}
            </h3>
          </div>
        </div>

        <div className='flex gap-2 mb-4'></div>
        <Link
          href={`/user/${owner.user_id}`}
          className='w-full py-2 bg-active text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors'
        >
          프로필 보기
        </Link>
      </div>

      {/* 태그 섹션 */}
      {product_tags && product_tags.length > 0 && (
        <div className='bg-sidebar border border-border rounded-lg p-5 mb-6 xs:hidden sm:hidden md:block '>
          <h3 className='font-semibold text-base text-textLight mb-4'>태그</h3>
          <div className='flex flex-wrap gap-2'>
            {product_tags.map((tag) => (
              <span
                key={tag.tag_id}
                className='px-3 py-1 bg-bgDark text-white rounded text-sm hover:bg-hover transition-colors cursor-pointer'
              >
                # {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 다른 프로젝트 섹션 추후 삭제 및 ad섹션으로 변경 */}
      <div className='bg-sidebar border border-border rounded-lg p-5'>
        <h3 className='font-semibold text-base text-textLight mb-4'>
          다른 프로젝트
        </h3>
        <div className='text-textDim text-center py-8'>
          다른 프로젝트가 없습니다.
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
