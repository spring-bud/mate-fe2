// 카테고리 탭 옵션
export const CATEGORY_OPTIONS = {
  DEVELOP: 'DEVELOP',
  DESIGN: 'DESIGN',
} as const;

export type CategoryType =
  (typeof CATEGORY_OPTIONS)[keyof typeof CATEGORY_OPTIONS];

// 정렬 옵션
export const SORT_OPTIONS = {
  CREATE: 'CREATE',
  LIKE: 'LIKE',
} as const;

export type SortType = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

// 정렬 옵션 레이블
export const SORT_LABELS = {
  [SORT_OPTIONS.CREATE]: '최신순',
  [SORT_OPTIONS.LIKE]: '인기순',
} as const;

// 보기 모드
export const VIEW_MODES = {
  GRID: 'GRID',
  LIST: 'LIST',
} as const;

export type ViewModeType = (typeof VIEW_MODES)[keyof typeof VIEW_MODES];

// 태그 최대 개수
export const MAX_TAGS = 5;

// 초기 검색 파라미터
export const INITIAL_SEARCH_PARAMS = {
  category: CATEGORY_OPTIONS.DEVELOP,
  sort: SORT_OPTIONS.CREATE,
  tag: [],
  title: '',
  size: 4,
  page: 0,
};
