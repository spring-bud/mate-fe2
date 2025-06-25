import { z } from 'zod';
import { User } from '../api/user.schema';

export const userFormSchema = z
  .object({
    nickname: z
      .string()
      .min(2, '닉네임은 최소 2글자 이상이어야 합니다')
      .max(8, '닉네임은 최대 8글자까지 가능합니다')
      .refine(
        (val) => !val.includes(' '),
        '닉네임에는 공백이 포함될 수 없습니다'
      ),
    job_type: z
      .string()
      .max(15, '직업은 최대 15글자까지 가능합니다')
      .nullable()
      .optional(),
    job_year: z
      .union([
        z
          .number()
          .int('경력은 정수여야 합니다')
          .positive('경력은 양수여야 합니다')
          .max(100, '경력은 100년을 초과할 수 없습니다')
          .nullable(),
        z
          .string()
          .transform((val) => (val === '' ? null : parseInt(val, 10)))
          .refine(
            (val) =>
              val === null || (Number.isInteger(val) && val > 0 && val <= 100),
            '유효한 경력을 입력해주세요 (1-100년)'
          ),
      ])
      .nullable()
      .optional(),
    email: z
      .union([z.string().email('유효한 이메일 형식이 아닙니다'), z.literal('')])
      .optional(),
    contact: z.string().optional(),
    github_url: z
      .union([z.string().url('유효한 URL 형식이 아닙니다'), z.literal('')])
      .optional(),
    blog_url: z
      .union([z.string().url('유효한 URL 형식이 아닙니다'), z.literal('')])
      .optional(),
    intro: z.string().optional(),
    profile_url: z.string().url().optional(),
    user_stacks: z
      .array(
        z.object({
          stack_id: z.number(),
          name: z.string(),
        })
      )
      .optional(),
    info_active: z
      .union([z.boolean(), z.number().int().min(0).max(1)])
      .optional(),
  })
  .refine(
    (data) => {
      // info_active가 true일 때만 필수 필드 검증
      if (data.info_active === true || data.info_active === 1) {
        const missingFields = [];

        // 직업 검증
        if (!data.job_type || data.job_type.trim() === '') {
          missingFields.push('직업');
        }

        // 경력 검증
        if (data.job_year === null || data.job_year === undefined) {
          missingFields.push('경력');
        }

        // 연락처 검증
        if (!data.contact || data.contact.trim() === '') {
          missingFields.push('연락처');
        }

        // 기술 스택 검증
        if (!data.user_stacks || data.user_stacks.length === 0) {
          missingFields.push('기술 스택');
        }

        return missingFields.length === 0;
      }
      return true;
    },
    {
      message:
        '프리랜서 등록 활성화시 직업, 경력, 연락처, 기술 스택은 필수입니다.',
      path: ['info_active'], // 에러를 info_active 필드에 연결
    }
  );

export type UserFormData = z.infer<typeof userFormSchema>;

export const apiToFormUser = (apiUser: User): UserFormData => {
  return {
    nickname: apiUser.nickname,
    profile_url: apiUser.profile_url,
    job_type: apiUser.job_type,
    job_year: apiUser.job_year,
    intro: apiUser.intro ?? '',
    email: apiUser.email ?? '',
    contact: apiUser.contact ?? '',
    github_url: apiUser.github_url ?? '',
    blog_url: apiUser.blog_url ?? '',
    user_stacks: apiUser.user_stacks,
    info_active: apiUser.info_active ?? false,
  };
};
