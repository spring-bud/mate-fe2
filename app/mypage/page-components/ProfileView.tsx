'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '@/schemas/api/user.schema';

interface ProfileViewProps {
  userData: User;
  toggleEditMode: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({
  userData,
  toggleEditMode,
}) => {
  return (
    <div className='space-y-6'>
      <div className='bg-bgDark rounded-lg border border-border shadow-lg overflow-hidden'>
        {/* 상단 헤더 영역 */}
        <div className='bg-bgDarker p-4 border-b border-border'>
          <div className='flex items-center justify-between'>
            <h1 className='typo-head2 text-textLight xs:typo-head3 md:typo-head2'>
              {`${userData.nickname}`}님의 프로필
            </h1>
            <button
              onClick={toggleEditMode}
              className='flex items-center px-3 py-1.5 bg-active hover:bg-opacity-90 transition-colors text-white rounded-md text-sm font-medium'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 mr-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                />
              </svg>
              편집
            </button>
          </div>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className='p-6'>
          <div className='flex flex-col md:flex-row gap-8'>
            {/* 프로필 이미지 및 기본 정보 */}
            <div className='flex flex-col items-center md:items-start space-y-4'>
              <div className='relative w-40 h-40 rounded-lg border-2 border-selection shadow-md overflow-hidden'>
                {userData.profile_url ? (
                  <Image
                    src={userData.profile_url}
                    alt={userData.nickname}
                    fill
                    className='object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center bg-bgLight text-textDim'>
                    프로필 없음
                  </div>
                )}
              </div>

              <div className='text-center md:text-left w-full'>
                {userData.job_year && (
                  <p className='text-info font-medium'>
                    {userData.job_year}년차 {userData.job_type}
                  </p>
                )}
              </div>
            </div>

            {/* 연락처 및 기술 정보 */}
            <div className='flex-1 space-y-6'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4'>
                <div className='space-y-4 bg-bgLight p-4 rounded-md border border-border'>
                  <h3 className='text-active typo-head4 flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 mr-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                    연락처 정보
                  </h3>
                  <div className='space-y-2'>
                    {userData.email ? (
                      <div className='flex items-center'>
                        <span className='text-textDim typo-caption1 w-20'>
                          이메일:
                        </span>
                        <span className='text-textLight'>{userData.email}</span>
                      </div>
                    ) : (
                      <div className='flex items-center'>
                        <span className='text-textDim typo-caption1 w-20'>
                          이메일:
                        </span>
                        <span className='text-textDim italic'>미등록</span>
                      </div>
                    )}

                    {userData.contact ? (
                      <div className='flex items-center'>
                        <span className='text-textDim typo-caption1 w-20'>
                          연락처:
                        </span>
                        <span className='text-textLight'>
                          {userData.contact}
                        </span>
                      </div>
                    ) : (
                      <div className='flex items-center'>
                        <span className='text-textDim typo-caption1 w-20'>
                          연락처:
                        </span>
                        <span className='text-textDim italic'>미등록</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className='space-y-4 bg-bgLight p-4 rounded-md border border-border'>
                  <h3 className='text-active typo-head4 flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 mr-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                      />
                    </svg>
                    링크
                  </h3>
                  <div className='space-y-2'>
                    {userData.github_url ? (
                      <div className='flex items-center overflow-hidden'>
                        <span className='text-textDim typo-caption1 w-20 flex-shrink-0'>
                          GitHub:
                        </span>
                        <a
                          href={userData.github_url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-info hover:text-active truncate hover:underline transition-colors'
                        >
                          {userData.github_url}
                        </a>
                      </div>
                    ) : (
                      <div className='flex items-center'>
                        <span className='text-textDim typo-caption1 w-20'>
                          GitHub:
                        </span>
                        <span className='text-textDim italic'>미등록</span>
                      </div>
                    )}

                    {userData.blog_url ? (
                      <div className='flex items-center overflow-hidden'>
                        <span className='text-textDim typo-caption1 w-20 flex-shrink-0'>
                          블로그:
                        </span>
                        <a
                          href={userData.blog_url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-info hover:text-active truncate hover:underline transition-colors'
                        >
                          {userData.blog_url}
                        </a>
                      </div>
                    ) : (
                      <div className='flex items-center'>
                        <span className='text-textDim typo-caption1 w-20'>
                          블로그:
                        </span>
                        <span className='text-textDim italic'>미등록</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 기술 스택 섹션 */}
              <div className='bg-bgLight p-4 rounded-md border border-border'>
                <h3 className='text-active typo-head4 mb-3 flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                    />
                  </svg>
                  기술 스택
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {userData.user_stacks && userData.user_stacks.length > 0 ? (
                    userData.user_stacks.map((stack) => (
                      <span
                        key={stack.stack_id}
                        className='bg-selection bg-opacity-20 text-info px-3 py-1 rounded-full text-sm'
                      >
                        {stack.name}
                      </span>
                    ))
                  ) : (
                    <span className='text-textDim italic'>
                      등록된 기술 스택이 없습니다.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 자기소개 섹션 */}
          <div className='mt-8'>
            <h3 className='text-active typo-head3 mb-3 flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-2'
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
              자기소개
            </h3>
            <div className='bg-bgLight p-5 rounded-md border border-border text-textLight'>
              {userData.intro ? (
                <div
                  className='prose prose-invert max-w-none'
                  dangerouslySetInnerHTML={{ __html: userData.intro }}
                />
              ) : (
                <p className='text-textDim italic'>자기소개가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
