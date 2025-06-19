'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import useChatRoomList from '@/hooks/query/useChatRoomList';
import useUnreadChatCount from '@/hooks/query/useUnreadChatCount';
import ChatListItem from './ChatListItem';

const ChatListPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const queryClient = useQueryClient();
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

  // 정렬: unreadCount > 0이 상단, 그 안에서는 createdAt 내림차순
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
      if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
      return b.createdAt - a.createdAt;
    });
  }, [items]);

  const handleItemClick = (id: number, roomToken: string) => {
    setSelectedId(id);
    router.push(`/chat/${roomToken}`);
  };

  // 🔥 페이지 포커스/방문 시 강제 동기화
  useEffect(() => {
    const handleFocus = () => {
      refetch(); // 채팅방 리스트 강제 동기화
      queryClient.invalidateQueries({ queryKey: ['chat', 'roomList'] });
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refetch();
        queryClient.invalidateQueries({ queryKey: ['chat', 'roomList'] });
      }
    };

    // 🔥 페이지 로드 시 즉시 동기화
    refetch();

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refetch, queryClient]);

  // 🔥 페이지 진입 시마다 동기화 (Next.js 라우팅 대응)
  useEffect(() => {
    // 컴포넌트 마운트 시 항상 최신 데이터 가져오기
    refetch();
    queryClient.invalidateQueries({ queryKey: ['chat'] });
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시에만 실행

  // 🔥 정기적 동기화 (선택사항 - 30초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      // 페이지가 보이는 상태일 때만 자동 동기화
      if (!document.hidden) {
        refetch();
      }
    }, 30000); // 30초마다

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className='min-h-screen bg-bgDark text-textPrimary flex flex-col'>
      {/* 상단 타이틀 */}
      <header className='sticky top-0 z-10 bg-bgDark border-b border-border px-4 py-3 flex items-center justify-center'>
        <div className='max-w-lg w-full mx-auto flex items-center justify-between relative'>
          <h1 className='text-lg font-bold text-textLight'>채팅</h1>
          {/* 🔥 수동 새로고침 버튼 추가 (선택사항) */}
          <button
            onClick={() => {
              refetch();
              queryClient.invalidateQueries({ queryKey: ['chat'] });
            }}
            className='absolute right-0 p-2 text-textDim hover:text-textLight transition-colors'
            aria-label='새로고침'
          >
            <svg width='20' height='20' fill='none' viewBox='0 0 20 20'>
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              />
            </svg>
          </button>
        </div>
      </header>

      {/* 채팅 리스트 */}
      <main className='flex-1 overflow-y-auto px-2 py-2 max-w-lg w-full mx-auto'>
        <div className='w-full flex flex-col gap-1'>
          {sortedItems.map((item) => (
            <ChatListItem
              key={item.id}
              profileUrl={item.profileUrl}
              nickname={item.nickname}
              productThumbnailUrl={item.productThumbnailUrl}
              productTitle={item.productTitle}
              unreadCount={item.unreadCount}
              lastMessage={item.lastMessage}
              lastTime={item.lastTime}
              selected={item.id === selectedId}
              onClick={() => handleItemClick(item.id, item.roomToken)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ChatListPage;
