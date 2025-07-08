import { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FreeLancerSearchBody } from '@/schemas/api/freeLancer.schema';
import { INITIAL_SEARCH_PARAMS } from '@/app/freelancer/constants/freeLancerConstants';

const useFreeLancerListParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 초기값을 상수로 설정하여 렌더링마다 새로운 객체 생성 방지
  const [searchState, setSearchState] = useState<FreeLancerSearchBody>(
    INITIAL_SEARCH_PARAMS
  );

  // URL 파라미터가 변경될 때만 상태 업데이트
  useEffect(() => {
    const jobtype =
      searchParams.get('jobtype') || INITIAL_SEARCH_PARAMS.jobtype;
    const nickname =
      searchParams.get('nickname') || INITIAL_SEARCH_PARAMS.nickname;
    const tagParam = searchParams.get('tag');
    const tag = tagParam ? tagParam.split(',').filter(Boolean) : [];

    const newSearchState = {
      jobtype,
      nickname,
      tag,
      size: 8,
      page: 0,
    };

    // 현재 상태와 다를 때만 업데이트
    setSearchState((prev) => {
      if (
        prev.jobtype !== newSearchState.jobtype ||
        prev.nickname !== newSearchState.nickname ||
        JSON.stringify(prev.tag) !== JSON.stringify(newSearchState.tag)
      ) {
        return newSearchState;
      }
      return prev;
    });
  }, [searchParams]);

  // URL 파라미터 업데이트 함수 (사용자 액션일 때만)
  const updateUrlParams = useCallback(
    (updatedParams: FreeLancerSearchBody) => {
      const params = new URLSearchParams();

      if (updatedParams.jobtype && updatedParams.jobtype.trim()) {
        params.set('jobtype', updatedParams.jobtype);
      }

      if (updatedParams.nickname && updatedParams.nickname.trim()) {
        params.set('nickname', updatedParams.nickname);
      }

      if (Array.isArray(updatedParams.tag) && updatedParams.tag.length > 0) {
        params.set('tag', updatedParams.tag.join(','));
      }

      const newUrl = params.toString()
        ? `/freelancer?${params.toString()}`
        : '/freelancer';

      // 현재 URL과 다를 때만 navigate
      if (
        typeof window !== 'undefined' &&
        window.location.pathname + window.location.search !== newUrl
      ) {
        router.push(newUrl, { scroll: false });
      }
    },
    [router]
  );

  return {
    searchParams: searchState,
    setSearchParams: setSearchState,
    updateUrlParams,
  };
};

export default useFreeLancerListParams;
