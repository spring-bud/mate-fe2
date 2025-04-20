import { z } from 'zod';

// 지원되는 이미지 타입 정의
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

// 최대 파일 크기 (10MB)
export const MAX_IMAGE_FILE_SIZE = 10 * 1024 * 1024;

// 이미지 URL 스키마
export const imageUrlSchema = z
  .string()
  .min(1, { message: '이미지를 업로드해주세요.' })
  .refine((url) => url.startsWith('data:image/') || url.startsWith('http'), {
    message: '유효한 이미지 URL이 아닙니다.',
  });

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
      .refine((file) => file.size <= MAX_IMAGE_FILE_SIZE, {
        message: `이미지 크기는 10MB 이하여야 합니다.`,
      }),
  });

  return imageFileSchema.safeParse({ file });
};

// 이미지 업로드 전 검증하는 훅에서 사용할 수 있는 헬퍼 함수
export const checkImageBeforeUpload = (
  file: File
): { isValid: boolean; errorMessage?: string } => {
  const validation = validateImageFile(file);

  if (!validation.success) {
    return {
      isValid: false,
      errorMessage:
        validation.error.errors[0]?.message ||
        '이미지 유효성 검사에 실패했습니다.',
    };
  }

  return { isValid: true };
};
