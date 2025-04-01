// components/user/UserProfileTabs.tsx
"use client";

import React, { useState } from "react";
import UserDetailedIntro from "./UserDetailedIntro";
import UserPostsList from "./UserPostsList";
import UserReviewsList from "./UserReviewsList";
import { UserPost } from "./UserPostsList";
import { UserReview } from "./UserReviewsList";

interface UserProfileTabsProps {
  introContent: string;
  posts: UserPost[];
  reviews: UserReview[];
}

const UserProfileTabs: React.FC<UserProfileTabsProps> = ({
  introContent,
  posts,
  reviews,
}) => {
  const [activeTab, setActiveTab] = useState<"intro" | "posts" | "reviews">(
    "intro"
  );

  return (
    <div className="space-y-6">
      {/* 탭 메뉴 */}
      <div className="border-b border-border">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab("intro")}
            className={`py-3 px-1 typo-button2 border-b-2 ${
              activeTab === "intro"
                ? "border-active text-active"
                : "border-transparent text-textDim hover:text-textLight"
            }`}
          >
            상세 소개
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`py-3 px-1 typo-button2 border-b-2 ${
              activeTab === "posts"
                ? "border-active text-active"
                : "border-transparent text-textDim hover:text-textLight"
            }`}
          >
            게시물 {posts.length > 0 && `(${posts.length})`}
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-3 px-1 typo-button2 border-b-2 ${
              activeTab === "reviews"
                ? "border-active text-active"
                : "border-transparent text-textDim hover:text-textLight"
            }`}
          >
            리뷰 {reviews.length > 0 && `(${reviews.length})`}
          </button>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="mt-6">
        {activeTab === "intro" && <UserDetailedIntro content={introContent} />}
        {activeTab === "posts" && <UserPostsList posts={posts} />}
        {activeTab === "reviews" && <UserReviewsList reviews={reviews} />}
      </div>
    </div>
  );
};

export default UserProfileTabs;
