// components/user/UserProfileCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface UserStack {
  stack_id: number;
  name: string;
}

export interface UserProfileDatass {
  user_id: number;
  user_status: string;
  nickname: string;
  profile_url: string;
  job_type: string;
  job_year: number;
  intro: string;
  email: string;
  contact: string;
  github_url: string;
  blog_url: string;
  user_stacks: UserStack[];
}

interface UserProfileCardProps {
  userData: UserProfileDatass;
}

const JobTypeBadge = ({ jobType }: { jobType: string }) => {
  const getJobTypeInfo = (type: string): { label: string; bgColor: string } => {
    switch (type) {
      case "DEVELOPER":
        return { label: "개발자", bgColor: "bg-blue-600" };
      case "DESIGNER":
        return { label: "디자이너", bgColor: "bg-purple-600" };
      default:
        return { label: "프리랜서", bgColor: "bg-gray-600" };
    }
  };

  const { label, bgColor } = getJobTypeInfo(jobType);

  return (
    <span className={`${bgColor} text-white text-xs px-2 py-1 rounded-full`}>
      {label}
    </span>
  );
};

const UserProfileCardsss: React.FC<UserProfileCardProps> = ({ userData }) => {
  const {
    nickname,
    profile_url,
    job_type,
    job_year,
    intro,
    email,
    contact,
    github_url,
    blog_url,
    user_stacks,
  } = userData;

  return (
    <div className="bg-bgLight border border-border rounded-lg overflow-hidden">
      {/* 헤더 섹션 */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* 프로필 이미지 */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-full border-4 border-selection">
            <Image
              src={profile_url}
              alt={nickname}
              fill
              className="object-cover"
            />
          </div>

          {/* 기본 정보 */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="typo-head2 text-textLight">{nickname}</h1>
              <JobTypeBadge jobType={job_type} />
            </div>

            <p className="typo-body1 text-active mb-2">
              {job_year}년차{" "}
              {job_type === "DEVELOPER"
                ? "개발자"
                : job_type === "DESIGNER"
                ? "디자이너"
                : "프리랜서"}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {user_stacks.map((stack) => (
                <span
                  key={stack.stack_id}
                  className="bg-bgDark text-textLight typo-caption1 px-2 py-1 rounded"
                >
                  {stack.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 자기소개 */}
        <div className="mt-6">
          <h2 className="typo-head4 text-textLight mb-2">소개</h2>
          <p className="typo-body1 text-textDim">{intro}</p>
        </div>
      </div>

      {/* 연락처 섹션 */}
      <div className="bg-bgDark p-6 sm:p-8 border-t border-border">
        <h2 className="typo-head4 text-textLight mb-4">연락처</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-textDim"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="typo-body1 text-textLight">{email}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-textDim"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="typo-body1 text-textLight">{contact}</span>
          </div>

          {github_url && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-textDim"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <Link
                href={github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="typo-body1 text-active hover:underline"
              >
                GitHub
              </Link>
            </div>
          )}

          {blog_url && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-textDim"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <Link
                href={blog_url}
                target="_blank"
                rel="noopener noreferrer"
                className="typo-body1 text-active hover:underline"
              >
                블로그
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCardsss;
