import { useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductSearchBody } from '@/schemas/api/product.schema';
import { INITIAL_SEARCH_PARAMS } from '@/app/products/constants/productConstants';

const useProductListParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 브라우저 스크롤 복원 즉시 활성화 (useEffect보다 빠름)
  if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'auto';
  }

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

  // URL 파라미터 업데이트 함수 (사용자 액션일 때만)
  const updateUrlParams = useCallback(
    (updatedParams: ProductSearchBody) => {
      const params = new URLSearchParams();

      if (updatedParams.category) {
        params.set('category', updatedParams.category);
      }

      if (updatedParams.sort) {
        params.set('sort', updatedParams.sort);
      }

      if (Array.isArray(updatedParams.tag) && updatedParams.tag.length > 0) {
        params.set('tag', updatedParams.tag.join(','));
      }

      if (updatedParams.title) {
        params.set('title', updatedParams.title);
      }

      const newUrl = `/products?${params.toString()}`;
      // Next.js router 사용 (가장 안정적)
      router.push(newUrl, { scroll: false });
    },
    [router]
  );

  return {
    searchParams: searchParams2,
    setSearchParams,
    updateUrlParams,
  };
};

export default useProductListParams;
