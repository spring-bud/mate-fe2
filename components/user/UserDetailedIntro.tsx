// components/user/UserDetailedIntro.tsx
"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

interface UserDetailedIntroProps {
  content: string;
}

const UserDetailedIntro: React.FC<UserDetailedIntroProps> = ({ content }) => {
  // 읽기 전용 모드로 Tiptap 에디터 인스턴스 생성
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
      Link.configure({
        openOnClick: true,
      }),
      Underline,
    ],
    content,
    editable: false, // 읽기 전용 모드
  });

  // 에디터가 준비되지 않은 경우 로딩 표시
  if (!editor) {
    return (
      <div className="bg-bgLight border border-border rounded-lg p-6 sm:p-8">
        <div className="animate-pulse">
          <div className="h-4 bg-bgDark rounded w-1/4 mb-4"></div>
          <div className="h-3 bg-bgDark rounded w-full mb-2"></div>
          <div className="h-3 bg-bgDark rounded w-full mb-2"></div>
          <div className="h-3 bg-bgDark rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgLight border border-border rounded-lg overflow-hidden">
      <div className="p-6 sm:p-8">
        <h2 className="typo-head3 text-textLight mb-4">상세 소개</h2>

        <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default UserDetailedIntro;
