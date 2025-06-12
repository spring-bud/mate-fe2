'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import ChatRoomHeader from './ChatRoomHeader';
import ChatMessages, { ChatMessageData } from './ChatMessages';
import ChatInput from './ChatInput';

const dummyApiResponse = {
  data: {
    messages: [
      {
        id: '6810d2349564d24fd074ec74',
        type: 'TALK',
        message: '채팅10',
        room_token: '204591ff-7783-4974-a07d-3a53812ec500',
        sender_id: 1,
        sender_name: 'MATE48f658ee',
        sender_profile_url:
          'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
        created_at: '2025-04-29T22:20:52.933',
      },
      // ... (생략, 실제 메시지 배열)
    ],
    has_next: true,
  },
};

// 테스트용 메시지 여러개 추가
for (let i = 9; i >= 1; i--) {
  dummyApiResponse.data.messages.push({
    id: `id${i}`,
    type: 'TALK',
    message: `채팅${i}`,
    room_token: '204591ff-7783-4974-a07d-3a53812ec500',
    sender_id: 1,
    sender_name: 'MATE48f658ee',
    sender_profile_url:
      'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    created_at: `2025-04-29T22:20:${10 + i}.000`,
  });
}

const dummyHeader = {
  profileUrl: '/laptop-cat.png',
  nickname: 'MATE76bfea1a',
  productTitle: 'Spring Boot Tutorial123',
};

const HEADER_HEIGHT = 68; // px, 실제 헤더 높이와 맞춰 조정
const INPUT_HEIGHT = 60; // px, 실제 입력창 높이와 맞춰 조정

const ChatRoomPage: React.FC = () => {
  const [messages, setMessages] = useState(
    () => dummyApiResponse.data.messages
  );
  const router = useRouter();
  const { user } = useAuthStore();
  const myUserId = user?.user_id;

  // 메시지 변환: API 메시지 → ChatMessageData
  const chatMessages: ChatMessageData[] = messages.map((msg) => ({
    id: msg.id,
    message: msg.message,
    isMine: myUserId ? msg.sender_id === myUserId : false,
    time: msg.created_at
      ? new Date(msg.created_at).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      : undefined,
    senderProfileUrl: msg.sender_profile_url,
    senderName: msg.sender_name,
  }));

  const handleSend = (msg: string) => {
    const now = new Date();
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${now.getTime()}`,
        type: 'TALK',
        message: msg,
        room_token: '204591ff-7783-4974-a07d-3a53812ec500',
        sender_id: myUserId ?? 9999,
        sender_name: user?.user_nickname ?? '나',
        sender_profile_url: user?.user_url ?? '/laptop-cat.png',
        created_at: now.toISOString(),
      },
    ]);
  };

  const handleBack = () => {
    router.back();
  };

  const handleLeave = () => {
    alert('채팅방을 나가시겠습니까? (구현 필요)');
  };

  return (
    <div className='min-h-screen h-screen bg-bgDark text-textPrimary flex flex-col max-w-lg w-full mx-auto'>
      <div className='sticky top-0 z-20 bg-bgDark flex-shrink-0'>
        <ChatRoomHeader
          profileUrl={dummyHeader.profileUrl}
          nickname={dummyHeader.nickname}
          productTitle={dummyHeader.productTitle}
          onBack={handleBack}
          onLeave={handleLeave}
        />
      </div>
      <div className='flex-1 min-h-0 overflow-y-auto'>
        <ChatMessages messages={chatMessages} />
      </div>
      <div className='sticky bottom-0 z-20 bg-bgLight flex-shrink-0'>
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatRoomPage;
