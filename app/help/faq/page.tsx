// app/help/faq/page.tsx
import React from "react";

export default function FAQPage() {
  return (
    <div className="bg-bgDark text-textPrimary min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <header className="text-center mb-10">
          <h1 className="typo-head1 text-textLight mb-4">자주 묻는 질문</h1>
          <p className="typo-body2 text-textDim">
            MATE 서비스 이용에 대한 궁금증을 해결해드립니다.
          </p>
        </header>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            거래 진행 방식
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="typo-head3 mb-2 text-textLight">
                당사자들 간 협의
              </h3>
              <p className="typo-body2 text-textPrimary">
                MATE는 개발자와 디자이너를 연결해주는 중개 플랫폼으로, 실제
                프로젝트 진행 방식은 매칭된 당사자들 간의 합의에 따라
                결정됩니다.
              </p>
            </div>
            <div>
              <h3 className="typo-head3 mb-2 text-textLight">
                추천하는 거래 방식
              </h3>
              <ul className="typo-body2 text-textPrimary list-disc pl-5 space-y-2">
                <li>초기 미팅을 통해 프로젝트 범위, 기간, 예산 등 상세 협의</li>
                <li>
                  협의 후 계약금 체결
                  <ul className="list-[circle] pl-5 mt-2">
                    <li>프로젝트 초기 협의된 금액의 30-50% 선급금 지급</li>
                    <li>명확한 계약서 작성 권장</li>
                  </ul>
                </li>
                <li>중간 결과물 검토 및 피드백</li>
                <li>최종 결과물 수령 후 잔금 지급</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-6 border-b border-border pb-3">
            거래 시 주의사항
          </h2>
          <ul className="typo-body2 text-textPrimary list-disc pl-5 space-y-3">
            <li>
              <strong>사전 소통의 중요성</strong>
              <p className="mt-1">
                프로젝트 시작 전 상세한 요구사항과 기대치를 명확히 공유하세요.
              </p>
            </li>
            <li>
              <strong>단계별 검토</strong>
              <p className="mt-1">
                프로젝트 진행 중 중간 점검을 통해 방향성 조정이 필요합니다.
              </p>
            </li>
            <li>
              <strong>문서화</strong>
              <p className="mt-1">
                모든 합의 사항은 문서로 정리하고, 필요시 간단한 계약서를
                작성하세요.
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export const metadata = {
  title: "MATE - 자주 묻는 질문",
  description: "MATE 서비스 이용에 대한 자주 묻는 질문과 답변을 확인하세요.",
};
