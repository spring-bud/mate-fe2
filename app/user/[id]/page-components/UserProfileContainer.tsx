'use client';

import React, { useState } from 'react';
import UserProfileCardsss from './UserProfileCard';
import UserDetailedIntro from './UserDetailedIntro';
import UserPostsList from './UserPostsList';
import UserReviewsList from './UserReviewsList';

import useFreeLancerReview from '@/hooks/query/useFreeLancerReview';
import useProductByFreeLancer from '@/hooks/query/usePrdouctByFreeLancer';
import { useUserInfo } from '@/hooks/query/useUsersInfo';
import { User } from '@/schemas/api/user.schema';
import { LoginRequired } from '@/app/products/[id]/page-components/ReviewList';

const UserProfileContainer = ({ userId }: { userId: string }) => {
  // isLoading 상태도 가져오기
  const { data: userData, isLoading: isUserLoading } = useUserInfo(userId);

  const userInfo = userData as User;

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    error: reviewError,
  } = useFreeLancerReview(userId);
  const { data: posts, isLoading: isPostsLoading } =
    useProductByFreeLancer(userId);

  const [activeTab, setActiveTab] = useState<'intro' | 'posts' | 'reviews'>(
    'intro'
  );

  // 데이터 로딩 중일 때 로딩 표시
  if (isUserLoading) {
    return (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-active'></div>
      </div>
    );
  }

  // userData가 없는 경우 에러 메시지 표시
  if (!userInfo) {
    return (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <div className='text-center'>
          <h2 className='typo-head2 text-error'>프로필을 찾을 수 없습니다</h2>
          <p className='typo-body1 text-textDim mt-2'>
            요청하신 사용자 정보를 불러올 수 없습니다.
          </p>
        </div>
      </div>
    );
  }

  const renderReviewsContent = () => {
    if (isReviewsLoading) {
      return (
        <div className='flex justify-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-active'></div>
        </div>
      );
    }

    if (reviewError) {
      return <LoginRequired />;
    }

    return <UserReviewsList reviews={reviews || []} />;
  };

  return (
    <div className='max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12'>
      {/* 콘텐츠 영역 */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* 왼쪽 사이드바 - 프로필 카드 */}
        <div className='lg:col-span-1'>
          <h1 className='typo-head1 mb-4 text-center lg:mb-[26px]'>
            {userInfo.nickname}님의 프로필
          </h1>
          <UserProfileCardsss userInfo={userInfo} />
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
                게시물 {posts && posts.length > 0 && `(${posts.length})`}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-4 typo-button2 border-b-2 transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-active text-active'
                    : 'border-transparent text-textDim hover:text-textLight'
                }`}
              >
                리뷰 {reviews && reviews.length > 0 && `(${reviews.length})`}
              </button>
            </div>
          </div>

          {/* 선택된 탭 내용 */}
          <div>
            {activeTab === 'intro' && (
              <UserDetailedIntro content={userInfo.intro ?? ''} />
            )}
            {activeTab === 'posts' &&
              (isPostsLoading ? (
                <div className='flex justify-center py-8'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-active'></div>
                </div>
              ) : (
                <UserPostsList posts={posts || []} />
              ))}
            {activeTab === 'reviews' && renderReviewsContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileContainer;
