'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { freeLancerURL } from '@/service/endpoints/endpoints';
import apiClient from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import {
  FreeLancerSearchBody,
  FreeLancerSearchResponseSchema,
} from '@/schemas/api/freeLancer.schema';

// 제품 검색 훅
const useFreeLancerSearch = (body: FreeLancerSearchBody) => {
  // body가 undefined일 경우 기본값 설정
  const searchParams = body || {};

  return useInfiniteQuery({
    queryKey: queryKeys.freeLancer.list(searchParams),
    queryFn: async ({ pageParam = 0 }) => {
      const searchBody = {
        ...searchParams,
        page: pageParam,
        size: searchParams.size || 4,
      };
      try {
        const response = await apiClient.post(freeLancerURL.search, {
          params: searchBody,
          schema: FreeLancerSearchResponseSchema,
        });

        // 응답 구조 검증 및 기본값 설정
        const {
          content = [],
          current_page = 0,
          has_next = false,
        } = response || {};

        return {
          items: content,
          current_page,
          has_next,
        };
      } catch (error) {
        console.error('API 요청 실패:', error);
        // 오류가 발생해도 빈 결과를 반환하여 UI가 깨지지 않도록 함
        return {
          items: [],
          current_page: 0,
          has_next: false,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      // lastPage가 undefined인 경우를 명시적으로 처리
      if (!lastPage) return undefined;

      // has_next가 true일 때만 다음 페이지를 가져옴
      return lastPage.has_next ? lastPage.current_page + 1 : undefined;
    },
    initialPageParam: 0,
  });
};

export default useFreeLancerSearch;
