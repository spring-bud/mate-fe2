// tailwind.config.ts
import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config';
import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // 'class' 또는 'media'
  theme: {
    screens: {
      xs: '320px', // 모바일 작은 화면
      sm: '640px', // 모바일
      md: '768px', // 태블릿
      lg: '1024px', // 작은 데스크톱
      xl: '1280px', // 일반 데스크톱
      '2xl': '1340px', // 큰 데스크톱
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
        // 에디터 추가 색상
        placeholder: '#6A9955', // 플레이스홀더 색상
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.textPrimary'),
            a: {
              color: theme('colors.active'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
            },
            h1: {
              color: theme('colors.textLight'),
              fontWeight: '600',
            },
            h2: {
              color: theme('colors.textLight'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.textLight'),
              fontWeight: '600',
            },
            h4: {
              color: theme('colors.textLight'),
              fontWeight: '600',
            },
            h5: {
              color: theme('colors.textLight'),
              fontWeight: '600',
            },
            h6: {
              color: theme('colors.textLight'),
              fontWeight: '600',
            },
            strong: {
              color: theme('colors.textLight'),
            },
            code: {
              color: theme('colors.textLight'),
              backgroundColor: theme('colors.bgDark'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            blockquote: {
              color: theme('colors.textDim'),
              borderLeftColor: theme('colors.border'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.textDim'),
            },
            'ol > li::before': {
              color: theme('colors.textDim'),
            },
            hr: {
              borderColor: theme('colors.border'),
            },
            table: {
              borderColor: theme('colors.border'),
            },
            thead: {
              color: theme('colors.textLight'),
              borderBottomColor: theme('colors.border'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.border'),
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.textPrimary'),
            a: {
              color: theme('colors.active'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
    plugin(({ addBase, theme }: PluginAPI) => {
      addBase({
        '.ProseMirror p.is-editor-empty:first-child::before': {
          content: 'attr(data-placeholder)',
          color: theme('colors.placeholder'),
          float: 'left',
          pointerEvents: 'none',
          height: '0',
        },
      });
    }),
    // 타이포그래피 클래스
    plugin(({ addUtilities }: PluginAPI) => {
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
