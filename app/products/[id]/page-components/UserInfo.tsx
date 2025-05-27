'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProductDetailResponse } from '@/hooks/query/useProductDetail';
import isOwner from '@/utils/isOwner';

// 작성자 정보 표시 컴포넌트
const UserInfo = ({ product }: { product: ProductDetailResponse }) => {
  const { owner, product_tags, thumbnail_url } = product;

  const isProductOwner = isOwner(Number(owner.user_id));

  // 채팅 시작 처리 함수
  const handleStartChat = async () => {
    alert('아직 준비중입니다');
  };

  return (
    <div className='w-full mt-0 md:mt-0'>
      {/* 데스크탑에서만 보이는 썸네일 대체 이미지 */}
      <div className='mb-6 overflow-hidden rounded-lg hidden md:block'>
        <div className='w-full h-48 bg-bgDark flex items-center justify-center'>
          <Image
            src={thumbnail_url || '/assets/images/laptop-cat.png'} // 기본 이미지 사용
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
              src={owner.profile_url || '/assets/images/drawing-cat.png'} // 기본 이미지 사용
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

        {/* 버튼 그룹 */}
        <div className='flex flex-col space-y-2'>
          <Link
            href={`/user/${owner.user_id}`}
            className='w-full py-2 bg-active text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors'
          >
            프로필 보기
          </Link>

          {!isProductOwner && (
            <button
              onClick={handleStartChat}
              className='w-full py-2 bg-purple-400 hover:bg-green-400 text-bgDark rounded flex items-center justify-center gap-2 transition-colors'
            >
              <>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='inline-block'
                >
                  <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'></path>
                </svg>
                <span>채팅</span>
              </>
            </button>
          )}
        </div>
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

      {/* 다른 프로젝트 섹션 */}
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
