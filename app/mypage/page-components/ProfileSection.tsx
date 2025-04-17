'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { TiptapEditor } from '@/components/common/tiptap';
import useUpdateUserInfo from '@/hooks/mutation/useUpdateUserInfo';
import useUploadImage from '@/hooks/mutation/useUploadImage';
import { User } from '@/schemas/api/user.schema';

interface ProfileSectionProps {
  userData: User;
  isEditMode: boolean;
  toggleEditMode: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  userData,
  isEditMode,
  toggleEditMode,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>({
    defaultValues: userData,
  });

  const updateUserMutation = useUpdateUserInfo();
  const uploadImageMutation = useUploadImage();
  const [techStack, setTechStack] = useState<string>('');
  const [techStacks, setTechStacks] = useState<
    { stack_id: number; name: string }[]
  >(userData.user_stacks || []);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 폼 제출 핸들러
  const onSubmit = async (data: User) => {
    try {
      // 원본 데이터와 비교하여 변경된 필드만 추출
      const changedFields: Partial<User> = {};
      let hasChanges = false;

      // 기본 필드 변경 감지
      if (data.nickname !== userData.nickname) {
        changedFields.nickname = data.nickname;
        hasChanges = true;
      }
      if (data.job_type !== userData.job_type) {
        changedFields.job_type = data.job_type;
        hasChanges = true;
      }
      if (data.job_year !== userData.job_year) {
        changedFields.job_year =
          typeof data.job_year === 'string'
            ? parseInt(data.job_year, 10)
            : data.job_year;
        hasChanges = true;
      }
      if (data.email !== userData.email) {
        changedFields.email = data.email;
        hasChanges = true;
      }
      if (data.contact !== userData.contact) {
        changedFields.contact = data.contact;
        hasChanges = true;
      }
      if (data.github_url !== userData.github_url) {
        changedFields.github_url = data.github_url || null;
        hasChanges = true;
      }
      if (data.blog_url !== userData.blog_url) {
        changedFields.blog_url = data.blog_url || null;
        hasChanges = true;
      }
      if (data.intro !== userData.intro) {
        changedFields.intro = data.intro;
        hasChanges = true;
      }

      // 프로필 이미지가 변경되었고 미리보기가 있으면 profile_url 추가
      if (previewImage && previewImage !== userData.profile_url) {
        changedFields.profile_url = previewImage;
        hasChanges = true;
      }

      // 스택 변경 확인
      const originalStacks = userData.user_stacks || [];
      // 스택 내용이 변경되었는지 확인
      const stacksChanged =
        originalStacks.length !== techStacks.length ||
        techStacks.some(
          (newStack) =>
            !originalStacks.some((oldStack) => oldStack.name === newStack.name)
        );

      if (stacksChanged) {
        // 스택 이름만 추출하여 문자열 배열로 설정
        changedFields.user_stacks = techStacks.map(
          (stack) => stack.name
        ) as any;
        hasChanges = true;
      }

      // 변경사항이 있을 때만 요청 보내기
      if (hasChanges) {
        changedFields.user_stacks = techStacks.map(
          (stack) => stack.name
        ) as any;

        console.log('변경된 필드만 전송:', changedFields);
        await updateUserMutation.mutateAsync(changedFields as User);
      } else {
        console.log('변경사항 없음, API 요청 건너뜀');
      }

      // 변경사항 유무와 상관없이 편집 모드 종료
      toggleEditMode();
    } catch (error) {
      console.error('프로필 업데이트 중 오류:', error);
    }
  };

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
      alert('이미지 업로드에 실패했습니다.');
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
    if (!techStack.trim()) return;

    // 첫 글자는 대문자로 변환
    const formattedStack =
      techStack.trim().charAt(0).toUpperCase() + techStack.trim().slice(1);

    // 중복 체크
    if (techStacks.some((stack) => stack.name === formattedStack)) {
      return;
    }

    // 임시 ID 생성 (실제로는 서버에서 할당)
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

