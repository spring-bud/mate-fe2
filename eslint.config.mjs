import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // 오류를 경고로 변경
      'react-hooks/exhaustive-deps': 'warn', // useEffect 의존성 경고로 설정
      '@next/next/no-img-element': 'warn', // img 태그 관련 경고로 설정
      '@typescript-eslint/no-explicit-any': 'off', // any 타입 허용
    },
  },
];

export default eslintConfig;
