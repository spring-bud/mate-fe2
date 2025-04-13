import React from 'react';
import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ProductDetailClient from './ProductDetailClient';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { apiClient } from '@/utils/api';
import { productURL, reviewURL } from '@/service/endpoints/endpoints';
import { ProductDetailSchema } from '@/schemas/api/product.schema';
import { ReviewItemsArraySchema } from '@/schemas/api/review.schema';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const productId = (await params).id;
  const response = await apiClient.get(productURL.detail(productId), {
    schema: ProductDetailSchema,
  });
  const product = response;

  return {
    title: `${product.title} | MATE`,
    description: product.content.substring(0, 160),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = (await params).id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: async () => {
      const response = await apiClient.get(productURL.detail(productId), {
        schema: ProductDetailSchema,
      });
      return response;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.reviews.byProduct(productId),
    queryFn: async () => {
      const response = await apiClient.get(reviewURL.byProductId(productId), {
        schema: ReviewItemsArraySchema,
      });
      return response;
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductDetailClient />
    </HydrationBoundary>
  );
}
