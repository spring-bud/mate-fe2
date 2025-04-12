'use client';

import { useRouter } from 'next/navigation';
import { PostFormData } from '@/schemas/validations/postForm.schema';
import PostFormContainer from '../page-components/FormContainer';
import useCreateProduct from '@/hooks/mutation/useCreateProduct';

// 메인 페이지 컴포넌트
export default function PostCreatePage() {
  const router = useRouter();
  const createProductMutation = useCreateProduct();

  // 폼 제출 핸들러
  const handleSubmit = async (data: PostFormData) => {
    try {
      const result = await createProductMutation.mutateAsync(data);

      alert('제품이 성공적으로 생성되었습니다.');
      router.push(`/products/${result.product_id}`);
    } catch (error) {
      console.error('제품 생성 오류:', error);
      alert('제품 생성 중 오류가 발생했습니다.');
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    if (confirm('작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
      router.back();
    }
  };

  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      <h1 className='typo-head2 mb-6'>새 프로덕트 생성</h1>

      <PostFormContainer
        onSubmit={handleSubmit}
        isSubmitting={createProductMutation.isPending}
        submitButtonText='제품 등록'
        cancelButtonText='취소'
        onCancel={handleCancel}
      />
    </div>
  );
}
