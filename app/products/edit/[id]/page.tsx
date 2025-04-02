'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PostFormData } from '@/schemas/validations/postForm.schema';
import PostFormContainer from '../../page-components/FormContainer';
import { getProductMockData } from './page-components/mockData';

export default function EditClientComponent() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  // api 관련 추후 전부 tanstack mutation처리
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState<PostFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadProductData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const mockData = getProductMockData(productId);

      // 데이터 설정 및 캐싱
      setProductData(mockData);
      localStorage.setItem(`product_${productId}`, JSON.stringify(mockData));
    } catch (err) {
      console.error('데이터 로딩 오류:', err);
      setError('상품 정보를 불러오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadProductData();
  }, [productId]);

  // 폼 제출 핸들러
  const handleSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);

      // API 호출 시뮬레이션
      console.log('제출된 데이터:', data);

      /* 실제 API 호출 예시
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('상품 수정에 실패했습니다.');
      }
      
      const result = await response.json();
      */

      // 성공 시뮬레이션 (2초 지연)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 캐시 업데이트
      localStorage.setItem(`product_${productId}`, JSON.stringify(data));

      // 성공 알림
      alert('상품이 성공적으로 수정되었습니다.');

      // 상품 상세 페이지로 이동
      router.push(`/products/${productId}`);
      // 또는 목록 페이지로 이동
      // router.push('/products');
    } catch (error) {
      console.error('상품 수정 오류:', error);
      alert('상품 수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    if (confirm('수정 중인 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
      router.back();
    }
  };

  // 로딩 중 표시
  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-active'></div>
      </div>
    );
  }

  // 오류 표시
  if (error || !productData) {
    return (
      <div className='max-w-4xl mx-auto py-8 px-4'>
        <div className='bg-error bg-opacity-10 border border-error text-error p-6 rounded-lg text-center'>
          <h2 className='typo-head3 mb-2'>데이터 로딩 오류</h2>
          <p>{error || '상품 정보를 찾을 수 없습니다.'}</p>
          <button
            onClick={() => loadProductData()}
            className='mt-4 px-4 py-2 bg-active text-white rounded-md hover:bg-opacity-90 transition-colors'
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      <h1 className='typo-head2 mb-6'>프로덕트 수정</h1>

      <PostFormContainer
        initialData={productData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText='수정 완료'
        cancelButtonText='취소'
        onCancel={handleCancel}
      />
    </div>
  );
}
