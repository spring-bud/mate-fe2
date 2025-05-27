'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PostFormData } from '@/schemas/validations/postForm.schema';
import PostFormContainer from '../../page-components/FormContainer';
import useProductDetail from '@/hooks/query/useProductDetail';
import useUpdateProduct from '@/hooks/mutation/useUpdateProduct';
import isOwner from '@/utils/isOwner';

export default function EditClientComponent() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const { data: product } = useProductDetail(productId);
  const updateProductMutation = useUpdateProduct();

  // 태그를 name으로 변환
  const initialProductData = product
    ? {
        ...product,
        tags: product.product_tags?.map((tag) => tag.name) || [],
      }
    : {};

  const isProductOwner = product?.owner?.user_id
    ? isOwner(Number(product.owner.user_id))
    : false;

  useEffect(() => {
    if (product && !isProductOwner) {
      alert('수정 권한이 없습니다. 상품 소유자만 수정할 수 있습니다.');
      router.back();
    }
  }, [product, isProductOwner, router]);

  if (!product) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-active'></div>
      </div>
    );
  }

  const handleSubmit = async (data: PostFormData) => {
    try {
      updateProductMutation.mutate({
        productId,
        data,
      });
    } catch (error) {
      console.error('상품 수정 오류:', error);
      alert('상품 수정 중 오류가 발생했습니다.');
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    if (confirm('수정 중인 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
      router.back();
    }
  };

  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      <h1 className='typo-head2 mb-6'>프로덕트 수정</h1>

      <PostFormContainer
        initialData={initialProductData}
        onSubmit={handleSubmit}
        isSubmitting={updateProductMutation.isPending}
        submitButtonText='수정 완료'
        cancelButtonText='취소'
        onCancel={handleCancel}
      />
    </div>
  );
}
