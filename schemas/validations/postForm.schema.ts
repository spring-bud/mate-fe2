import { z } from 'zod';

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

// 최대 파일 크기 (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// 이미지 URL 스키마
export const imageUrlSchema = z
  .string()
  .min(1, { message: '이미지를 업로드해주세요.' })
  .refine((url) => url.startsWith('data:image/') || url.startsWith('http'), {
    message: '유효한 이미지 URL이 아닙니다.',
  });

// 태그 길이 검증 함수
const validateTagLength = (tag: string) => {
  const hasKorean = /[가-힣]/.test(tag);
  const maxLength = hasKorean ? 10 : 20;
  return tag.length <= maxLength;
};

// 특수문자 및 불완전한 한글 검증 함수
const validateTagContent = (tag: string) => {
  const hasSpecialChars = /[^\w\s가-힣]|_/.test(tag);
  const hasIncompleteHangul = /[ㄱ-ㅎㅏ-ㅣ]/.test(tag);

  return !hasSpecialChars && !hasIncompleteHangul;
};

// 태그 배열 스키마
const tagsSchema = z
  .array(z.string())
  .max(5, { message: '태그는 최대 5개까지 추가할 수 있습니다.' })
  .refine((tags) => tags.every(validateTagLength), {
    message: '한글 태그는 10자, 영문 태그는 20자 이내로 작성해주세요.',
  })
  .refine((tags) => tags.every(validateTagContent), {
    message:
      '태그에는 특수문자나 불완전한 한글(자음/모음만)을 포함할 수 없습니다.',
  });

// 포스트 폼 스키마
export const postFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: '제목은 최소 5자 이상이어야 합니다.' })
    .max(30, { message: '제목은 최대 30자까지 입력 가능합니다.' }),

  content: z
    .string()
    .min(10, { message: '내용은 최소 10자 이상이어야 합니다.' }),

  category: z.string().min(1, { message: '카테고리를 선택해주세요.' }),

  tags: tagsSchema,

  // 이미지 URL 스키마 사용
  thumbnail_url: z
    .string()
    .min(1, { message: '썸네일 이미지를 업로드해주세요.' }),
});

// 기본값
export const defaultPostFormValues = {
  title: '',
  content: '',
  category: '',
  tags: [],
  thumbnail_url: '',
};

// 이미지 파일 검증 함수
export const validateImageFile = (
  file: File
): z.SafeParseReturnType<{ file: File }, { file: File }> => {
  const imageFileSchema = z.object({
    file: z
      .instanceof(File)
      .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
        message: `지원되는 이미지 형식은 ${ALLOWED_IMAGE_TYPES.map((type) =>
          type.replace('image/', '')
        ).join(', ')} 입니다.`,
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `이미지 크기는 5MB 이하여야 합니다.`,
      }),
  });

  return imageFileSchema.safeParse({ file });
};

// 타입 정의
export type PostFormData = z.infer<typeof postFormSchema>;

export default postFormSchema;
