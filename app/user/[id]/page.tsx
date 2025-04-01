// app/user/[id]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import UserProfileContainer from '@/app/user/[id]/page-components/UserProfileContainer';
import { mockUserData, mockUserPosts, mockUserReviews } from '@/mock/userData';

// 유저의 상세 소개 내용 (Tiptap HTML 형식)
const detailedIntroContent = `
<h2>안녕하세요, 프론트엔드 개발자 김개발입니다.</h2>
<p>저는 <strong>5년 차 프론트엔드 개발자</strong>로, 주로 React와 TypeScript를 활용하여 웹 애플리케이션을 개발하고 있습니다. 사용자 경험을 중시하며, 성능 최적화에 관심이 많습니다.</p>
<h3>주요 기술 스택</h3>
<ul>
  <li>JavaScript / TypeScript</li>
  <li>React / Next.js</li>
  <li>HTML5 / CSS3 / Tailwind CSS</li>
  <li>Node.js / Express</li>
  <li>Git / GitHub</li>
</ul>
<h3>주요 프로젝트</h3>
<ol>
  <li>
    <p><strong>소셜 미디어 플랫폼</strong> - React, TypeScript, Firebase를 활용한 실시간 소셜 미디어 애플리케이션</p>
  </li>
  <li>
    <p><strong>e-커머스 웹사이트</strong> - Next.js와 Tailwind CSS로 개발한 반응형 쇼핑몰</p>
  </li>
  <li>
    <p><strong>대시보드 시스템</strong> - React와 D3.js를 활용한 데이터 시각화 대시보드</p>
  </li>
</ol>
<h3>자격증 및 교육</h3>
<ul>
  <li>정보처리기사</li>
  <li>AWS 공인 개발자 - 어소시에이트</li>
  <li>모던 자바스크립트 마스터 과정 수료</li>
</ul>
<p>프로젝트 협업이나 궁금한 점이 있으시면 언제든지 연락주세요!</p>
`;

interface UserPageProps {
  params: {
    id: string;
  };
}

// 서버 컴포넌트 페이지
export default function UserPage({ params }: UserPageProps) {
  const userId = parseInt(params.id);

  // 유저 데이터가 없는 경우 404 페이지 표시
  if (isNaN(userId) || userId !== mockUserData.user_id) {
    notFound();
  }

  // 실제 환경에서는 API에서 데이터를 가져옵니다
  // 여기서는 간단히 모킹 데이터를 사용합니다

  return (
    <UserProfileContainer
      userData={mockUserData}
      detailedIntroContent={detailedIntroContent}
      posts={mockUserPosts}
      reviews={mockUserReviews}
    />
  );
}
