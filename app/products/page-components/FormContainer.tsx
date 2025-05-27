'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  postFormSchema,
  PostFormData,
  defaultPostFormValues,
} from '@/schemas/validations/postForm.schema';
import TiptapEditor from '@/components/common/tiptap/TiptapEditor';
import CategorySelector from '@/app/products/page-components/formField/CategorySelector';
import TagInput from '@/app/products/page-components/formField/TagInput';
import ThumbnailUploader from '@/app/products/page-components/formField/ThumbnailUploader';
import TitleInput from '@/app/products/page-components/formField/TitleInput';

const PostFormContainer = ({
  initialData = {},
  onSubmit,
  isSubmitting = false,
  submitButtonText = '저장하기',
  cancelButtonText = '취소',
  onCancel,
}: {
  initialData?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => Promise<void>;
  isSubmitting?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
  onCancel?: () => void;
}) => {
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: { ...defaultPostFormValues, ...initialData },
  });

  const handleFormSubmit = async (data: PostFormData) => {
    try {
      setFormError(null);
      await onSubmit(data);
    } catch (error) {
      console.error('폼 제출 오류:', error);
      setFormError('폼 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // 기본 취소 동작 (폼 초기화)
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
      {/* 상단 오류 메시지 */}
      {formError && (
        <div className='bg-error bg-opacity-10 border border-error text-error p-3 rounded-lg'>
          {formError}
        </div>
      )}

      {/* 썸네일 업로더 */}
      <ThumbnailUploader
        name='thumbnail_url'
        control={control}
        error={errors.thumbnail_url?.message}
      />

      {/* 카테고리 선택기 */}
      <CategorySelector
        name='category'
        control={control}
        error={errors.category?.message}
      />

      {/* 제목 입력 - 새로운 컴포넌트 사용 */}
      <TitleInput
        name='title'
        control={control}
        error={errors.title?.message}
      />

      {/* 콘텐츠 에디터 */}
      <div className='flex flex-col'>
        <label className='typo-body1 mb-2 block'>내용</label>
        <TiptapEditor
          name='content'
          control={control}
          error={errors.content?.message}
          placeholder='내용을 입력하세요...'
        />
      </div>

      {/* 태그 입력 */}
      <TagInput
        name='tags'
        control={control}
        label='태그'
        placeholder='태그를 입력하고 Enter를 누르세요 (최대 5개)'
        error={errors.tags?.message}
      />

      {/* 버튼 영역 */}
      <div className='flex justify-end space-x-3 pt-4'>
        <button
          type='button'
          onClick={handleCancel}
          className='px-4 py-2 border border-border rounded-md hover:bg-hover transition-colors typo-button2'
          disabled={isSubmitting}
        >
          {cancelButtonText}
        </button>
        <button
          type='submit'
          className='px-4 py-2 bg-active text-white rounded-md hover:bg-opacity-90 transition-colors typo-button2 disabled:opacity-50'
          disabled={isSubmitting}
        >
          {isSubmitting ? '저장 중...' : submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default PostFormContainer;