  return (
    <div className='flex flex-col'>
      {isEditMode ? (
        // 편집 모드
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* user_status 필드 (hidden) */}

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
                  {uploadImageMutation.isPending
                    ? '업로드 중...'
                    : '이미지 변경'}
                </button>
              </div>

              {/* 기본 정보 입력 폼 */}
              <div className='flex-1 space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className='block text-textLight typo-body2'>
                      닉네임
                    </label>
                    <input
                      {...register('nickname')}
                      className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                    />
                    {errors.nickname && (
                      <span className='text-error typo-caption1'>
                        닉네임을 입력하세요
                      </span>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <label className='block text-textLight typo-body2'>
                      직업
                    </label>
                    <input
                      type='text'
                      {...register('job_type')}
                      placeholder='직업을 입력하세요'
                      className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='block text-textLight typo-body2'>
                      경력(년)
                    </label>
                    <input
                      type='number'
                      {...register('job_year')}
                      className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                    />
                    {errors.job_year && (
                      <span className='text-error typo-caption1'>
                        유효한 경력을 입력하세요
                      </span>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <label className='block text-textLight typo-body2'>
                      이메일
                    </label>
                    <input
                      type='email'
                      {...register('email')}
                      className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                    />
                    {errors.email && (
                      <span className='text-error typo-caption1'>
                        유효한 이메일을 입력하세요
                      </span>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <label className='block text-textLight typo-body2'>
                      연락처
                    </label>
                    <input
                      {...register('contact')}
                      className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='block text-textLight typo-body2'>
                      GitHub URL
                    </label>
                    <input
                      {...register('github_url')}
                      className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='block text-textLight typo-body2'>
                      블로그 URL
                    </label>
                    <input
                      {...register('blog_url')}
                      className='w-full px-3 py-2 bg-bgDark border border-border rounded text-textLight'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 기술 스택 관리 */}
            <div className='mt-6 space-y-4'>
              <h3 className='text-textLight typo-head3'>기술 스택</h3>
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
                  placeholder='기술 스택 추가 (예: React)'
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
              disabled={updateUserMutation.isPending}
            >
              {updateUserMutation.isPending ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      ) : (
        // 조회 모드
        <div className='space-y-8'>
          <div className='bg-bgLight p-6 rounded-lg border border-border'>
            <div className='flex flex-col md:flex-row gap-6'>
              {/* 프로필 이미지 */}
              <div className='relative w-32 h-32 rounded-full border-4 border-selection overflow-hidden'>
                <Image
                  src={userData.profile_url}
                  alt={userData.nickname}
                  fill
                  className='object-cover'
                />
              </div>

              {/* 기본 정보 */}
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-4'>
                  <h1 className='typo-head1 text-textLight'>
                    {userData.nickname}
                  </h1>
                  <span className='px-3 py-1 bg-active bg-opacity-20 text-active rounded text-sm font-medium'>
                    {userData.job_type}
                  </span>
                </div>

                {userData.job_year && (
                  <p className='text-textLight mb-4'>
                    {userData.job_year}년차 {userData.job_type}
                  </p>
                )}

                {/* 연락처 정보 */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-textLight'>
                  <div>
                    {userData.email && (
                      <div className='mb-2'>
                        <span className='text-textDim typo-caption1 mr-2'>
                          이메일:
                        </span>
                        <span>{userData.email}</span>
                      </div>
                    )}
                    {userData.contact && (
                      <div>
                        <span className='text-textDim typo-caption1 mr-2'>
                          연락처:
                        </span>
                        <span>{userData.contact}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    {userData.github_url && (
                      <div className='mb-2'>
                        <span className='text-textDim typo-caption1 mr-2'>
                          GitHub:
                        </span>
                        <a
                          href={userData.github_url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-active hover:underline'
                        >
                          {userData.github_url}
                        </a>
                      </div>
                    )}
                    {userData.blog_url && (
                      <div>
                        <span className='text-textDim typo-caption1 mr-2'>
                          블로그:
                        </span>
                        <a
                          href={userData.blog_url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-active hover:underline'
                        >
                          {userData.blog_url}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* 기술 스택 */}
                <div className='mt-6'>
                  <h3 className='text-textLight typo-head4 mb-3'>기술 스택</h3>
                  <div className='flex flex-wrap gap-2'>
                    {userData.user_stacks && userData.user_stacks.length > 0 ? (
                      userData.user_stacks.map((stack) => (
                        <span
                          key={stack.stack_id}
                          className='bg-bgDark text-textLight typo-caption1 px-2 py-1 rounded'
                        >
                          {stack.name}
                        </span>
                      ))
                    ) : (
                      <span className='text-textDim'>
                        등록된 기술 스택이 없습니다.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 자기소개 */}
            <div className='mt-8'>
              <h3 className='text-textLight typo-head3 mb-4'>자기소개</h3>
              <div className='bg-bgDark p-4 rounded border border-border text-textLight'>
                {userData.intro ? (
                  <div
                    className='prose prose-invert max-w-none'
                    dangerouslySetInnerHTML={{ __html: userData.intro }}
                  />
                ) : (
                  <p className='text-textDim'>자기소개가 없습니다.</p>
                )}
              </div>
            </div>
          </div>

          {/* 수정 버튼 */}
          <div className='flex justify-end'>
            <button
              onClick={toggleEditMode}
              className='px-4 py-2 bg-active text-white rounded'
            >
              프로필 수정
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
