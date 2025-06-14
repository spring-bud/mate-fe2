'use client';

import React from 'react';
import ChatRoomPage from '@/app/chat/page-components/ChatRoomPage';
import { useParams } from 'next/navigation';
import useChatRoomList from '@/hooks/query/useChatRoomList';

export default function ChatRoomDetailPage() {
  const params = useParams();
  const roomToken = params?.roomId as string;
  const { data: roomList } = useChatRoomList();
  const room = roomList?.find((r) => r.room_token === roomToken);
  const headerInfo = room
    ? {
        profileUrl: room.other_user_profile_url,
        nickname: room.other_user_nick_name,
        productTitle: room.product_title,
      }
    : { profileUrl: '', nickname: '', productTitle: '' };
  return <ChatRoomPage roomToken={roomToken} headerInfo={headerInfo} />;
}
