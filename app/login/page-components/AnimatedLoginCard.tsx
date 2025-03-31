"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/laptop-cat.png";

interface AnimatedLoginCardProps {
  authURL: string;
}

export default function AnimatedLoginCard({ authURL }: AnimatedLoginCardProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="bg-bgLight border border-border rounded-xl p-6 sm:p-8 shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 로고 및 헤더 */}
      <motion.div
        className="flex flex-col items-center mb-8"
        variants={itemVariants}
      >
        <Link href="/" className="flex items-center mb-4">
          <div className="relative w-12 h-12 mr-2">
            <Image alt="logo" src={Logo} width={80} height={80} />
          </div>
          <span className="typo-head2 text-textLight">MATE</span>
        </Link>
        <h1 className="typo-head3 text-center">함께할 프리랜서를 찾아보세요</h1>
      </motion.div>

      {/* 로그인 섹션 */}
      <motion.div variants={itemVariants} className="space-y-6">
        <Link
          href={authURL}
          className="flex items-center justify-center w-full bg-[#FEE500] hover:bg-[#F5DC00] transition-colors py-3 px-4 rounded-md"
        >
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M11 0C4.92444 0 0 3.90007 0 8.70907C0 11.8536 1.99444 14.6043 5.02 16.1703C4.80778 16.9182 4.22444 19.2572 4.11444 19.8178C3.97556 20.5213 4.40111 20.5187 4.69111 20.3271C4.91889 20.1731 7.6 18.3537 8.80889 17.5238C9.52444 17.6247 10.2578 17.6778 11 17.6778C17.0756 17.6778 22 13.7777 22 8.96873C22 4.15975 17.0756 0 11 0Z"
              fill="#111111"
            />
          </svg>
          <span className="typo-button1 text-black">카카오로 시작하기</span>
        </Link>
      </motion.div>
      <motion.div
        className="mt-8 pt-6 border-t border-border text-center"
        variants={itemVariants}
      >
        <p className="typo-caption1 text-textDim">
          로그인함으로써 MATE의{" "}
          <Link href="/policy/service" className="text-active hover:underline">
            이용약관
          </Link>
          과
          <Link href="/policy/privacy" className="text-active hover:underline">
            개인정보 처리방침
          </Link>
          에 동의합니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
