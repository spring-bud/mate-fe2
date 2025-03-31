"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 탭 메뉴 정의
  const tabs = [
    {
      name: "고객 지원",
      href: "/help",
      isActive: pathname === "/help",
    },
    {
      name: "FAQ",
      href: "/help/faq",
      isActive: pathname === "/help/faq",
    },
    {
      name: "문의 채널",
      href: "/help/contact",
      isActive: pathname === "/help/contact",
    },
    {
      name: "오픈소스",
      href: "/help/opensource",
      isActive: pathname === "/help/opensource",
    },
  ];

  return (
    <div className="bg-bgDark text-textPrimary min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 탭 네비게이션 */}
        <div className="mb-4 overflow-x-auto">
          <nav className="flex space-x-2 sm:space-x-4 py-4 justify-center">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`
                  typo-button2 
                  px-2 sm:px-4 
                  py-2 
                  rounded-lg 
                  transition-colors 
                  whitespace-nowrap
                  ${
                    tab.isActive
                      ? "bg-active text-white"
                      : "text-textDim hover:bg-hover hover:text-textPrimary"
                  }
                `}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* 페이지 콘텐츠 */}
        <main>{children}</main>
      </div>
    </div>
  );
}
