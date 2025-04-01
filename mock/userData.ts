// mock/userData.ts

export const mockUserData = {
  user_id: 1,
  user_status: "ACTIVE",
  nickname: "김개발",
  profile_url: "/api/placeholder/120/120",
  job_type: "DEVELOPER",
  job_year: 5,
  intro:
    "안녕하세요! 5년차 프론트엔드 개발자입니다. React, TypeScript를 주로 사용하며 사용자 경험을 중시하는 웹 애플리케이션 개발을 전문으로 합니다.",
  email: "dev.kim@example.com",
  contact: "010-1234-5678",
  github_url: "https://github.com/devkim",
  blog_url: "https://devkim.blog.com",
  user_stacks: [
    { stack_id: 1, name: "React" },
    { stack_id: 2, name: "TypeScript" },
    { stack_id: 3, name: "Next.js" },
    { stack_id: 4, name: "Tailwind CSS" },
    { stack_id: 5, name: "Node.js" },
  ],
};

export const mockUserPosts = [
  {
    id: 1,
    title: "React와 TypeScript로 견고한 애플리케이션 만들기",
    thumbnail_url: "/api/placeholder/300/200",
    created_at: "2024-03-15T09:00:00Z",
    category: "DEVELOP",
    view_count: 1250,
    like_count: 45,
  },
  {
    id: 2,
    title: "Next.js 13에서 App Router 활용하기",
    thumbnail_url: "/api/placeholder/300/200",
    created_at: "2024-02-28T14:30:00Z",
    category: "DEVELOP",
    view_count: 980,
    like_count: 36,
  },
  {
    id: 3,
    title: "Tailwind CSS로 효율적인 UI 설계하기",
    thumbnail_url: "/api/placeholder/300/200",
    created_at: "2024-01-17T11:15:00Z",
    category: "DESIGN",
    view_count: 870,
    like_count: 29,
  },
];

export const mockUserReviews = [
  {
    id: 1,
    content:
      "빠른 소통과 정확한 작업 결과물에 매우 만족합니다. 다음에도 꼭 함께 작업하고 싶습니다.",
    rating: 5,
    author: "이클라이언트",
    created_at: "2024-03-10T18:30:00Z",
  },
  {
    id: 2,
    content:
      "요구사항을 잘 이해하고 기한 내에 완성도 높은 결과물을 제공해주셨습니다. 특히 UI 부분이 마음에 들었습니다.",
    rating: 4.5,
    author: "박디자이너",
    created_at: "2024-02-05T14:20:00Z",
  },
  {
    id: 3,
    content:
      "세심한 부분까지 신경써주시고 중간중간 진행상황 공유도 잘 해주셔서 협업이 원활했습니다.",
    rating: 5,
    author: "최기획자",
    created_at: "2024-01-22T09:45:00Z",
  },
];
