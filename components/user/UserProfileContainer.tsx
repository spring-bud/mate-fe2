// components/user/UserProfileContainer.tsx
'use client';

import React, { useState } from 'react';
import UserProfileCardsss from './UserProfileCard';
import { UserProfileDatass } from './UserProfileCard';
import UserDetailedIntro from './UserDetailedIntro';
import UserPostsList from './UserPostsList';
import UserReviewsList from './UserReviewsList';

import { UserPost } from './UserPostsList';
import { UserReview } from './UserReviewsList';

interface UserProfileContainerProps {
  userData: UserProfileDatass;
  detailedIntroContent: string;
  posts: UserPost[];
  reviews: UserReview[];
}

const UserProfileContainer: React.FC<UserProfileContainerProps> = ({
  userData,
  detailedIntroContent,
  posts,
  reviews,
}) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'posts' | 'reviews'>(
    'intro'
  );

  return (
    <div className='max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12'>
      {/* 콘텐츠 영역 */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* 왼쪽 사이드바 - 프로필 카드 */}
        <div className='lg:col-span-1'>
          <h1 className='typo-head1 mb-4 text-center lg:mb-[26px]'>
            {userData.nickname}님의 프로필
          </h1>
          <UserProfileCardsss userData={userData} />
        </div>

        {/* 오른쪽 메인 콘텐츠 영역 */}
        <div className='lg:col-span-2'>
          {/* 탭 메뉴 - 오른쪽 콘텐츠 영역 상단에 배치 */}
          <div className='border-b border-border mb-6'>
            <div className='flex'>
              <button
                onClick={() => setActiveTab('intro')}
                className={`py-3 px-4 typo-button2 border-b-2 transition-colors ${
                  activeTab === 'intro'
                    ? 'border-active text-active'
                    : 'border-transparent text-textDim hover:text-textLight'
                }`}
              >
                상세 소개
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-3 px-4 typo-button2 border-b-2 transition-colors ${
                  activeTab === 'posts'
                    ? 'border-active text-active'
                    : 'border-transparent text-textDim hover:text-textLight'
                }`}
              >
                게시물 {posts.length > 0 && `(${posts.length})`}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-4 typo-button2 border-b-2 transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-active text-active'
                    : 'border-transparent text-textDim hover:text-textLight'
                }`}
              >
                리뷰 {reviews.length > 0 && `(${reviews.length})`}
              </button>
            </div>
          </div>

          {/* 선택된 탭 내용 */}
          <div>
            {activeTab === 'intro' && (
              <UserDetailedIntro content={detailedIntroContent} />
            )}
            {activeTab === 'posts' && <UserPostsList posts={posts} />}
            {activeTab === 'reviews' && <UserReviewsList reviews={reviews} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileContainer;
