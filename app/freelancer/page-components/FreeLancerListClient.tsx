'use client';

import { useState } from 'react';
import useFreeLancerSearch from '@/hooks/query/useFreeLancerSearch';
import usePopularTags from '@/hooks/query/usePopularTags';
import useFreeLancerListParams from '@/hooks/freeLancerList/useFreeLancerListParams';
import useFreeLancerFilters from '@/hooks/freeLancerList/useFreeLancerFilters';
import useInfiniteScroll from '@/hooks/infiniteScroll/useInfiniteScroll';
// import JobTypeInput from './list/JobTypeInput';
import NicknameSearchBar from './list/NicknameSearchBar';
import FreeLancerTagSelector from './list/FreeLancerTagSelector';
import FreeLancerGrid from './list/FreeLancerGrid';

const FreeLancerListClient = () => {
  const [showMobileTagFilter, setShowMobileTagFilter] = useState(false);

  // 브라우저 스크롤 복원 즉시 활성화
  if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'auto';
  }

  // URL 파라미터 상태 관리
  const { searchParams, setSearchParams, updateUrlParams } =
    useFreeLancerListParams();

  // 필터 이벤트 핸들러들
  const {
    handleJobTypeChange,
    handleNicknameChange,
    handleTagAdd: originalHandleTagAdd,
    handleTagRemove,
  } = useFreeLancerFilters({
    searchParams,
    setSearchParams,
    updateUrlParams,
  });

  // 태그 추가 핸들러 (모바일 UI 상태 관리 포함)
  const handleTagAdd = (tag: string) => {
    const shouldCloseMobileFilter = originalHandleTagAdd(tag);
    if (shouldCloseMobileFilter) {
      setShowMobileTagFilter(false);
    }
  };

  // 인기 태그 가져오기
  const { data: popularTags = [] } = usePopularTags();

  // 프리랜서 검색 결과 가져오기
  const {
    data: freeLancersData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFreeLancerSearch(searchParams);

  // 무한 스크롤
  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  // 모든 프리랜서 목록 데이터 병합
  const freeLancers = Array.isArray(freeLancersData?.pages)
    ? freeLancersData.pages.flatMap((page) => page?.items || [])
    : [];

  // 선택된 태그 수 계산
  const selectedTagCount = Array.isArray(searchParams.tag)
    ? searchParams.tag.length
    : 0;

  // 태그 필터 토글
  const toggleMobileTagFilter = () => {
    setShowMobileTagFilter(!showMobileTagFilter);
  };

  return (
    <div className='max-w-screen-xl mx-auto p-4'>
      <div className='flex flex-col space-y-6'>
        {/* 헤더 */}
        <div className='text-center py-8'>
          <h1 className='text-4xl font-bold text-textLight mb-4'>
            프리랜서 찾기
          </h1>
          <p className='text-textDim text-lg'>
            다양한 분야의 전문 프리랜서들을 만나보세요
          </p>
        </div>

        {/* 검색 컨트롤 */}
        <div className='flex flex-col gap-4 sm:flex-row'>
          <div className='flex-1'>
            <NicknameSearchBar
              value={searchParams.nickname || ''}
              onChange={handleNicknameChange}
            />
          </div>
          {/* <div className='flex-1 items-center justify-between sm:justify-start gap-2'>
            <JobTypeInput
              value={searchParams.jobtype || ''}
              onChange={handleJobTypeChange}
            />
          </div> */}
          {/* 모바일 태그 필터 토글 버튼 */}
          <button
            type='button'
            onClick={toggleMobileTagFilter}
            className='lg:hidden flex items-center px-3 py-2 bg-selection hover:bg-hover text-textLight rounded transition-colors'
            aria-expanded={showMobileTagFilter}
            aria-controls='mobile-tag-filter'
          >
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 7h10M7 12h10M7 17h10'
              />
            </svg>
            태그
            {selectedTagCount > 0 && (
              <span className='ml-1 w-5 h-5 flex items-center justify-center bg-active text-white rounded-full text-xs'>
                {selectedTagCount}
              </span>
            )}
          </button>
        </div>

        {/* 모바일 태그 필터 (접을 수 있는 패널) */}
        <div
          id='mobile-tag-filter'
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            showMobileTagFilter ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <FreeLancerTagSelector
            popularTags={popularTags || []}
            selectedTags={
              Array.isArray(searchParams.tag) ? searchParams.tag : []
            }
            onTagAdd={handleTagAdd}
            onTagRemove={handleTagRemove}
            compact={true} // 모바일용 컴팩트 모드
          />
        </div>

        {/* 선택된 태그 표시 */}
        {Array.isArray(searchParams.tag) && searchParams.tag.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {searchParams.tag.map((tag) => (
              <div
                key={tag}
                className='flex items-center bg-selection text-textLight rounded-md px-2 py-1'
              >
                <span className='mr-1'>{tag}</span>
                <button
                  type='button'
                  onClick={() => handleTagRemove(tag)}
                  className='hover:text-red-400 focus:outline-none'
                  aria-label={`태그 삭제: ${tag}`}
                >
                  <svg
                    className='w-3 h-3'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className='flex flex-col lg:flex-row gap-6'>
          {/* 메인 컨텐츠 영역 */}
          <div className='flex-1 order-2 lg:order-1'>
            {isLoading ? (
              <div className='flex justify-center items-center h-64'>
                <div className='text-textLight'>로딩 중...</div>
              </div>
            ) : isError ? (
              <div className='flex justify-center items-center h-64 bg-red-50 text-red-500 rounded-lg'>
                <div className='text-center'>
                  <p className='typo-head3 mb-2'>오류가 발생했습니다</p>
                  <p className='typo-body2'>
                    프리랜서 목록을 불러오는 중 문제가 발생했습니다.
                  </p>
                </div>
              </div>
            ) : freeLancers.length === 0 ? (
              <div className='flex justify-center items-center h-64 bg-bgLight rounded-lg'>
                <div className='text-center'>
                  <p className='typo-head3 text-textLight mb-2'>
                    검색 결과가 없습니다
                  </p>
                  <p className='typo-body2 text-textDim'>
                    다른 조건으로 검색해보세요.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <FreeLancerGrid freeLancers={freeLancers} />
                {hasNextPage && (
                  <div ref={observerRef} className='h-10 flex justify-center'>
                    {isFetchingNextPage && (
                      <div className='text-textLight'>더 불러오는 중...</div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* 사이드바 (데스크톱) */}
          <div className='lg:w-80 order-1 lg:order-2'>
            <div className='hidden lg:block sticky top-4'>
              <FreeLancerTagSelector
                popularTags={popularTags || []}
                selectedTags={
                  Array.isArray(searchParams.tag) ? searchParams.tag : []
                }
                onTagAdd={handleTagAdd}
                onTagRemove={handleTagRemove}
                compact={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeLancerListClient;
