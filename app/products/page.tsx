import { Metadata } from 'next';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import apiClient from '@/utils/api/api';
import { productURL, tagURL } from '@/service/endpoints/endpoints';
import {
  ProductListResponseSchema,
  PopularTagsResponseSchema,
  ProductListItem,
} from '@/schemas/api/product.schema';
import { INITIAL_SEARCH_PARAMS } from './constants/productConstants';
import ProductListClient from './page-components/ProductListClient';
import { queryKeys } from '@/lib/react-query/queryKeys';

type PageData = {
  items: ProductListItem[];
  current_page: number;
  has_next: boolean;
};

export const metadata: Metadata = {
  title: '프로덕트 | MATE',
  description: '다양한 개발자와 디자이너의 프로덕트들을 확인해보세요.',
};

export default async function ProductsPage() {
  const queryClient = new QueryClient();

  // 인기 태그 미리 불러오기
  await queryClient.prefetchQuery({
    queryKey: queryKeys.tag.mostTag(),
    queryFn: async () => {
      const response = await apiClient.get(tagURL.mostTag, {
        schema: PopularTagsResponseSchema,
      });
      return response;
    },
  });

  // 초기 제품 목록 미리 불러오기
  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeys.products.list(INITIAL_SEARCH_PARAMS),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await apiClient.post(productURL.srch, {
        params: {
          ...INITIAL_SEARCH_PARAMS,
          page: pageParam,
          size: 4,
        },
        schema: ProductListResponseSchema,
      });

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
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: PageData | undefined) => {
      if (!lastPage) return undefined;
      return lastPage.has_next ? lastPage.current_page + 1 : undefined;
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductListClient />
    </HydrationBoundary>
  );
}
