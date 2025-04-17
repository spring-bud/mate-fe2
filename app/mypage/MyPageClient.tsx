'use client';

import React, { useState } from 'react';
import useUserInfo from '@/hooks/query/useUsersInfo';
import ProfileSection from './page-components/ProfileSection';
import ProposalList from './page-components/ProposalList';
import LikedProducts from './page-components/LikedProducts';

interface MyPageClientProps {
  userId: string;
}

const MyPageClient: React.FC<MyPageClientProps> = ({ userId }) => {
  const { data: userData, isLoading, error } = useUserInfo(userId);

  const [activeTab, setActiveTab] = useState<'profile' | 'proposals' | 'likes'>(
    'profile'
  );
  const [isEditMode, setIsEditMode] = useState(false);

  // 로딩 중이거나 에러 발생 시 처리
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-textLight'>로딩 중...</div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-error'>
          사용자 정보를 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  // 탭 변경 핸들러
  const handleTabChange = (tab: 'profile' | 'proposals' | 'likes') => {
    setActiveTab(tab);
    if (isEditMode) setIsEditMode(false);
  };

  // 편집 모드 전환 핸들러
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className='max-w-screen-xl mx-auto px-4 py-8'>
      <div className='bg-bgDark rounded-lg shadow-lg overflow-hidden'>
        {/* 헤더 섹션 */}
        <div className='p-4 sm:p-6 md:p-8 '>
          <h1 className='typo-head1 text-textLight'>마이페이지</h1>
        </div>

        {/* 탭 네비게이션 */}
        <div className='flex border-b border-border'>
          <button
            className={`px-4 py-3 ${
              activeTab === 'profile'
                ? 'text-active border-b-2 border-active'
                : 'text-textDim'
            }`}
            onClick={() => handleTabChange('profile')}
          >
            내 프로필
          </button>
          <button
            className={`px-4 py-3 ${
              activeTab === 'proposals'
                ? 'text-active border-b-2 border-active'
                : 'text-textDim'
            }`}
            onClick={() => handleTabChange('proposals')}
          >
            제안서
          </button>
          <button
            className={`px-4 py-3 ${
              activeTab === 'likes'
                ? 'text-active border-b-2 border-active'
                : 'text-textDim'
            }`}
            onClick={() => handleTabChange('likes')}
          >
            좋아요한 상품
          </button>
        </div>

        {/* 탭 컨텐츠 */}
        <div className='p-4 sm:p-6 md:p-8'>
          {activeTab === 'profile' && (
            <ProfileSection
              userData={userData}
              isEditMode={isEditMode}
              toggleEditMode={toggleEditMode}
            />
          )}
          {activeTab === 'proposals' && <ProposalList />}
          {activeTab === 'likes' && <LikedProducts />}
        </div>
      </div>
    </div>
  );
};

export default MyPageClient;
