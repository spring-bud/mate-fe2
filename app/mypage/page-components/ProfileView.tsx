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
    <div className='space-y-8'>
      <div className='bg-bgLight p-6 rounded-lg border border-border'>
        <div className='flex flex-col md:flex-row gap-6'>
          {/* 프로필 이미지 */}
          <div className='relative w-32 h-32 rounded-full border-4 border-selection overflow-hidden'>
            <Image
              src={userData.profile_url}
              alt={userData.nickname}
              fill
              className='object-cover'
            />
          </div>

          {/* 기본 정보 */}
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-4'>
              <h1 className='typo-head1 text-textLight'>{userData.nickname}</h1>
              {userData.job_type && (
                <span className='px-3 py-1 bg-active bg-opacity-20 text-active rounded text-sm font-medium'>
                  {userData.job_type}
                </span>
              )}
            </div>

            {userData.job_year && (
              <p className='text-textLight mb-4'>
                {userData.job_year}년차 {userData.job_type}
              </p>
            )}

            {/* 연락처 정보 */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-textLight'>
              <div>
                {userData.email && (
                  <div className='mb-2'>
                    <span className='text-textDim typo-caption1 mr-2'>
                      이메일:
                    </span>
                    <span>{userData.email}</span>
                  </div>
                )}
                {userData.contact && (
                  <div>
                    <span className='text-textDim typo-caption1 mr-2'>
                      연락처:
                    </span>
                    <span>{userData.contact}</span>
                  </div>
                )}
              </div>
              <div>
                {userData.github_url && (
                  <div className='mb-2'>
                    <span className='text-textDim typo-caption1 mr-2'>
                      GitHub:
                    </span>
                    <a
                      href={userData.github_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-active hover:underline'
                    >
                      {userData.github_url}
                    </a>
                  </div>
                )}
                {userData.blog_url && (
                  <div>
                    <span className='text-textDim typo-caption1 mr-2'>
                      블로그:
                    </span>
                    <a
                      href={userData.blog_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-active hover:underline'
                    >
                      {userData.blog_url}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* 기술 스택 */}
            <div className='mt-6'>
              <h3 className='text-textLight typo-head4 mb-3'>기술 스택</h3>
              <div className='flex flex-wrap gap-2'>
                {userData.user_stacks && userData.user_stacks.length > 0 ? (
                  userData.user_stacks.map((stack) => (
                    <span
                      key={stack.stack_id}
                      className='bg-bgDark text-textLight typo-caption1 px-2 py-1 rounded'
                    >
                      {stack.name}
                    </span>
                  ))
                ) : (
                  <span className='text-textDim'>
                    등록된 기술 스택이 없습니다.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 자기소개 */}
        <div className='mt-8'>
          <h3 className='text-textLight typo-head3 mb-4'>자기소개</h3>
          <div className='bg-bgDark p-4 rounded border border-border text-textLight'>
            {userData.intro ? (
              <div
                className='prose prose-invert max-w-none'
                dangerouslySetInnerHTML={{ __html: userData.intro }}
              />
            ) : (
              <p className='text-textDim'>자기소개가 없습니다.</p>
            )}
          </div>
        </div>
      </div>

      {/* 수정 버튼 */}
      <div className='flex justify-end'>
        <button
          onClick={toggleEditMode}
          className='px-4 py-2 bg-active text-white rounded'
        >
          프로필 수정
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
