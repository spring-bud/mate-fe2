import Link from "next/link";

export default function ContactChannelsPage() {
  // 악성 유저 목 데이터
  const maliciousUserReports = [
    {
      id: 1,
      nickname: "프로젝트 지연러",
      reportCount: 3,
      lastReportDate: "2024-03-15",
      reason: "지속적인 프로젝트 일정 미준수",
      status: "경고",
    },
    {
      id: 2,
      nickname: "페이먼트 회피꾼",
      reportCount: 2,
      lastReportDate: "2024-03-20",
      reason: "계약금 지불 거부 및 연락 두절",
      status: "주의",
    },
    {
      id: 3,
      nickname: "허위 포트폴리오 작성자",
      reportCount: 4,
      lastReportDate: "2024-03-25",
      reason: "제출한 포트폴리오 신뢰성 의심",
      status: "검토 중",
    },
  ];

  return (
    <div className="bg-bgDark text-textPrimary min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <header className="text-center mb-10">
          <h1 className="typo-head1 text-textLight mb-4">문의 채널</h1>
          <p className="typo-body2 text-textDim">
            MATE 서비스 관련 다양한 문의 방법을 안내드립니다.
          </p>
        </header>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            1. 이슈 제보
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="typo-head3 mb-2 text-textLight">노션 페이지</h3>
              <p className="typo-body2 text-textPrimary mb-2">
                서비스 개선을 위한 건의사항과 기능 제안을 환영합니다.
              </p>
              <Link
                href="https://www.notion.so/mate-dev"
                target="_blank"
                className="inline-block bg-active text-white px-4 py-2 rounded typo-button2 hover:bg-hover transition-colors"
              >
                노션 이슈 제보 바로가기
              </Link>
            </div>
            <div>
              <h3 className="typo-head3 mb-2 text-textLight">개발자 이메일</h3>
              <p className="typo-body2 text-textPrimary mb-2">
                기술적인 문제나 심층적인 피드백은 직접 이메일로 보내주세요.
              </p>
              <a
                href="mailto:dev@mate.dev"
                className="inline-block bg-info text-white px-4 py-2 rounded typo-button2 hover:bg-hover transition-colors"
              >
                dev@mate.dev 이메일 보내기
              </a>
            </div>
          </div>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            2. 광고 문의
          </h2>
          <div className="typo-body2 text-textPrimary">
            <p className="mb-4">
              MATE와 함께 성장할 파트너사를 모집합니다. 광고 및 제휴 문의는 아래
              채널로 연락 바랍니다.
            </p>
            <div className="space-y-2">
              <p>📧 이메일: partnership@mate.dev</p>
              <p>📞 전화: 02-123-4567 (평일 09:00 - 18:00)</p>
            </div>
          </div>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            3. 악성 유저 제보
          </h2>
          <div className="typo-body2 text-textPrimary">
            <p className="mb-4">
              MATE 플랫폼의 신뢰성 유지를 위해 악성 유저 제보를 받고 있습니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-bgDark">
                    <th className="border p-2 text-left">닉네임</th>
                    <th className="border p-2 text-left">제보 횟수</th>
                    <th className="border p-2 text-left">최근 제보일</th>
                    <th className="border p-2 text-left">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {maliciousUserReports.map((report) => (
                    <tr key={report.id} className="hover:bg-hover">
                      <td className="border p-2">{report.nickname}</td>
                      <td className="border p-2">{report.reportCount}회</td>
                      <td className="border p-2">{report.lastReportDate}</td>
                      <td className="border p-2">
                        <span
                          className={`
                          ${
                            report.status === "경고"
                              ? "text-error"
                              : report.status === "주의"
                              ? "text-warning"
                              : "text-info"
                          }
                        `}
                        >
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <a
                href="mailto:report@mate.dev"
                className="inline-block bg-error text-white px-4 py-2 rounded typo-button2 hover:bg-hover transition-colors"
              >
                악성 유저 제보하기
              </a>
            </div>
          </div>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            4. 일반 문의 사항
          </h2>
          <div className="typo-body2 text-textPrimary">
            <p className="mb-4">
              서비스 이용 중 궁금한 점이나 도움이 필요한 사항은 아래 채널로
              문의해 주세요.
            </p>
            <div className="space-y-2">
              <p>📧 고객 지원 이메일: support@mate.dev</p>
              <p>💬 카카오톡 고객센터: @MATE_support</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export const metadata = {
  title: "MATE - 문의 채널",
  description: "MATE 서비스 관련 다양한 문의 방법을 안내드립니다.",
};
