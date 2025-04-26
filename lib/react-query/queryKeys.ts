import { ProductSearchBody } from '@/schemas/api/product.schema';

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
    myInfo: () => [...queryKeys.users.all, 'myInfo'] as const,
    detail: (userId: string) => [...queryKeys.users.all, userId] as const,
  },

  // 제안서 관련 쿼리 키
  proposals: {
    all: ['proposals'] as const,
    mylist: () => [...queryKeys.proposals.all, 'mylist'] as const,
    detail: (proposalId: string) =>
      [...queryKeys.proposals.all, proposalId] as const,
  },

  // 리뷰 관련 쿼리 키
  reviews: {
    all: ['reviews'] as const,
    byFreeLancer: (userId: string) =>
      [...queryKeys.reviews.all, 'freeLancer', userId] as const,
    byProduct: (productId: string) =>
      [...queryKeys.reviews.all, 'product', productId] as const,
  },

  // 상품 관련 쿼리 키
  products: {
    all: ['products'] as const,
    list: (body: ProductSearchBody) =>
      [
        ...queryKeys.products.all,
        'list',
        body.category ?? 'DEVELOP',
        body.sort ?? 'CREATE',
        Array.isArray(body.tag) && body.tag.length > 0
          ? body.tag.join(',')
          : '',
        body.title ?? '',
        body.size ?? 4,
      ] as const,
    detail: (productId: string) =>
      [...queryKeys.products.all, productId] as const,
  },
  tag: {
    all: ['tags'] as const,
    search: (searchTerm: string) =>
      [...queryKeys.tag.all, 'search', searchTerm] as const,
    mostTag: () => [...queryKeys.tag.all, 'mostTag'] as const,
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
