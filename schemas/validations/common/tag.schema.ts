import { z } from 'zod';

export const validateTagLength = (tag: string) => {
  const hasKorean = /[가-힣]/.test(tag);
  const maxLength = hasKorean ? 10 : 20;
  return tag.length <= maxLength;
};

export const validateTagContent = (tag: string) => {
  const hasSpecialChars = /[^\w\s가-힣]|_/.test(tag);
  const hasIncompleteHangul = /[ㄱ-ㅎㅏ-ㅣ]/.test(tag);

  return !hasSpecialChars && !hasIncompleteHangul;
};

export const tagsSchema = z
  .array(z.string())
  .max(5, { message: '태그는 최대 5개까지 추가할 수 있습니다.' })
  .refine((tags) => tags.every(validateTagLength), {
    message: '한글 태그는 10자, 영문 태그는 20자 이내로 작성해주세요.',
  })
  .refine((tags) => tags.every(validateTagContent), {
    message:
      '태그에는 특수문자나 불완전한 한글(자음/모음만)을 포함할 수 없습니다.',
  });

export const user_stacksSchema = z
  .array(
    z.object({
      stack_id: z.number(),
      name: z
        .string()
        .refine(
          (name) => validateTagLength(name),
          '한글 스택 이름은 10자, 영문 스택 이름은 20자 이내로 작성해주세요.'
        )
        .refine(
          (name) => validateTagContent(name),
          '스택 이름에는 특수문자나 불완전한 한글(자음/모음만)을 포함할 수 없습니다.'
        ),
    })
  )
  .max(12, { message: '기술 스택은 최대 12개까지 추가할 수 있습니다.' })
  .optional();
