// app/login/page.tsx
import Link from "next/link";
import { authURL } from "@/service/endpoints/endpoints";
import AnimatedLoginCard from "./page-components/AnimatedLoginCard";
import FloatingElements from "./page-components/FloatingElements";

export const metadata = {
  title: "로그인 - MATE",
  description: "MATE에 로그인하고 함께할 프리랜서를 찾아보세요",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 bg-gradient-to-b from-bgDarker to-bgDark relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <FloatingElements />
      </div>

      <div className="max-w-md w-full relative z-10">
        <AnimatedLoginCard authURL={authURL.login} />

        {/* 도움말 링크 */}
        <div className="mt-6 text-center">
          <Link
            href="/help"
            className="typo-caption1 text-textDim hover:text-textLight transition-colors"
          >
            도움이 필요하신가요?
          </Link>
        </div>
      </div>
    </div>
  );
}
