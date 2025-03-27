import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // 'class' 또는 'media'
  theme: {
    screens: {
      sm: {
        min: '320px',
        max: '743px',
      },
      md: {
        min: '744px',
        max: '1339px',
      },
      lg: {
        min: '1340px',
      },
      short: { raw: '(max-height: 900px)' },
    },
    extend: {
      fontFamily: {
        sans: [
          'Pretendard',
          'Noto Sans KR',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'D2Coding', 'Consolas', 'Monaco', 'monospace'],
        code: ['Fira Code', 'Source Code Pro', 'monospace'],
      },
      colors: {
        // 다크 테마 색상
        bgDark: '#1E1E1E', // 배경 어두운 색상
        bgLight: '#252526', // 배경 밝은 색상
        bgDarker: '#1A1A1A', // 더 어두운 배경색
        sidebar: '#252526', // 사이드바 색상
        textPrimary: '#D4D4D4', // 기본 텍스트
        textLight: '#E8E8E8', // 밝은 텍스트
        textDim: '#A9A9A9', // 흐린 텍스트
        selection: '#264F78', // 선택된 항목
        border: '#474747', // 테두리
        active: '#007ACC', // 활성 항목
        hover: '#2A2D2E', // 호버 배경
        // 상태 색상
        info: '#3794FF', // 정보
        warning: '#CCA700', // 경고
        error: '#F14C4C', // 오류
        success: '#89D185', // 성공
        // 코드 색상
        comment: '#6A9955', // 주석
        keyword: '#569CD6', // 키워드
        string: '#CE9178', // 문자열
        function: '#DCDCAA', // 함수
        variable: '#9CDCFE', // 변수
        type: '#4EC9B0', // 타입
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        code: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.typo-head1': {
          fontSize: '32px',
          lineHeight: '41px',
          fontWeight: '600',
        },
        '.typo-head2': {
          fontSize: '22px',
          lineHeight: '28px',
          fontWeight: '600',
        },
        '.typo-head3': {
          fontSize: '17px',
          lineHeight: '22px',
          fontWeight: '600',
        },
        '.typo-head4': {
          fontSize: '15px',
          lineHeight: '20px',
          fontWeight: '500',
        },
        '.typo-button1': {
          fontSize: '16px',
          lineHeight: '22px',
          fontWeight: '600',
        },
        '.typo-button2': {
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: '500',
        },
        '.typo-caption1': {
          fontSize: '12px',
          lineHeight: '16px',
          fontWeight: '500',
        },
        '.typo-caption2': {
          fontSize: '11px',
          lineHeight: '13px',
          fontWeight: '500',
        },
        '.typo-body1': {
          fontSize: '15px',
          lineHeight: '20px',
          fontWeight: '400',
        },
        '.typo-body2': {
          fontSize: '13px',
          lineHeight: '18px',
          fontWeight: '400',
        },
        '.typo-small': {
          fontSize: '11px',
          lineHeight: '13px',
          fontWeight: '400',
        },
      });
    }),
  ],
};

export default config;
