import React from "react";
import Link from "next/link";

export default function HelpMainPage() {
  const helpSections = [
    {
      title: "자주 묻는 질문",
      description: "서비스 이용과 관련된 주요 질문들을 확인하세요.",
      href: "/help/faq",
      icon: "❓",
    },
    {
      title: "문의 채널",
      description: "다양한 문의 방법과 연락처를 안내해드립니다.",
      href: "/help/contact",
      icon: "📞",
    },
    {
      title: "오픈소스",
      description: "MATE의 기술과 철학을 공유합니다.",
      href: "/help/opensource",
      icon: "🖥️",
    },
  ];

  return (
    <div className="bg-bgDark text-textPrimary min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="typo-head1 text-textLight mb-4">MATE 고객 지원</h1>
          <p className="typo-body2 text-textDim">
            여러분의 성공적인 프로젝트 진행을 위해 항상 함께 하겠습니다.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {helpSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="bg-bgLight rounded-lg p-6 shadow-md hover:bg-hover transition-colors group"
            >
              <div className="text-4xl mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                {section.icon}
              </div>
              <h2 className="typo-head2 text-textLight mb-3 group-hover:text-active transition-colors">
                {section.title}
              </h2>
              <p className="typo-body2 text-textPrimary">
                {section.description}
              </p>
              <div className="mt-4 flex items-center text-textDim group-hover:text-active">
                <span className="typo-button2">자세히 보기</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-12 bg-bgLight rounded-lg p-6 shadow-md">
          <h2 className="typo-head2 text-textLight mb-4">고객 지원 안내</h2>
          <p className="typo-body2 text-textPrimary mb-4">
            MATE 서비스를 이용하시면서 겪는 모든 어려움에 신속하고 정확하게
            대응하겠습니다.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="mailto:support@mate.dev"
              className="bg-active text-white px-4 py-2 rounded typo-button2 hover:bg-hover transition-colors"
            >
              이메일 문의
            </a>
            <a
              href="https://open.kakao.com/o/your-kakao-channel"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-success text-white px-4 py-2 rounded typo-button2 hover:bg-hover transition-colors"
            >
              카카오톡 채널
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export const metadata = {
  title: "MATE - 고객 지원",
  description:
    "MATE 서비스의 고객 지원 페이지입니다. 자주 묻는 질문, 문의 채널, 오픈소스 정보를 제공합니다.",
};
