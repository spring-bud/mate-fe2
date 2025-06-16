'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import ChatRoomHeader from './ChatRoomHeader';
import ChatMessages, { ChatMessageData } from './ChatMessages';
import ChatInput from './ChatInput';
import useChatMessages from '@/hooks/query/useChatMessages';
import { useChatSocket } from '@/hooks/chat/useChatSocket';
import { apiClient } from '@/utils/api/api';
import { chatMessagesResponseSchema } from '@/schemas/api/chat.schema';
import { chatURL } from '@/service/endpoints/endpoints';

interface ChatRoomPageProps {
  roomToken: string;
  headerInfo: {
    profileUrl: string;
    nickname: string;
    productTitle: string;
  };
}

const ChatRoomPage: React.FC<ChatRoomPageProps> = ({
  roomToken,
  headerInfo,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const myUserId = user?.user_id;

  // 채팅 내역 불러오기 - refetch 함수도 가져오기
  const { data, refetch } = useChatMessages(roomToken);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // 중복 메시지 방지용 id Set
  const messageIdSet = useRef<Set<string | number>>(new Set());
  const optimisticMessages = useRef<Set<string | number>>(new Set());

  const chatListRef = useRef<HTMLDivElement>(null);
  const isPrepending = useRef(false);
  const prevMessagesLength = useRef(0);

  // 초기 메시지 세팅
  useEffect(() => {
    if (data?.messages) {
      const sorted = [...data.messages].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      const mapped = sorted.map((msg) => ({
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

      setMessages(mapped);
      setHasNext(!!data.has_next);

      // id Set 초기화
      messageIdSet.current.clear();
      optimisticMessages.current.clear();
      mapped.forEach((m) => messageIdSet.current.add(m.id));
    }
  }, [data, myUserId]);

  // 🔥 페이지 진입/복귀 시 강제 동기화
  useEffect(() => {
    const handleFocus = () => {
      // 포커스 복귀 시 메시지 다시 불러오기
      refetch();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // 페이지가 다시 보일 때 동기화
        refetch();
      }
    };

    // 🔥 페이지 진입 시 즉시 동기화
    refetch();

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refetch, roomToken]);

  // 첫 진입 시 하단 스크롤
  useEffect(() => {
    if (chatListRef.current && messages.length > 0) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages.length > 0]);

  // 더 불러오기 핸들러
  const handleLoadMore = async () => {
    if (loadingMore || messages.length === 0) return;
    const container = chatListRef.current;
    const prevScrollHeight = container?.scrollHeight || 0;
    const prevScrollTop = container?.scrollTop || 0;

    try {
      setLoadingMore(true);
      const oldestId = messages[0].id;
      const url =
        chatURL.getMessages.replace('roomToken', roomToken) +
        `?cursorId=${oldestId}`;
      const res = await apiClient.get(url, {
        schema: chatMessagesResponseSchema,
      });

      if (res?.messages) {
        const sorted = [...res.messages].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        const mapped = sorted.map((msg) => ({
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

        const toAdd = mapped.filter((m) => !messageIdSet.current.has(m.id));

        if (toAdd.length > 0) {
          isPrepending.current = true;
          setMessages((prev) => [...toAdd, ...prev]);
          toAdd.forEach((m) => messageIdSet.current.add(m.id));
          setHasNext(!!res.has_next);

          // prepend 후 스크롤 위치 보정
          setTimeout(() => {
            if (container) {
              const newScrollHeight = container.scrollHeight;
              container.scrollTop =
                newScrollHeight - prevScrollHeight + prevScrollTop;
            }
            isPrepending.current = false;
          }, 20);
        }
      }
    } finally {
      setLoadingMore(false);
    }
  };

  // 웹소켓 메시지 수신
  const handleReceive = useCallback(
    (msg: any) => {
      if (!myUserId || msg.type !== 'TALK') return;

      const msgId = msg.id || `ws-${Date.now()}-${Math.random()}`;

      // 이미 처리된 메시지인지 확인
      if (messageIdSet.current.has(msgId)) {
        return;
      }

      // 내가 보낸 메시지인 경우 - 옵티미스틱 메시지와 병합
      if (msg.sender_id === myUserId) {
        setMessages((prev) => {
          const optimisticIndex = prev.findIndex(
            (m) =>
              optimisticMessages.current.has(m.id) &&
              m.message === msg.message &&
              m.isMine
          );

          if (optimisticIndex !== -1) {
            // 옵티미스틱 메시지를 실제 메시지로 교체
            const newMessages = [...prev];
            const oldId = newMessages[optimisticIndex].id;

            newMessages[optimisticIndex] = {
              id: msgId,
              message: msg.message,
              isMine: true,
              time: msg.created_at
                ? new Date(msg.created_at).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : undefined,
              senderProfileUrl: msg.sender_profile_url,
              senderName: msg.sender_name,
            };

            // ID 관리 업데이트
            optimisticMessages.current.delete(oldId);
            messageIdSet.current.delete(oldId);
            messageIdSet.current.add(msgId);

            return newMessages;
          }

          // 옵티미스틱 메시지가 없으면 새로 추가
          if (!messageIdSet.current.has(msgId)) {
            messageIdSet.current.add(msgId);
            return [
              ...prev,
              {
                id: msgId,
                message: msg.message,
                isMine: true,
                time: msg.created_at
                  ? new Date(msg.created_at).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : undefined,
                senderProfileUrl: msg.sender_profile_url,
                senderName: msg.sender_name,
              },
            ];
          }

          return prev;
        });
      } else {
        // 상대방이 보낸 메시지
        messageIdSet.current.add(msgId);
        setMessages((prev) => [
          ...prev,
          {
            id: msgId,
            message: msg.message,
            isMine: false,
            time: msg.created_at
              ? new Date(msg.created_at).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : undefined,
            senderProfileUrl: msg.sender_profile_url,
            senderName: msg.sender_name,
          },
        ]);

        // 🔥 상대방 메시지 받으면 채팅방 리스트도 업데이트
        queryClient.invalidateQueries({ queryKey: ['chat', 'roomList'] });
      }
    },
    [myUserId, queryClient]
  );

  // 웹소켓 연결
  const { sendMessage } = useChatSocket({
    roomToken,
    onMessage: handleReceive,
    onError: (err) => {
      if (window.location.pathname.startsWith('/chat')) {
        console.error('WebSocket error:', err);
        alert('채팅 서버와 연결이 끊어졌습니다.');
        router.push('/');
      }
    },
    enabled: !!myUserId && !!roomToken,
  });

  // 메시지 전송
  const handleSend = useCallback(
    (msg: string) => {
      if (!msg.trim() || !myUserId) return;

      const now = new Date();
      const tempId = `optimistic-${Date.now()}-${Math.random()}`;

      // 옵티미스틱 메시지 추가
      const optimisticMessage: ChatMessageData = {
        id: tempId,
        message: msg,
        isMine: true,
        time: now.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        senderProfileUrl: user?.user_url,
        senderName: user?.user_nickname,
      };

      setMessages((prev) => [...prev, optimisticMessage]);
      messageIdSet.current.add(tempId);
      optimisticMessages.current.add(tempId);

      // 웹소켓으로 메시지 전송
      sendMessage({
        message: msg,
        type: 'TALK',
        room_token: roomToken,
      });

      // 🔥 메시지 전송 후 채팅방 리스트도 업데이트
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['chat', 'roomList'] });
      }, 100);
    },
    [myUserId, user, sendMessage, roomToken, queryClient]
  );

  // 스크롤 관리
  useLayoutEffect(() => {
    if (!isPrepending.current && chatListRef.current) {
      const container = chatListRef.current;
      const nearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        100;

      if (nearBottom || messages.length > prevMessagesLength.current) {
        container.scrollTop = container.scrollHeight;
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  // 🔥 뒤로가기 시 채팅방 리스트 강제 업데이트
  const handleBack = useCallback(() => {
    // 채팅방 리스트 캐시 무효화
    queryClient.invalidateQueries({ queryKey: ['chat', 'roomList'] });

    // 읽지 않은 메시지 수 초기화 (선택사항)
    // queryClient.invalidateQueries({ queryKey: ['unread'] });

    router.back();
  }, [router, queryClient]);

  const handleLeave = () => {
    alert('채팅방을 나가시겠습니까? (구현 필요)');
  };

  // 🔥 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      // 컴포넌트 떠날 때 채팅방 리스트 업데이트
      queryClient.invalidateQueries({ queryKey: ['chat', 'roomList'] });
    };
  }, [queryClient]);

  return (
    <div className='fixed left-0 right-0 bottom-0 top-[65px] flex flex-col max-w-lg w-full mx-auto bg-bgDark text-textPrimary z-50'>
      <div className='sticky top-0 z-20 bg-bgDark flex-shrink-0'>
        <ChatRoomHeader
          profileUrl={headerInfo.profileUrl}
          nickname={headerInfo.nickname}
          productTitle={headerInfo.productTitle}
          onBack={handleBack}
          onLeave={handleLeave}
        />
      </div>
      <div className='flex-1 min-h-0 flex flex-col'>
        <ChatMessages
          ref={chatListRef}
          messages={messages}
          hasNext={hasNext}
          onLoadMore={handleLoadMore}
        />
      </div>
      <div className='sticky bottom-0 z-20 bg-bgLight flex-shrink-0'>
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatRoomPage;
