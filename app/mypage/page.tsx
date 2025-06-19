import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getUserFromToken, isValidToken } from '@/utils/jwt';
import { userURL, proposalURL } from '@/service/endpoints/endpoints';
import { queryKeys } from '@/lib/react-query/queryKeys';
import MyPageClient from './MyPageClient';
import { proposalListResponseSchema } from '@/schemas/api/proposal.schema';
import { apiServerGet } from '@/utils/api/apiServer';

export const metadata: Metadata = {
  title: '마이페이지 | MATE',
  description: '내 프로필 정보, 제안서 및 좋아요한 Product를 관리하세요.',
};

export default async function MyPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  // 토큰이 없거나 유효하지 않으면 로그인 페이지로 리다이렉트`
  if (!accessToken || !isValidToken(accessToken)) {
    redirect('/login');
  }

  // 토큰에서 사용자 정보 추출
  const userInfo = getUserFromToken(accessToken);
  const userId = userInfo.user_id.toString();

  // QueryClient 생성
  const queryClient = new QueryClient();

  // 사용자 정보 미리 가져오기
  await queryClient.prefetchQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: async () => {
      const data = await apiServerGet(userURL.info(userId), {});
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.users.myLikeProducts(),
    queryFn: async () => {
      const data = await apiServerGet(userURL.myLikeProducts, {});
      return data;
    },
  });

  // 제안서 리스트 미리 가져오기
  await queryClient.prefetchQuery({
    queryKey: queryKeys.proposals.mylist(),
    queryFn: async () => {
      const data = await apiServerGet(proposalURL.myList, {
        schema: proposalListResponseSchema,
      });
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyPageClient userId={userId} />
    </HydrationBoundary>
  );
}
