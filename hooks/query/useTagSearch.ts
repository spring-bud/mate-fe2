'use client';

import { useQuery } from '@tanstack/react-query';
import { tagURL } from '@/service/endpoints/endpoints';
import apiClient from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import {
  TagSearchResponseSchema,
  TagSearchBodySchema,
} from '@/schemas/api/product.schema';
import { z } from 'zod';

// 태그 검색 바디 타입 정의
export type TagSearchBody = z.infer<typeof TagSearchBodySchema>;

// 태그 검색 훅
const useTagSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: queryKeys.tag.search(searchTerm),
    queryFn: async () => {
      if (!searchTerm || searchTerm.trim().length < 2) {
        return [];
      }

      const response = await apiClient.post(tagURL.search, {
        params: { tag: searchTerm },
        schema: TagSearchResponseSchema,
      });
      return response;
    },
    // 2글자 이상 입력된 경우에만 활성화
    enabled: searchTerm.trim().length >= 2,
  });
};

export default useTagSearch;
