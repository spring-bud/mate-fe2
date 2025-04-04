'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Dropdown,
  DropdownItem,
  DropdownDivider,
} from '@/components/ui/dropdown';

interface UserProfileProps {
  isLoggedIn: boolean;
  userName?: string;
  userImageUrl?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  isLoggedIn,
  userName = '사용자',
  userImageUrl = '/assets/icons/default-avatar.png',
}) => {
  // 로그인하지 않은 경우 로그인 버튼 표시
  if (!isLoggedIn) {
    return (
      <Link
        href='/login'
        className='typo-button2 rounded-md bg-active px-4 py-2 text-white hover:bg-opacity-90 transition-all'
      >
        로그인
      </Link>
    );
  }

  // 드롭다운 트리거 버튼 (사용자 아바타와 이름)
  const userTrigger = (
    <div className='flex items-center space-x-2 rounded-full hover:bg-hover p-1 transition-colors'>
      <div className='relative h-8 w-8 overflow-hidden rounded-full border border-border'>
        <Image
          src={userImageUrl}
          alt={userName}
          fill
          className='object-cover'
          onError={(e) => {
            // 이미지 로드 실패 시 기본 이미지로 대체
            const target = e.target as HTMLImageElement;
            target.src = '/assets/icons/default-avatar.png';
          }}
        />
      </div>
      <span className='typo-body1 hidden sm:block text-textPrimary dark:text-textLight'>
        {userName}
      </span>
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
          d='M19 9l-7 7-7-7'
        />
      </svg>
    </div>
  );

  // 로그인한 경우 사용자 드롭다운 메뉴 표시
  return (
    <Dropdown trigger={userTrigger} position='bottom-right' width='md'>
      <div className='py-1'>
        {/* 사용자 정보 헤더 */}
        <div className='px-4 py-2 border-b border-border'>
          <p className='typo-body1 font-medium text-textPrimary dark:text-textLight'>
            {userName}
          </p>
        </div>

        {/* 메뉴 항목들 */}
        <DropdownItem
          href='/profile'
          icon={
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          }
        >
          내 프로필
        </DropdownItem>

        <DropdownItem
          href='/dashboard'
          icon={
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-7m-6 0a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1'
              />
            </svg>
          }
        >
          대시보드
        </DropdownItem>

        <DropdownItem
          href='/settings'
          icon={
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          }
        >
          설정
        </DropdownItem>

        <DropdownDivider />

        <DropdownItem
          href='/logout'
          icon={
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
          }
        >
          로그아웃
        </DropdownItem>
      </div>
    </Dropdown>
  );
};

export default UserProfile;
