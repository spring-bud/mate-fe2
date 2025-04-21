'use client';

import { useQuery } from '@tanstack/react-query';
import { tagURL } from '@/service/endpoints/endpoints';
import apiClient from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import {
  PopularTagsResponseSchema,
  PopularTagItemSchema,
} from '@/schemas/api/product.schema';
import { z } from 'zod';

// 인기 태그 아이템 타입 정의
export type PopularTagItem = z.infer<typeof PopularTagItemSchema>;

// 인기 태그 가져오는 훅
const usePopularTags = () => {
  return useQuery({
    queryKey: queryKeys.tag.mostTag(),
    queryFn: async () => {
      const response = await apiClient.get(tagURL.mostTag, {
        schema: PopularTagsResponseSchema,
      });
      return response;
    },
  });
};

export default usePopularTags;
