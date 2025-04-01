// components/user/UserPostsList.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export interface UserPost {
  id: number;
  title: string;
  thumbnail_url: string;
  created_at: string;
  category: string;
  view_count: number;
  like_count: number;
}

interface UserPostsListProps {
  posts: UserPost[];
}

const getCategoryLabel = (category: string): string => {
  switch (category) {
    case "DEVELOP":
      return "개발";
    case "DESIGN":
      return "디자인";
    default:
      return category;
  }
};

const UserPostsList: React.FC<UserPostsListProps> = ({ posts }) => {
  if (!posts.length) {
    return (
      <div className="bg-bgLight border border-border rounded-lg p-8 text-center">
        <p className="typo-body1 text-textDim">작성한 게시물이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-bgLight border border-border rounded-lg overflow-hidden">
      <div className="p-6 sm:p-8">
        <h2 className="typo-head3 text-textLight mb-6">작성한 게시물</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="group border border-border rounded-lg overflow-hidden hover:border-active transition-colors"
            >
              {/* 썸네일 이미지 */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={post.thumbnail_url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-bgDark bg-opacity-70 text-textLight typo-caption1 px-2 py-1 rounded">
                    {getCategoryLabel(post.category)}
                  </span>
                </div>
              </div>

              {/* 게시물 정보 */}
              <div className="p-4">
                <h3 className="typo-head4 text-textLight mb-2 line-clamp-2 group-hover:text-active transition-colors">
                  {post.title}
                </h3>

                <div className="flex items-center justify-between typo-caption1 text-textDim mt-2">
                  <span>
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>{post.view_count}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{post.like_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPostsList;
