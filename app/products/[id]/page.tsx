import React from 'react';
import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ProductDetailClient from './ProductDetailClient';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { apiClient } from '@/utils/api/api';
import { productURL, reviewURL } from '@/service/endpoints/endpoints';
import { ProductDetailSchema } from '@/schemas/api/product.schema';
import { ReviewItemsArraySchema } from '@/schemas/api/review.schema';
import { apiServerGet } from '@/utils/api/apiServer';
import isCurrentUserIdServer from '@/utils/isCurrentUserIdServer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const response = await apiClient.get(productURL.detail(productId), {
    schema: ProductDetailSchema,
  });
  const product = response;

  return {
    title: `MATE | ${product.title}`,
    description: product.content.substring(0, 160),
    openGraph: {
      title: `MATE | ${product.title}`,
      description: product.content.substring(0, 160),
      images: [
        {
          url: product.thumbnail_url,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      url: 'https://mate.springbud.site/',
      siteName: 'MATE',
      locale: 'ko_KR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `MATE | ${product.title}`,
      description: product.content.substring(0, 160),
      images: [product.thumbnail_url],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const queryClient = new QueryClient();

  // 제품 상세 정보 prefetch
  const productResponse = await queryClient.fetchQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: async () => {
      const response = await apiServerGet(productURL.detail(productId), {
        schema: ProductDetailSchema,
      });
      return response;
    },
  });

  // 리뷰 데이터 prefetch
  await queryClient.prefetchQuery({
    queryKey: queryKeys.reviews.byProduct(productId),
    queryFn: async () => {
      const response = await apiServerGet(reviewURL.byProductId(productId), {
        schema: ReviewItemsArraySchema,
      });
      return response;
    },
  });

  const currentUserId = await isCurrentUserIdServer();
  const productOwnerId = productResponse.owner?.user_id;

  const isOwner = currentUserId !== null && currentUserId === productOwnerId;

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductDetailClient isOwner={isOwner} />
    </HydrationBoundary>
  );
}
