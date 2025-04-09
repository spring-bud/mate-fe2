/**
 * 모든 API 요청에 대한 쿼리 키 정의
 * 계층적 구조를 사용하여 관련 쿼리를 그룹화
 */

export const queryKeys = {
  // 인증 관련 쿼리 키
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    reissue: () => [...queryKeys.auth.all, 'reissue'] as const,
  },

  // 사용자 관련 쿼리 키
  users: {
    all: ['users'] as const,
    detail: (userId: string) => [...queryKeys.users.all, userId] as const,
    popularity: () => [...queryKeys.users.all, 'popularity'] as const,
  },

  // 제안서 관련 쿼리 키
  proposals: {
    all: ['proposals'] as const,
    list: () => [...queryKeys.proposals.all, 'list'] as const,
    detail: (proposalId: string) =>
      [...queryKeys.proposals.all, proposalId] as const,
  },

  // 리뷰 관련 쿼리 키
  reviews: {
    all: ['reviews'] as const,
    list: () => [...queryKeys.reviews.all, 'list'] as const,
    byProduct: (productId: string) =>
      [...queryKeys.reviews.all, 'product', productId] as const,
  },

  // 상품 관련 쿼리 키
  products: {
    all: ['products'] as const,
    list: (params: {
      category?: string;
      sort?: string;
      tags?: string[];
      title?: string;
    }) =>
      [
        ...queryKeys.products.all,
        'list',
        params.category ?? 'all',
        params.sort ?? 'recent',
        params.tags?.length ? params.tags.join(',') : 'all',
        params.title ?? '',
      ] as const,
    detail: (productId: string) =>
      [...queryKeys.products.all, productId] as const,
    byUser: (userId: string) =>
      [...queryKeys.products.all, 'user', userId] as const,
    likes: (productId: string) =>
      [...queryKeys.products.all, 'likes', productId] as const,
  },

  // 채팅 관련 쿼리 키
  chat: {
    all: ['chat'] as const,
    rooms: () => [...queryKeys.chat.all, 'rooms'] as const,
    messages: (roomToken: string) =>
      [...queryKeys.chat.all, 'messages', roomToken] as const,
    recentMessages: (roomToken: string) =>
      [...queryKeys.chat.all, 'recent', roomToken] as const,
  },
};
