'use client';

import React, { useState, useMemo, useEffect } from 'react';
import ChatList from './ChatList';
import useChatRoomList from '@/hooks/query/useChatRoomList';
import useUnreadChatCount from '@/hooks/query/useUnreadChatCount';
import { useRouter } from 'next/navigation';

const ChatListPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: roomList, refetch } = useChatRoomList();
  const { perRoom } = useUnreadChatCount();
  const router = useRouter();

  // API 응답을 ChatListItemData로 변환
  const items = useMemo(() => {
    if (!roomList) return [];
    return roomList.map((room) => {
      const per = perRoom[room.room_token];
      return {
        id: room.id,
        roomToken: room.room_token,
        profileUrl: room.other_user_profile_url,
        nickname: room.other_user_nick_name,
        productThumbnailUrl: room.product_thumbnail_url,
        productTitle: room.product_title,
        unreadCount: per?.count ?? room.message_count ?? 0,
        lastMessage: per?.lastMessage ?? room.latest_message ?? '',
        lastTime: per?.lastTime ?? room.created_at ?? '',
        createdAt: new Date(room.created_at).getTime(),
      };
    });
  }, [roomList, perRoom]);

  // 정렬: unreadCount > 0이 상단, 그 안에서는 createdAt(혹은 lastMessageTime) 내림차순
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
      if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
      // 최신순(내림차순)
      return b.createdAt - a.createdAt;
    });
  }, [items]);

  const handleItemClick = (id: number, roomToken: string) => {
    setSelectedId(id);
    router.push(`/chat/${roomToken}`);
  };

  // 포커스 복귀 시 강제 동기화
  useEffect(() => {
    const handleFocus = () => {
      refetch(); // 채팅방 리스트 강제 동기화
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetch]);

  return (
    <div className='min-h-screen bg-bgDark text-textPrimary flex flex-col'>
      {/* 상단 타이틀 */}
      <header className='sticky top-0 z-10 bg-bgDark border-b border-border px-4 py-3 flex items-center justify-center'>
        <h1 className='text-lg font-bold text-textLight'>채팅</h1>
      </header>
      {/* 채팅 리스트 */}
      <main className='flex-1 overflow-y-auto px-2 py-2 max-w-lg w-full mx-auto'>
        <ChatList
          items={sortedItems}
          selectedId={selectedId ?? undefined}
          onItemClick={handleItemClick}
        />
      </main>
    </div>
  );
};

export default ChatListPage;
