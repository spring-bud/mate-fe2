import { PostFormData } from '@/schemas/validations/postForm.schema';

// 목업 데이터를 생성하는 함수
export const getProductMockData = (id: string): PostFormData => {
  // 기본 목업 데이터
  const mockData: Record<string, PostFormData> = {
    '1': {
      title: '웹 애플리케이션 리디자인 및 프론트엔드 개발',
      category: 'DEVELOP',
      content: `<h1>웹 애플리케이션 리디자인 프로젝트</h1>
      <p>기존의 웹사이트를 현대적이고 사용자 친화적인 디자인으로 개선하는, React.js 기반의 프론트엔드 리팩토링 프로젝트입니다.</p>
      
      <h2>프로젝트 목표</h2>
      <ul>
        <li>사용자 경험(UX) 개선</li>
        <li>모바일 친화적인 반응형 디자인 구현</li>
        <li>기존 레거시 코드의 현대화</li>
        <li>성능 최적화 및 로딩 속도 개선</li>
        <li>접근성 표준 준수</li>
      </ul>
      
      <h2>기술 요구사항</h2>
      <p>다음 기술 스택에 익숙한 개발자를 찾고 있습니다:</p>
      <ul>
        <li>React.js (훅 사용에 능숙)</li>
        <li>TypeScript</li>
        <li>Tailwind CSS 또는 styled-components</li>
        <li>상태 관리 (Redux, Context API, Recoil 등)</li>
        <li>RESTful API 연동 경험</li>
      </ul>
      
      <h2>프로젝트 범위</h2>
      <p>이 프로젝트는 다음과 같은 작업을 포함합니다:</p>
      <ol>
        <li>기존 UI 분석 및 개선 포인트 도출</li>
        <li>디자인 시스템 구축 (컴포넌트 라이브러리)</li>
        <li>핵심 페이지 리디자인 구현</li>
        <li>반응형 레이아웃 설계</li>
        <li>API 연동 및 데이터 흐름 최적화</li>
      </ol>
      
      <blockquote>
        <p>기존 시스템을 유지하면서 점진적으로 새로운 디자인과 기능을 적용해야 합니다.</p>
      </blockquote>
      
      <h2>일정 및 산출물</h2>
      <p>총 프로젝트 기간은 약 2개월을 예상하며, 다음과 같은 산출물이 필요합니다:</p>
      <ul>
        <li>컴포넌트 라이브러리 및 문서화</li>
        <li>소스 코드 및 버전 관리</li>
        <li>성능 테스트 결과 보고서</li>
        <li>배포 가이드라인</li>
      </ul>
      
      <p>이 프로젝트를 통해 사용자 경험을 크게 개선하고 유지보수가 용이한 코드베이스를 만들고자 합니다.</p>
      
      <h2>문의 및 지원</h2>
      <p>추가 질문이나 포트폴리오 제출은 이메일로 부탁드립니다.</p>`,
      thumbnail_url: '/api/placeholder/400/320',
      tags: ['React', 'TypeScript', 'UI/UX', '프론트엔드', '리팩토링'],
    },
    '2': {
      title: '모바일 앱 MVP 개발 (iOS/Android)',
      category: 'DEVELOP',
      content: `<h1>헬스케어 모바일 앱 MVP 개발 프로젝트</h1>
      <p>사용자들이 건강 데이터를 추적하고 관리할 수 있는 크로스 플랫폼 모바일 애플리케이션의 MVP(Minimum Viable Product) 버전 개발 프로젝트입니다.</p>
      
      <h2>프로젝트 개요</h2>
      <p>이 앱은 다음과 같은 핵심 기능을 포함합니다:</p>
      <ul>
        <li>사용자 인증 및 프로필 관리</li>
        <li>건강 데이터 기록 및 시각화</li>
        <li>목표 설정 및 진행 상황 추적</li>
        <li>알림 및 리마인더 기능</li>
        <li>기본적인 소셜 기능 (선택적)</li>
      </ul>
      
      <h2>기술 요구사항</h2>
      <p>다음 기술 중 하나를 사용한 크로스 플랫폼 개발 경험이 필요합니다:</p>
      <ol>
        <li>Flutter & Dart</li>
        <li>React Native & JavaScript/TypeScript</li>
      </ol>
      
      <h3>추가 기술 요건:</h3>
      <ul>
        <li>상태 관리 라이브러리 사용 경험</li>
        <li>백엔드 API 연동 경험</li>
        <li>모바일 UI/UX 디자인 이해</li>
        <li>푸시 알림 구현 경험</li>
        <li>로컬 데이터 저장소 활용 능력</li>
      </ul>
      
      <h2>개발 범위</h2>
      <p>이 MVP는 다음을 포함해야 합니다:</p>
      
      <table>
        <tr>
          <th>기능</th>
          <th>우선순위</th>
          <th>설명</th>
        </tr>
        <tr>
          <td>사용자 계정</td>
          <td>높음</td>
          <td>회원가입, 로그인, 프로필 관리</td>
        </tr>
        <tr>
          <td>데이터 입력</td>
          <td>높음</td>
          <td>건강 지표 수동 입력 폼</td>
        </tr>
        <tr>
          <td>대시보드</td>
          <td>높음</td>
          <td>주요 건강 지표 시각화</td>
        </tr>
        <tr>
          <td>목표 설정</td>
          <td>중간</td>
          <td>건강 목표 설정 및 추적</td>
        </tr>
        <tr>
          <td>알림</td>
          <td>중간</td>
          <td>리마인더 및 목표 알림</td>
        </tr>
        <tr>
          <td>소셜 기능</td>
          <td>낮음</td>
          <td>기본적인 공유 기능</td>
        </tr>
      </table>
      
      <h2>기대 결과물</h2>
      <ul>
        <li>Android 및 iOS에서 실행 가능한 앱</li>
        <li>소스 코드 및 문서</li>
        <li>백엔드 API 연동 가이드</li>
        <li>기본적인 사용자 매뉴얼</li>
      </ul>
      
      <blockquote>
        <p>이 MVP는 추후 확장성을 고려하여 설계되어야 합니다. 초기 사용자 피드백을 바탕으로 추가 기능이 개발될 예정입니다.</p>
      </blockquote>
      
      <h2>일정</h2>
      <p>총 개발 기간은 8주를 예상하며, 2주 단위로 진행 상황을 검토할 예정입니다.</p>
      
      <p>관심 있으신 분은 포트폴리오와 함께 지원해주세요.</p>`,
      thumbnail_url: '/api/placeholder/400/320',
      tags: ['Flutter', 'React Native', '모바일앱', 'MVP', '헬스케어'],
    },
    '3': {
      title: '브랜드 아이덴티티 디자인 및 로고 개발',
      category: 'DESIGN',
      content: `<h1>브랜드 아이덴티티 디자인 프로젝트</h1>
      <p>신규 스타트업을 위한 현대적이고 미니멀한 브랜드 아이덴티티와 로고 디자인 프로젝트입니다.</p>
      
      <h2>브랜드 개요</h2>
      <p>우리 회사는 지속 가능한 패션 액세서리를 제작하는 친환경 스타트업입니다. 브랜드의 핵심 가치는 다음과 같습니다:</p>
      <ul>
        <li>지속 가능성 (Sustainability)</li>
        <li>현대적 미니멀리즘 (Modern Minimalism)</li>
        <li>윤리적 생산 (Ethical Production)</li>
        <li>품질 중심 (Quality Focus)</li>
      </ul>
      
      <h2>프로젝트 범위</h2>
      <p>이 프로젝트는 다음 요소를 포함합니다:</p>
      <ol>
        <li>로고 디자인 (메인 로고 및 서브 마크)</li>
        <li>컬러 팔레트 및 타이포그래피</li>
        <li>기본 브랜드 요소 및 디자인 가이드라인</li>
        <li>기본 응용 템플릿 (명함, 레터헤드, 소셜 미디어 프로필)</li>
      </ol>
      
      <h2>디자인 방향성</h2>
      <p>우리는 다음과 같은 디자인 스타일을 선호합니다:</p>
      <ul>
        <li>미니멀하고 세련된 디자인</li>
        <li>자연에서 영감을 얻은 요소들</li>
        <li>친환경적인 느낌을 주는 색상 (녹색, 베이지, 어스톤)</li>
        <li>깔끔한 타이포그래피</li>
        <li>지속 가능성을 상징하는 요소</li>
      </ul>
      
      <blockquote>
        <p>우리 브랜드는 '덜 쓰고 더 오래 사용하는' 철학을 시각적으로 표현하고자 합니다.</p>
      </blockquote>
      
      <h2>참고 사항</h2>
      <p>다음과 같은 브랜드의 디자인 스타일을 참고해주세요:</p>
      <ul>
        <li>Everlane (미니멀리즘)</li>
        <li>Patagonia (지속 가능성)</li>
        <li>Aesop (세련된 심플함)</li>
      </ul>
      
      <h2>산출물 및 형식</h2>
      <ul>
        <li>로고 디자인 (AI, EPS, PNG, JPG 형식)</li>
        <li>브랜드 스타일 가이드 (PDF)</li>
        <li>컬러 팔레트 (CMYK, RGB, HEX 값 포함)</li>
        <li>기본 응용 템플릿 (AI, PSD 파일)</li>
      </ul>
      
      <h2>프로젝트 일정</h2>
      <p>전체 프로젝트는 약 3주 동안 진행될 예정이며, 다음과 같은 단계로 나뉩니다:</p>
      <ol>
        <li>초기 컨셉 회의 및 요구사항 확인 (3일)</li>
        <li>로고 디자인 초안 개발 (1주)</li>
        <li>피드백 및 로고 수정 (3일)</li>
        <li>브랜드 가이드라인 및 응용품 개발 (1주)</li>
        <li>최종 검토 및 파일 전달 (3일)</li>
      </ol>
      
      <p>이 프로젝트에 관심이 있으신 디자이너는 포트폴리오와 함께 연락주세요. 특히 지속 가능한 브랜드나 미니멀 디자인 경험이 있는 분을 우대합니다.</p>`,
      thumbnail_url: '/api/placeholder/400/320',
      tags: ['브랜드 디자인', '로고', '아이덴티티', '미니멀', '친환경'],
    },
  };

  // 요청한 ID에 해당하는 데이터가 있으면 반환, 없으면 첫 번째 데이터 반환
  return mockData[id] || mockData['1'];
};

// 모든 목업 데이터의 ID 목록 반환
export const getAllProductIds = (): string[] => {
  return ['1', '2', '3'];
};
