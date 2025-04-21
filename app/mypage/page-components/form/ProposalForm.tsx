'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { TiptapEditor } from '@/components/common/tiptap';
import useProposalMutation from '@/hooks/mutation/useProposal';

interface ProposalFormProps {
  onClose: () => void;
  editMode?: boolean;
  initialData?: {
    id: number;
    title: string;
    description: string;
  };
}

interface ProposalFormData {
  title: string;
  description: string;
}

const ProposalForm: React.FC<ProposalFormProps> = ({
  onClose,
  editMode = false,
  initialData,
}) => {
  const { createProposal, updateProposal } = useProposalMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProposalFormData>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
    },
  });

  const onSubmit = async (data: ProposalFormData) => {
    try {
      if (editMode && initialData) {
        await updateProposal.mutateAsync({
          ...data,
          id: initialData.id,
        });
      } else {
        await createProposal.mutateAsync(data);
      }

      onClose();
    } catch (error) {
      console.error('제안서 저장 중 오류:', error);
    }
  };

  return (
    <div className='bg-bgLight rounded-lg border border-border overflow-hidden'>
      <div className='p-4 sm:p-6 border-b border-border flex justify-between items-center'>
        <h2 className='typo-head2 text-textLight'>
          {editMode ? '제안서 수정' : '새 제안서 작성'}
        </h2>
        <button
          type='button'
          onClick={onClose}
          className='text-textDim hover:text-textLight'
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='p-4 sm:p-6 space-y-6'>
        {/* 제목 입력 필드 */}
        <div className='space-y-2'>
          <label htmlFor='title' className='block text-textLight typo-body2'>
            제목
          </label>
          <input
            id='title'
            type='text'
            {...register('title', { required: '제목을 입력해주세요.' })}
            className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
            placeholder='제안서 제목'
          />
          {errors.title && (
            <p className='text-error '>{errors.title.message}</p>
          )}
        </div>

        {/* 내용 입력 (TipTap 에디터) */}
        <div className='space-y-2'>
          <label className='block text-textLight typo-body2'>내용</label>
          <div className='bg-bgDark border border-border rounded overflow-hidden'>
            <TiptapEditor
              name='description'
              control={control}
              placeholder='제안서 내용을 입력해주세요...'
              defaultValue={initialData?.description}
            />
          </div>
          {errors.description && (
            <p className='text-error '>{errors.description.message}</p>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className='flex justify-end gap-4 pt-4'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 bg-bgDark text-textLight border border-border rounded'
          >
            취소
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-4 py-2 bg-active text-white rounded'
          >
            {isSubmitting ? '저장 중...' : editMode ? '수정 완료' : '저장'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProposalForm;
