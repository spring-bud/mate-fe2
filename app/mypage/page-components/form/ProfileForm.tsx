'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useForm, useWatch } from 'react-hook-form';
import { TiptapEditor } from '@/components/common/tiptap';
import useUploadImage from '@/hooks/mutation/useUploadImage';
import { User } from '@/schemas/api/user.schema';
import {
  UserFormData,
  userFormSchema,
  apiToFormUser,
} from '@/schemas/validations/userForm.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  validateTagLength,
  validateTagContent,
} from '@/schemas/validations/common/tag.schema';

interface ProfileFormProps {
  userData: User;
  onSubmit: (data: UserFormData) => Promise<void>;
  toggleEditMode: () => void;
  isSubmitting: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  userData,
  onSubmit,
  toggleEditMode,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: apiToFormUser(userData),
    resolver: zodResolver(userFormSchema),
  });

  // 폼 값 실시간 감시
  const watchedValues = useWatch({ control });

  const uploadImageMutation = useUploadImage();
  const [techStack, setTechStack] = useState<string>('');
  const [techStacks, setTechStacks] = useState<
    { stack_id: number; name: string }[]
  >(userData.user_stacks || []);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // info_active가 체크되었을 때 필수 필드 확인
  const isInfoActiveChecked = watchedValues.info_active;
  const checkRequiredFields = () => {
    const missingFields = [];

    if (!watchedValues.job_type || watchedValues.job_type.trim() === '') {
      missingFields.push('직업');
    }

    if (
      watchedValues.job_year === null ||
      watchedValues.job_year === undefined ||
      (typeof watchedValues.job_year === 'string' &&
        watchedValues.job_year === '')
    ) {
      missingFields.push('경력');
    }

    if (!watchedValues.contact || watchedValues.contact.trim() === '') {
      missingFields.push('연락처');
    }

    if (!techStacks || techStacks.length === 0) {
      missingFields.push('기술 스택');
    }

    return missingFields;
  };

  const missingRequiredFields = checkRequiredFields();

  // 이미지 업로드 핸들러
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 미리보기 이미지 생성
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);

      // 이미지 서버에 업로드
      const result = await uploadImageMutation.mutateAsync(file);
      // 업로드 성공 시 서버에서 반환된 URL로 미리보기 업데이트
      if (result && result.image_url) {
        setPreviewImage(result.image_url);
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류:', error);
      // 실패 시 미리보기 초기화
      setPreviewImage(null);
    }
  };

  // 이미지 변경 버튼 클릭 핸들러
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 기술 스택 추가 핸들러
  const handleAddTechStack = () => {
    const trimmed = techStack.trim();

    // 기본 유효성 검사
    if (!trimmed) {
      alert('기술 스택을 입력해주세요.');
      return;
    }

    // 유효성 검사 추가
    if (!validateTagLength(trimmed)) {
      alert('한글은 최대 10자, 영문은 최대 20자까지 입력할 수 있습니다.');
      return;
    }

    if (!validateTagContent(trimmed)) {
      alert('특수문자 또는 불완전한 한글(자음/모음만)은 사용할 수 없습니다.');
      return;
    }

    if (techStacks.length >= 12) {
      alert('기술 스택은 최대 12개까지 추가할 수 있습니다.');
      return;
    }

    const formattedStack = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);

    if (techStacks.some((stack) => stack.name === formattedStack)) {
      alert('이미 추가된 기술 스택입니다.');
      return;
    }

    const newStackId =
      Math.max(0, ...techStacks.map((stack) => stack.stack_id)) + 1;

    setTechStacks([
      ...techStacks,
      { stack_id: newStackId, name: formattedStack },
    ]);
    setTechStack('');
  };

  // 기술 스택 삭제 핸들러
  const handleRemoveTechStack = (stackId: number) => {
    setTechStacks(techStacks.filter((stack) => stack.stack_id !== stackId));
  };

  // 폼 제출 핸들러 래퍼
  const handleFormSubmit = (data: UserFormData) => {
    // 현재 기술 스택 상태를 폼 데이터에 추가
    const formDataWithStacks = {
      ...data,
      user_stacks: techStacks,
    };

    // 프로필 이미지 추가
    if (previewImage) {
      formDataWithStacks.profile_url = previewImage;
    }

    return onSubmit(formDataWithStacks);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='space-y-6'
      noValidate
    >
      <div className='bg-bgLight p-6 rounded-lg border border-border'>
        <div className='flex flex-col md:flex-row gap-6'>
          {/* 프로필 이미지 */}
          <div className='flex flex-col items-center space-y-4'>
            <div className='relative w-32 h-32 rounded-full border-4 border-selection overflow-hidden'>
              <Image
                src={previewImage || userData.profile_url}
                alt='프로필 이미지'
                fill
                className='object-cover'
              />
            </div>
            {/* 파일 입력 필드 (숨김) */}
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleImageChange}
              accept='image/*'
              className='hidden'
            />
            <button
              type='button'
              onClick={handleImageButtonClick}
              className='px-3 py-1 bg-active text-white rounded text-sm'
              disabled={uploadImageMutation.isPending}
            >
              {uploadImageMutation.isPending ? '업로드 중...' : '이미지 변경'}
            </button>
          </div>

          {/* 기본 정보 입력 폼 */}
          <div className='flex-1 space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='block text-textLight typo-body2'>
                  닉네임 <span className='text-error'>*</span>
                </label>
                <input
                  {...register('nickname')}
                  className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                />
                {errors.nickname && (
                  <span className='text-error '>{errors.nickname.message}</span>
                )}
              </div>

              <div className='space-y-2'>
                <label className='block text-textLight typo-body2'>
                  직업{' '}
                  {isInfoActiveChecked && <span className='text-error'>*</span>}
                </label>
                <input
                  type='text'
                  {...register('job_type')}
                  placeholder='직업을 입력하세요'
                  className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                />
                {errors.job_type && (
                  <span className='text-error '>{errors.job_type.message}</span>
                )}
              </div>

              <div className='space-y-2'>
                <label className='block text-textLight typo-body2'>
                  경력(년){' '}
                  {isInfoActiveChecked && <span className='text-error'>*</span>}
                </label>
                <input
                  type='number'
                  {...register('job_year')}
                  className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                />
                {errors.job_year && (
                  <span className='text-error'>{errors.job_year.message}</span>
                )}
              </div>

              <div className='space-y-2'>
                <label className='block text-textLight typo-body2'>
                  이메일
                </label>
                <input
                  type='text'
                  inputMode='email'
                  {...register('email')}
                  className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                />
                {errors.email && (
                  <span className='text-error '>{errors.email.message}</span>
                )}
              </div>

              <div className='space-y-2'>
                <label className='block text-textLight typo-body2'>
                  연락처{' '}
                  {isInfoActiveChecked && <span className='text-error'>*</span>}
                </label>
                <input
                  {...register('contact')}
                  className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                />
                {errors.contact && (
                  <span className='text-error'>{errors.contact.message}</span>
                )}
              </div>

              <div className='space-y-2'>
                <label className='block text-textLight typo-body2'>
                  GitHub URL
                </label>
                <input
                  {...register('github_url')}
                  className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                  placeholder='https://github.com/username'
                />
                {errors.github_url && (
                  <span className='text-error '>
                    {errors.github_url.message}
                  </span>
                )}
              </div>

              <div className='space-y-2'>
                <label className='block text-textLight typo-body2'>
                  블로그 URL
                </label>
                <input
                  {...register('blog_url')}
                  className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                  placeholder='https://blog.example.com'
                />
                {errors.blog_url && (
                  <span className='text-error'>{errors.blog_url.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 정보 공개 설정 */}
        <div className='mt-6 space-y-4'>
          <h3 className='text-textLight typo-head3'>
            프리랜서 페이지 노출 설정
          </h3>
          <div className='bg-bgDark p-4 rounded border border-border'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <label className='text-textLight typo-body2 font-medium'>
                  프리랜서 페이지에 프로필 노출
                </label>
                <p className='text-textDim typo-caption1 mt-1'>
                  프리랜서 검색 페이지에 내 프로필이 표시됩니다
                </p>
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  {...register('info_active')}
                  className='w-[25px] h-8 text-active bg-gray-100 border-gray-300 rounded focus:ring-active focus:ring-2'
                />
              </div>
            </div>

            {/* 실시간 필수 필드 확인 안내 */}
            {isInfoActiveChecked && missingRequiredFields.length > 0 && (
              <div className='mt-3 bg-yellow-50 border border-yellow-200 rounded-md p-3'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <svg
                      className='h-4 w-4 text-yellow-400'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='ml-2'>
                    <p className='text-sm text-yellow-700'>
                      프리랜서 등록 활성화를 위해 다음 항목들이 필요합니다:{' '}
                      {missingRequiredFields.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* validation 에러 메시지 표시 */}
            {errors.info_active && (
              <div className='mt-3 bg-red-50 border border-red-200 rounded-md p-3'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <svg
                      className='h-4 w-4 text-red-400'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='ml-2'>
                    <p className='text-sm text-red-700'>
                      {errors.info_active.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 기술 스택 관리 */}
        <div className='mt-6 space-y-4'>
          <h3 className='text-textLight typo-head3'>
            기술 스택{' '}
            {isInfoActiveChecked && <span className='text-error'>*</span>}
          </h3>
          <div className='flex flex-wrap gap-2 mb-4'>
            {techStacks.map((stack) => (
              <div
                key={stack.stack_id}
                className='inline-flex items-center gap-2 bg-bgDark text-textLight px-3 py-1 rounded'
              >
                <span>{stack.name}</span>
                <button
                  type='button'
                  onClick={() => handleRemoveTechStack(stack.stack_id)}
                  className='text-textDim hover:text-error'
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className='flex gap-2'>
            <input
              type='text'
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder='추가 버튼을 눌러주세요'
              className='flex-1 px-3 py-2 bg-bgDark border border-border rounded text-textLight'
            />
            <button
              type='button'
              onClick={handleAddTechStack}
              className='px-4 py-2 bg-active text-white rounded'
            >
              추가
            </button>
          </div>
        </div>

        {/* 자기소개 수정 (TipTap 에디터 사용) */}
        <div className='mt-6 space-y-4'>
          <h3 className='text-textLight typo-head3'>자기소개</h3>
          <div className='bg-bgDark border border-border rounded overflow-hidden'>
            <TiptapEditor
              name='intro'
              control={control}
              defaultValue={userData.intro || ''} // null 값 처리
              placeholder='자기소개를 입력하세요...'
            />
          </div>
        </div>
      </div>

      {/* 저장/취소 버튼 */}
      <div className='flex justify-end gap-4'>
        <button
          type='button'
          onClick={toggleEditMode}
          className='px-4 py-2 bg-bgLight text-textLight border border-border rounded'
        >
          취소
        </button>
        <button
          type='submit'
          className='px-4 py-2 bg-active text-white rounded'
          disabled={isSubmitting}
        >
          {isSubmitting ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
