// app/user/[id]/page.tsx
import React from 'react';
import UserProfileContainer from '@/app/user/[id]/page-components/UserProfileContainer';
import { QueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/queryKeys';
import apiClient from '@/utils/api/api';
import { productURL, reviewURL, userURL } from '@/service/endpoints/endpoints';
import { ReviewItemsArraySchema } from '@/schemas/api/review.schema';
import { apiServerPost } from '@/utils/api/apiServer';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const userId = resolvedParams.id;
  const queryClient = new QueryClient();

  // 프리랜서 정보
  await queryClient.prefetchQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: async () => {
      const response = await apiClient.get(userURL.info(userId), {});
      return response;
    },
  });

  // 프리랜서의 리뷰목록
  await queryClient.prefetchQuery({
    queryKey: queryKeys.reviews.byFreeLancer(userId),
    queryFn: async () => {
      const requestBody = {
        userid: userId,
      };
      const response = await apiServerPost(reviewURL.byFreeLancer(), {
        params: requestBody,
        schema: ReviewItemsArraySchema,
      });
      return response;
    },
  });

  // 프리랜서의 프로덕트
  await queryClient.prefetchQuery({
    queryKey: queryKeys.products.byFreeLancer(userId),
    queryFn: async () => {
      const response = await apiClient.get(productURL.byFreeLancer(userId), {});
      return response;
    },
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <UserProfileContainer userId={userId} />
    </HydrationBoundary>
  );
}
