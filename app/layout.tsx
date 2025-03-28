import type { Metadata } from "next";
import { Viewport } from "next";
import "./globals.css";
import Header from "@/components/common/header/Header";

export const metadata: Metadata = {
  title: "MATE | 개발자와 디자이너를 위한 프리랜서 허브",
  description:
    "MATE는 개발자와 디자이너를 프로젝트와 외주 기회에 연결해주는 전문 플랫폼입니다. 최고의 인재들과 함께 여러분의 비전을 실현하세요.",
  keywords: [
    "프리랜서",
    "개발자",
    "디자이너",
    "웹개발",
    "앱개발",
    "UI/UX",
    "외주",
    "프로젝트",
    "프리랜서 플랫폼",
  ],
  openGraph: {
    title: "MATE | 개발자와 디자이너를 위한 프리랜서 허브",
    description:
      "최고의 개발자와 디자이너를 만나 프로젝트를 성공적으로 완성하세요.",
    // url: 'https://mate-freelancer.com',
    siteName: "MATE",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MATE | 개발자와 디자이너를 위한 프리랜서 허브",
    description:
      "최고의 개발자와 디자이너를 만나 프로젝트를 성공적으로 완성하세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// viewport와 themeColor를 별도로 내보내기
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E1E1E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
