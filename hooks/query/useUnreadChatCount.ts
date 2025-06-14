'use client';

import { useEffect } from 'react';
import useChatRoomList from './useChatRoomList';
import { useAuthStore } from '@/store/authStore';
import { useMultiChatSocket } from '@/hooks/chat/useMultiChatSocket';
import { useUnreadStore } from '@/store/unreadStore';

// perRoom: { [roomToken]: { count, lastMessage, lastTime } }
const useUnreadChatCount = () => {
  const { data: roomList } = useChatRoomList();
  const { user } = useAuthStore();
  const setRoomUnread = useUnreadStore((s) => s.setRoomUnread);
  const setPerRoom = useUnreadStore((s) => s.setPerRoom);
  const perRoom = useUnreadStore((s) => s.perRoom);
  const totalUnread = useUnreadStore((s) => s.totalUnread);

  const roomTokens = roomList ? roomList.map((room) => room.room_token) : [];
  const userId = user?.user_id;

  useMultiChatSocket({
    userId: userId || 0,
    roomTokens,
    onMessage: (roomToken, msg) => {
      const count =
        msg.unreadCount ??
        msg.unread_count ??
        msg.count ??
        msg.unread ??
        msg.message_count ??
        undefined;
      const lastMessage = msg.message ?? '';
      const lastTime = msg.created_at ?? '';
      if (typeof count === 'number') {
        setRoomUnread(roomToken, { count, lastMessage, lastTime });
      }
    },
    enabled: !!userId && roomTokens.length > 0,
  });

  // 방 목록이 바뀌면 perRoom을 초기화(동기화)
  useEffect(() => {
    if (roomList) {
      const initial: Record<
        string,
        { count: number; lastMessage: string; lastTime: string }
      > = {};
      roomList.forEach((room) => {
        initial[room.room_token] = {
          count: room.message_count ?? 0,
          lastMessage: room.latest_message ?? '',
          lastTime: room.created_at ?? '',
        };
      });
      setPerRoom(initial);
    }
  }, [roomList, setPerRoom]);

  return { totalUnread, perRoom };
};

export default useUnreadChatCount;
