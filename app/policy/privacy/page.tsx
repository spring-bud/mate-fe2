export default function PrivacyPolicyPage() {
  return (
    <div className="bg-bgDark text-textPrimary min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <header className="text-center mb-10">
          <h1 className="typo-head1 text-textLight mb-4">개인정보 처리방침</h1>
          <p className="typo-body2 text-textDim">
            최종 업데이트: 2024년 3월 31일
          </p>
        </header>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            1. 수집하는 개인정보
          </h2>
          <ul className="space-y-3 typo-body2">
            <li className="flex items-start">
              <span className="mr-2 text-info">•</span>
              카카오 계정을 통해 제공받는 정보: 이메일, 닉네임, 프로필 이미지
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-info">•</span>
              자동 수집 정보: 접속 기록, IP 주소, 서비스 이용 기록
            </li>
          </ul>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            2. 정보 수집 및 이용 목적
          </h2>
          <ul className="space-y-3 typo-body2">
            <li className="flex items-start">
              <span className="mr-2 text-success">•</span>
              서비스 이용자 식별 및 계정 관리
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-success">•</span>
              개발자/디자이너와 프로젝트 매칭
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-success">•</span>
              서비스 개선 및 통계 분석
            </li>
          </ul>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            3. 개인정보 보호 방법
          </h2>
          <ul className="space-y-3 typo-body2">
            <li className="flex items-start">
              <span className="mr-2 text-warning">•</span>
              SSL 암호화 통신 사용
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-warning">•</span>
              사용자 데이터 암호화 저장
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-warning">•</span>
              제한된 접근 권한 관리
            </li>
          </ul>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            4. 개인정보 보유 및 파기
          </h2>
          <p className="typo-body2 mb-4">
            MATE는 사용자의 개인정보 보호를 최우선으로 고려합니다.
          </p>
          <ul className="space-y-3 typo-body2">
            <li className="flex items-start">
              <span className="mr-2 text-error">•</span>
              회원 탈퇴 시 개인정보 즉시 파기
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-error">•</span>
              법적 보존 의무가 있는 정보는 관련 법령에 따라 보관
            </li>
          </ul>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            5. 연락처
          </h2>
          <p className="typo-body2">
            개인정보 관련 문의사항이 있으시면 다음 연락처로 문의해 주세요:
          </p>
          <div className="mt-4">
            <p className="typo-body1 text-textLight">
              이메일: privacy@mate.dev
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export const metadata = {
  title: "MATE - 개인정보 처리방침",
  description: "MATE 서비스의 개인정보 처리방침을 확인하세요.",
};
