'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import useProductSearch from '@/hooks/query/useProductSearch';
import { ProductSearchBody } from '@/schemas/api/product.schema';
import usePopularTags from '@/hooks/query/usePopularTags';
import CategoryTabs from './list/CategoryTabs';
import SearchBar from './list/SearchBar';
import SortSelector from './list/SortSelector';
import TagSelector from './list/TagSelector';
import ProductGrid from './list/ProductGrid';
import {
  CATEGORY_OPTIONS,
  INITIAL_SEARCH_PARAMS,
  SORT_OPTIONS,
} from '../constants/productConstants';

const ProductListClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const observerRef = useRef<HTMLDivElement>(null);
  const [showMobileTagFilter, setShowMobileTagFilter] = useState(false);

  // URL 파라미터에서 초기 검색 조건 설정
  const [searchParams2, setSearchParams] = useState<ProductSearchBody>({
    category:
      (searchParams.get('category') as string) ||
      INITIAL_SEARCH_PARAMS.category,
    sort: (searchParams.get('sort') as string) || INITIAL_SEARCH_PARAMS.sort,
    tag: searchParams.get('tag')
      ? searchParams.get('tag')?.split(',') || []
      : [],
    title: searchParams.get('title') || '',
    size: 4,
    page: 0,
  });

  // 검색 파라미터 변경될 때마다 콘솔에 출력 (디버깅용)
  useEffect(() => {
    console.log('Current search params (payload):', searchParams2);
  }, [searchParams2]);

  // 인기 태그 가져오기
  const { data: popularTags = [] } = usePopularTags();

  // 제품 검색 결과 가져오기
  const {
    data: productsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useProductSearch(searchParams2);

  // URL 파라미터 업데이트 함수
  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams();

    if (searchParams2.category) {
      params.set('category', searchParams2.category);
    }

    if (searchParams2.sort) {
      params.set('sort', searchParams2.sort);
    }

    if (Array.isArray(searchParams2.tag) && searchParams2.tag.length > 0) {
      params.set('tag', searchParams2.tag.join(','));
    }

    if (searchParams2.title) {
      params.set('title', searchParams2.title);
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [router, searchParams2]);

  // 검색 파라미터 변경 시 URL 업데이트
  useEffect(() => {
    updateUrlParams();
  }, [searchParams2, updateUrlParams]);

  // 무한 스크롤 처리
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log('다음 페이지 불러오기...');
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category: string) => {
    setSearchParams((prev) => ({
      ...prev,
      category,
    }));
  };

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (sort: string) => {
    setSearchParams((prev) => ({
      ...prev,
      sort,
    }));
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (title: string) => {
    setSearchParams((prev) => ({
      ...prev,
      title,
    }));
  };

  // 태그 추가 핸들러
  const handleTagAdd = (tag: string) => {
    if (!Array.isArray(searchParams2.tag) || searchParams2.tag.includes(tag))
      return;

    setSearchParams((prev) => ({
      ...prev,
      tag: [...(Array.isArray(prev.tag) ? prev.tag : []), tag],
    }));

    // 모바일에서 태그 추가 후 자동으로 태그 필터 닫기 (UX 개선)
    if (window.innerWidth < 1024) {
      setShowMobileTagFilter(false);
    }
  };

  // 태그 제거 핸들러
  const handleTagRemove = (tag: string) => {
    if (!Array.isArray(searchParams2.tag)) return;

    setSearchParams((prev) => ({
      ...prev,
      tag: Array.isArray(prev.tag) ? prev.tag.filter((t) => t !== tag) : [],
    }));
  };

  // 모든 제품 목록 데이터 병합
  const products = Array.isArray(productsData?.pages)
    ? productsData.pages.flatMap((page) => page?.items || [])
    : [];

  // 선택된 태그 수 계산
  const selectedTagCount = Array.isArray(searchParams2.tag)
    ? searchParams2.tag.length
    : 0;

  // 태그 필터 토글
  const toggleMobileTagFilter = () => {
    setShowMobileTagFilter(!showMobileTagFilter);
  };

  return (
    <div className='max-w-screen-xl mx-auto p-4'>
      <div className='flex flex-col space-y-6'>
        {/* 카테고리 탭 */}
        <CategoryTabs
          activeCategory={searchParams2.category || CATEGORY_OPTIONS.DEVELOP}
          onCategoryChange={handleCategoryChange}
        />

        {/* 검색 컨트롤 */}
        <div className='flex flex-col gap-4 sm:flex-row'>
          <div className='flex-1'>
            <SearchBar
              value={searchParams2.title || ''}
              onChange={handleSearchChange}
            />
          </div>
          <div className='flex items-center justify-between sm:justify-start gap-2'>
            <SortSelector
              value={searchParams2.sort || SORT_OPTIONS.CREATE}
              onChange={handleSortChange}
            />

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
        </div>

        {/* 모바일 태그 필터 (접을 수 있는 패널) */}
        <div
          id='mobile-tag-filter'
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            showMobileTagFilter ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <TagSelector
            popularTags={popularTags || []}
            selectedTags={
              Array.isArray(searchParams2.tag) ? searchParams2.tag : []
            }
            onTagAdd={handleTagAdd}
            onTagRemove={handleTagRemove}
            compact={true} // 모바일용 컴팩트 모드
          />
        </div>

        {/* 선택된 태그 표시 */}
        {Array.isArray(searchParams2.tag) && searchParams2.tag.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {searchParams2.tag.map((tag) => (
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
                  <p className='typo-head3 mb-2'>
                    데이터를 불러오는 중 오류가 발생했습니다
                  </p>
                  <p className='typo-body2'>잠시 후 다시 시도해 주세요</p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className='flex justify-center items-center h-64 bg-bgLight rounded-lg'>
                <div className='text-textLight text-center'>
                  <p className='typo-head3 mb-2'>검색 결과가 없습니다</p>
                  <p className='typo-body2'>
                    다른 검색어나 필터를 시도해 보세요
                  </p>
                </div>
              </div>
            ) : (
              <ProductGrid products={products} />
            )}

            {/* 무한 스크롤용 감지 div */}
            {!isLoading && !isError && products.length > 0 && (
              <div ref={observerRef} className='h-10' />
            )}

            {/* 로딩 상태 표시 */}
            {isFetchingNextPage && (
              <div className='flex justify-center items-center h-20'>
                <div className='text-textLight'>로딩 중...</div>
              </div>
            )}
          </div>

          {/* 사이드바 - 태그 선택 (데스크톱에서만 표시) */}
          <div className='hidden lg:block lg:w-72 w-full order-1 lg:order-2'>
            <TagSelector
              popularTags={popularTags || []}
              selectedTags={
                Array.isArray(searchParams2.tag) ? searchParams2.tag : []
              }
              onTagAdd={handleTagAdd}
              onTagRemove={handleTagRemove}
              compact={false} // 데스크탑용 전체 모드
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListClient;
