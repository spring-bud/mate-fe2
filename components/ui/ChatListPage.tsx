'use client';

import React, { useState } from 'react';
import ChatList, { ChatListItemData } from './ChatList';

// 더미 데이터 예시 (public 폴더 이미지 사용)
const dummyChatList: ChatListItemData[] = [
  {
    id: 12,
    profileUrl: '/laptop-cat.png',
    nickname: 'MATE76bfea1a',
    productThumbnailUrl: '/laptop-cat.png',
    productTitle: 'Spring Boot Tutorial123',
    unreadCount: 3,
  },
  {
    id: 13,
    profileUrl: '/laptop-cat.png',
    nickname: 'UserB',
    productThumbnailUrl: '/laptop-cat.png',
    productTitle: 'Next.js Guide',
    unreadCount: 0,
  },
  {
    id: 14,
    profileUrl: '/laptop-cat.png',
    nickname: 'UserC',
    productThumbnailUrl: '/laptop-cat.png',
    productTitle: 'React Handbook',
    unreadCount: 1,
  },
];

const ChatListPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className='min-h-screen bg-bgDark text-textPrimary flex flex-col'>
      {/* 상단 타이틀 */}
      <header className='sticky top-0 z-10 bg-bgDark border-b border-border px-4 py-3 flex items-center'>
        <h1 className='text-lg font-bold text-textLight'>채팅</h1>
      </header>
      {/* 채팅 리스트 */}
      <main className='flex-1 overflow-y-auto px-2 py-2 max-w-lg w-full mx-auto'>
        <ChatList
          items={dummyChatList}
          selectedId={selectedId ?? undefined}
          onItemClick={setSelectedId}
        />
      </main>
    </div>
  );
};

export default ChatListPage;
