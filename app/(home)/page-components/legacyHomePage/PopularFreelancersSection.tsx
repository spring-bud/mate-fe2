"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import MobileFreelancerCard from "./MobileFreelancerCard";
import Image from "next/image";

// 샘플 인기 프리랜서 데이터
const popularFreelancers = [
  {
    id: 1,
    name: "김민준",
    role: "프론트엔드 개발자",
    skills: ["React", "TypeScript", "Next.js"],
    rating: 4.9,
    completedProjects: 28,
    image: "/api/placeholder/80/80",
    desc: "5년차 프론트엔드 개발자입니다. 사용자 경험을 중시하는 인터랙티브한 웹 애플리케이션 개발을 전문으로 합니다.",
  },
  {
    id: 2,
    name: "이서연",
    role: "UI/UX 디자이너",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    rating: 4.8,
    completedProjects: 35,
    image: "/api/placeholder/80/80",
    desc: "사용자 중심 디자인 원칙에 따라 직관적이고 아름다운 인터페이스를 디자인합니다. 최신 디자인 트렌드를 항상 연구합니다.",
  },
];

export default function PopularFreelancersSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-bgDark"
    >
      <div className="max-w-6xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="typo-head2 mb-2 md:mb-4">인기 프리랜서</h2>
          <p className="typo-body1 max-w-2xl mx-auto text-textDim sm:px-4">
            MATE에서 높은 평가를 받고 있는 탁월한 프리랜서들을 만나보세요.
          </p>
        </motion.div>

        {/* 모바일 버전 (xs ~ sm) */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-2 gap-3">
            {popularFreelancers.map((freelancer, index) => (
              <MobileFreelancerCard
                key={freelancer.id}
                freelancer={freelancer}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* 태블릿 및 데스크탑 버전 (sm 이상) */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {popularFreelancers.map((freelancer, index) => (
              <motion.div
                key={freelancer.id}
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                className="bg-bgLight p-5 sm:p-6 rounded-lg border border-border hover:border-active hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={freelancer.image}
                    width={80}
                    height={80}
                    alt={freelancer.name}
                    className="w-14 sm:w-16 h-14 sm:h-16 rounded-full object-cover border-2 border-selection"
                  />
                  <div className="flex-1">
                    <h3 className="typo-head4 text-textLight">
                      {freelancer.name}
                    </h3>
                    <p className="typo-caption1 text-active">
                      {freelancer.role}
                    </p>

                    <div className="flex items-center mt-2 flex-wrap">
                      <div className="flex items-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-warning"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span className="typo-caption1 ml-1">
                          {freelancer.rating}
                        </span>
                      </div>
                      <span className="mx-2 text-border">•</span>
                      <span className="typo-caption1 text-textDim">
                        {freelancer.completedProjects}개 프로젝트 완료
                      </span>
                    </div>
                  </div>
                </div>

                <p className="typo-body2 my-4 text-textDim line-clamp-3">
                  {freelancer.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="typo-caption2 px-2 py-1 bg-bgDark rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="typo-button2 w-full px-4 py-2 border border-active text-active rounded-md hover:bg-active hover:text-textLight transition-colors">
                  프로필 보기
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10 md:mt-12"
        >
          <button className="typo-button2 px-6 py-2.5 sm:typo-button1 sm:px-8 sm:py-3 border border-border hover:bg-hover transition-colors rounded-md">
            모든 프리랜서 보기
          </button>
        </motion.div>
      </div>
    </section>
  );
}
