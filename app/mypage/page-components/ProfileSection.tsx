'use client';

import useUpdateUserInfo from '@/hooks/mutation/useUpdateUserInfo';
import { User } from '@/schemas/api/user.schema';
import { UserFormData } from '@/schemas/validations/userForm.schema';
import ProfileForm from './form/ProfileForm';
import ProfileView from './ProfileView';

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
  const updateUserMutation = useUpdateUserInfo();

  const onSubmit = async (data: UserFormData) => {
    try {
      // info_active가 true일 때 필수 필드 검증
      if (data.info_active === true || data.info_active === 1) {
        const missingFields = [];

        if (!data.job_type || data.job_type.trim() === '') {
          missingFields.push('직업');
        }

        if (data.job_year === null || data.job_year === undefined) {
          missingFields.push('경력');
        }

        if (!data.contact || data.contact.trim() === '') {
          missingFields.push('연락처');
        }

        if (!data.user_stacks || data.user_stacks.length === 0) {
          missingFields.push('기술 스택');
        }

        if (missingFields.length > 0) {
          alert(
            `프리랜서 등록 활성화시 다음 항목들이 필수입니다: ${missingFields.join(
              ', '
            )}`
          );
          return;
        }
      }

      // 원본 데이터와 비교하여 변경된 필드만 추출
      const changedFields: Partial<User> = {};
      let hasChanges = false;

      // 기본 필드 변경 감지
      if (data.nickname !== userData.nickname) {
        // 닉네임은 8글자 이하로 제한
        if (data.nickname.length > 8) {
          data.nickname = data.nickname.substring(0, 8);
        }
        changedFields.nickname = data.nickname;
        hasChanges = true;
      }

      if (data.job_type !== userData.job_type) {
        // job_type은 15글자 이하로 제한
        changedFields.job_type =
          data.job_type && data.job_type.length > 15
            ? data.job_type.substring(0, 15)
            : data.job_type;
        hasChanges = true;
      }

      if (data.job_year !== userData.job_year) {
        // 경력 값에 최대 제한 추가 (최대 100년)
        let yearValue = null;
        if (typeof data.job_year === 'string' && data.job_year !== '') {
          const parsedYear = parseInt(data.job_year, 10);
          yearValue =
            !isNaN(parsedYear) && parsedYear > 0 && parsedYear <= 100
              ? parsedYear
              : null;
        } else if (typeof data.job_year === 'number') {
          yearValue =
            data.job_year > 0 && data.job_year <= 100 ? data.job_year : null;
        }
        changedFields.job_year = yearValue;
        hasChanges = true;
      }

      if (data.email !== (userData.email || '')) {
        // 빈 문자열은 서버에 빈 문자열로 전송
        changedFields.email = data.email;
        hasChanges = true;
      }

      if (data.contact !== (userData.contact || '')) {
        // 빈 문자열은 서버에 빈 문자열로 전송
        changedFields.contact = data.contact;
        hasChanges = true;
      }

      if (data.github_url !== (userData.github_url || '')) {
        // 빈 문자열은 서버에 빈 문자열로 전송
        changedFields.github_url = data.github_url;
        hasChanges = true;
      }

      if (data.blog_url !== (userData.blog_url || '')) {
        // 빈 문자열은 서버에 빈 문자열로 전송
        changedFields.blog_url = data.blog_url;
        hasChanges = true;
      }

      if (data.intro !== (userData.intro || '')) {
        // 빈 문자열은 서버에 빈 문자열로 전송
        changedFields.intro = data.intro;
        hasChanges = true;
      }

      // 프로필 이미지가 변경되었고 미리보기가 있으면 profile_url 추가
      if (data.profile_url && data.profile_url !== userData.profile_url) {
        changedFields.profile_url = data.profile_url;
        hasChanges = true;
      }

      // 정보 공개 설정 변경 확인
      if (data.info_active !== (userData.info_active || false)) {
        // boolean을 0/1로 변환해서 전송
        changedFields.info_active = data.info_active ? 1 : (0 as any);
        hasChanges = true;
      }

      // 스택 변경 확인
      const originalStacks = userData.user_stacks || [];
      const newStacks = data.user_stacks || [];

      // 스택 내용이 변경되었는지 확인
      const stacksChanged =
        originalStacks.length !== newStacks.length ||
        newStacks.some(
          (newStack) =>
            !originalStacks.some((oldStack) => oldStack.name === newStack.name)
        );

      if (stacksChanged) {
        // 스택 이름만 추출하여 문자열 배열로 설정 (빈 배열이라도 항상 배열 전송)
        changedFields.user_stacks =
          newStacks.length > 0
            ? (newStacks.map((stack) => stack.name) as any)
            : ([] as any); // 빈 배열 전송
        hasChanges = true;
      }

      // user_stacks를 항상 포함시킴 (변경되지 않은 경우에도)
      if (!changedFields.user_stacks) {
        // 기존 스택 정보 유지
        changedFields.user_stacks = originalStacks.map(
          (stack) => stack.name
        ) as any;
      }

      // info_active를 항상 포함시킴 (변경되지 않은 경우에도)
      if (!changedFields.hasOwnProperty('info_active')) {
        changedFields.info_active = userData.info_active ? 1 : (0 as any);
      }

      // 변경사항이 있거나 필수 필드가 포함된 경우 요청 보내기
      if (
        hasChanges ||
        changedFields.user_stacks ||
        changedFields.hasOwnProperty('info_active')
      ) {
        await updateUserMutation.mutateAsync(changedFields as User);
      } else {
        console.log('변경사항 없음');
      }

      toggleEditMode();
    } catch (error) {
      console.error('프로필 업데이트 중 오류:', error);
      // validation 에러는 폼에서 자동으로 처리됨
    }
  };

  return (
    <div className='flex flex-col'>
      {isEditMode ? (
        <ProfileForm
          userData={userData}
          onSubmit={onSubmit}
          toggleEditMode={toggleEditMode}
          isSubmitting={updateUserMutation.isPending}
        />
      ) : (
        <ProfileView userData={userData} toggleEditMode={toggleEditMode} />
      )}
    </div>
  );
};

export default ProfileSection;
