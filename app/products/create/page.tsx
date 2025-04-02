'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PostFormData } from '@/schemas/validations/postForm.schema';
import PostFormContainer from '../page-components/FormContainer';

// 메인 페이지 컴포넌트
export default function PostCreatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 폼 제출 핸들러
  const handleSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);

      // API 호출 시뮬레이션
      console.log('제출된 데이터:', data);

      // 실제 API 호출은 다음과 같이 구현할 수 있습니다:
      /*
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('게시물 생성에 실패했습니다.');
      }
      
      const result = await response.json();
      */

      // 성공 시뮬레이션 (2초 지연)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 성공 후 목록 페이지로 이동
      alert('게시물이 성공적으로 생성되었습니다.');
      //   router.push('/posts');
    } catch (error) {
      console.error('게시물 생성 오류:', error);
      alert('게시물 생성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
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
        isSubmitting={isSubmitting}
        submitButtonText='게시물 등록'
        cancelButtonText='취소'
        onCancel={handleCancel}
      />
    </div>
  );
}
