'use client';

import { useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import Image from 'next/image';
import useUploadImage from '@/hooks/api/useUpload';

import {
  validateImageFile,
  ALLOWED_IMAGE_TYPES,
} from '@/schemas/validations/postForm.schema';

interface ThumbnailUploaderProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: string;
  defaultValue?: string;
}

const ThumbnailUploader = ({
  name,
  control,
  label = '썸네일',
  error,
  defaultValue = '',
}: ThumbnailUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isPending, isError } = useUploadImage();

  const handleFileUpload = async (
    file: File,
    onChange: (url: string) => void
  ) => {
    if (!file) return;

    const validationResult = validateImageFile(file);

    if (!validationResult.success) {
      alert(
        validationResult.error.errors[0]?.message ||
          '파일 유효성 검사에 실패했습니다.'
      );
      return;
    }

    try {
      const result = await mutateAsync(file);
      onChange(result.image_url || '');
    } catch (error) {
      console.error('썸네일 업로드 오류:', error);
      alert('썸네일 업로드에 실패했습니다.');
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <div className='flex flex-col'>
          {label && <label className='typo-body1 mb-2 block'>{label}</label>}

          <div
            className={`relative border-2 border-dashed rounded-lg ${
              error
                ? 'border-error'
                : value
                ? 'border-active'
                : 'border-border hover:border-active'
            } transition-colors`}
          >
            {/* 썸네일 미리보기 또는 업로드 영역 */}
            {value ? (
              <div className='relative aspect-video w-full overflow-hidden rounded-lg bg-gray-800'>
                <Image
                  src={value}
                  alt='썸네일 이미지'
                  className='object-contain'
                  fill
                />

                {/* 이미지 제거 버튼 */}
                <button
                  type='button'
                  onClick={() => onChange('')}
                  className='absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-bgDark bg-opacity-70 text-textLight hover:bg-opacity-90 transition-colors'
                  aria-label='썸네일 제거'
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div
                className='flex flex-col items-center justify-center p-6 aspect-video cursor-pointer'
                onClick={() => fileInputRef.current?.click()}
              >
                <svg
                  className='w-12 h-12 text-textDim mb-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
                <p className='text-textDim typo-body1'>
                  클릭하여 썸네일 이미지 업로드
                </p>
                <p className='text-textDim typo-caption1 mt-1'>
                  권장 비율: 16:9 / 최대 5MB
                </p>
                <p className='text-textDim typo-caption1 mt-1'>
                  지원 형식:{' '}
                  {ALLOWED_IMAGE_TYPES.map((type) =>
                    type.replace('image/', '')
                  ).join(', ')}
                </p>
              </div>
            )}

            {/* 로딩 오버레이 - isPending 직접 사용 */}
            {isPending && (
              <div className='absolute inset-0 flex items-center justify-center bg-bgDark bg-opacity-50 rounded-lg'>
                <div className='text-textLight flex items-center'>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  업로드 중...
                </div>
              </div>
            )}

            {/* 숨겨진 파일 입력 */}
            <input
              type='file'
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(file, onChange);
                }
                // 같은 파일 선택 시 이벤트 발생하도록 초기화
                e.target.value = '';
              }}
              accept={ALLOWED_IMAGE_TYPES.join(',')}
              className='hidden'
            />
          </div>

          {/* 에러 메시지 - isError 직접 사용 */}
          {(error || isError) && (
            <p className='mt-1 !text-red-500 typo-caption1'>
              {error || '이미지 업로드에 실패했습니다.'}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default ThumbnailUploader;
