"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

// 카테고리 데이터
const categories = [
  {
    id: 1,
    name: "웹 개발",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
    count: 143,
  },
  {
    id: 2,
    name: "모바일 앱",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
    ),
    count: 85,
  },
  {
    id: 3,
    name: "UI/UX 디자인",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
    count: 112,
  },
  {
    id: 5,
    name: "백엔드 개발",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    count: 76,
  },
];

export default function ExploreSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-bgDark to-bgDarker"
    >
      <div className="max-w-6xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="typo-head2 mb-2 md:mb-4">
            원하는 분야를 탐색해보세요
          </h2>
        </motion.div>

        {/* 모바일 버전 (xs ~ sm) */}
        <div className="block sm:hidden">
          <div className="space-y-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="bg-bgLight p-4 rounded-lg border border-border hover:border-active transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-selection flex items-center justify-center text-textLight">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="typo-head4">{category.name}</h3>
                      <p className="typo-caption1 text-textDim">
                        {category.count}개의 프로젝트
                      </p>
                    </div>
                  </div>
                  <div className="text-active">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 태블릿 버전 (sm ~ lg) */}
        <div className="hidden sm:block lg:hidden">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="bg-bgLight p-5 rounded-lg border border-border hover:border-active transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-selection flex items-center justify-center text-textLight">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="typo-head4">{category.name}</h3>
                      <p className="typo-caption1 text-textDim">
                        {category.count}개의 프로젝트
                      </p>
                    </div>
                  </div>
                  <div className="text-active">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 데스크탑 버전 (lg 이상) */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-bgLight p-6 rounded-lg border border-border hover:border-active hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-selection flex items-center justify-center text-textLight">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="typo-head4">{category.name}</h3>
                      <p className="typo-caption1 text-textDim">
                        {category.count}개의 프로젝트
                      </p>
                    </div>
                  </div>
                  <div className="text-active">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA 섹션 - 모든 화면 크기에 대응 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-bgLight border border-border rounded-lg p-5 sm:p-6 md:p-8 mt-8 sm:mt-10 md:mt-12 text-center"
        >
          <h3 className="typo-head3 mb-3 sm:mb-4">
            지금 바로 MATE와 함께하세요
          </h3>

          {/* 모바일용 버튼 (수직 정렬) */}
          <div className="flex flex-col gap-3 sm:hidden">
            <button className="typo-button2 px-6 py-2.5 bg-active hover:bg-blue-600 transition-colors rounded-md">
              카카오 로그인
            </button>
          </div>

          {/* 태블릿 이상 버튼 (수평 정렬) */}
          <div className="hidden sm:flex sm:flex-row gap-4 justify-center">
            <button className="typo-button1 px-6 sm:px-8 py-3 bg-active hover:bg-blue-600 transition-colors rounded-md">
              카카오 로그인
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
