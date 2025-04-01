export default function TermsOfServicePage() {
  return (
    <div className="bg-bgDark text-textPrimary min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <header className="text-center mb-10">
          <h1 className="typo-head1 text-textLight mb-4">서비스 이용약관</h1>
          <p className="typo-body2 text-textDim">
            최종 업데이트: 2024년 3월 31일
          </p>
        </header>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            1. 서비스 정의
          </h2>
          <p className="typo-body2 leading-relaxed">
            MATE는 개발자와 디자이너를 프로젝트와 연결해주는 중개 플랫폼입니다.
            실제 계약, 거래, 작업 진행은 당사자 간에 직접 이루어집니다.
          </p>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            2. 책임 제한
          </h2>
          <ul className="space-y-3 typo-body2">
            <li className="flex items-start">
              <span className="mr-2 text-error">•</span>
              플랫폼은 단순 중개 역할만 수행
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-error">•</span>
              거래, 작업물, 결제 관련 분쟁에 대한 책임 없음
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-error">•</span>
              당사자 간 발생하는 문제는 당사자들이 직접 해결해야 함
            </li>
          </ul>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            3. 금지된 행위
          </h2>
          <ul className="space-y-3 typo-body2">
            <li className="flex items-start">
              <span className="mr-2 text-warning">•</span>
              허위 정보 등록
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-warning">•</span>
              타인 사칭
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-warning">•</span>
              불법적인 프로젝트 게시
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-warning">•</span>
              플랫폼을 통한 스팸이나 사기 행위
            </li>
          </ul>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            4. 계정 관리
          </h2>
          <ul className="space-y-3 typo-body2">
            <li className="flex items-start">
              <span className="mr-2 text-info">•</span>
              사용자 정보의 정확성에 대한 책임
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-info">•</span>
              계정 보안에 대한 개인 책임
            </li>
          </ul>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            5. 서비스 변경 및 종료
          </h2>
          <p className="typo-body2 leading-relaxed">
            MATE는 사이드 프로젝트로서 사전 공지 후 서비스 변경 또는 종료할 수
            있습니다. 서비스 변경 시 사용자에게 적절한 시간을 두고 통보합니다.
          </p>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            6. 연락처
          </h2>
          <p className="typo-body2">
            이용약관과 관련하여 문의사항이 있으시면 다음 연락처로 문의해 주세요:
          </p>
          <div className="mt-4">
            <p className="typo-body1 text-textLight">
              이메일: support@mate.dev
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export const metadata = {
  title: "MATE - 서비스 이용약관",
  description: "MATE 서비스의 이용약관을 확인하세요.",
};
