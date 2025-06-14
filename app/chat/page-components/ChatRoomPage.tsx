'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import { useRouter } from 'next/navigation';
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
  const { user } = useAuthStore();
  const myUserId = user?.user_id;

  // 채팅 내역 불러오기
  const { data } = useChatMessages(roomToken);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // 중복 메시지 방지용 id Set
  const messageIdSet = React.useRef<Set<string | number>>(new Set());

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
      // id Set 동기화
      messageIdSet.current = new Set(mapped.map((m) => m.id));
    }
  }, [data, myUserId]);

  // 1. 첫 진입 시 하단 스크롤
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, []);

  // 2. messages append(신규 메시지) 시, 하단에 가까우면 자동 하단 이동
  useLayoutEffect(() => {
    if (!isPrepending.current && chatListRef.current) {
      const container = chatListRef.current;
      const nearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        50;
      if (nearBottom) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages]);

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
        isPrepending.current = true;
        setMessages((prev) => [...toAdd, ...prev]);
        mapped.forEach((m) => messageIdSet.current.add(m.id));
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
    } finally {
      setLoadingMore(false);
    }
  };

  // prepend 후 스크롤 위치 보정
  useLayoutEffect(() => {
    if (isPrepending.current) {
      const container = chatListRef.current;
      if (container) {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop =
          newScrollHeight -
          (container.dataset.prevScrollHeight
            ? Number(container.dataset.prevScrollHeight)
            : 0) +
          (container.dataset.prevScrollTop
            ? Number(container.dataset.prevScrollTop)
            : 0);
        isPrepending.current = false;
      }
    }
  }, [messages]);

  // 새로운 메시지 도착/내가 보냄 → 항상 하단 스크롤
  useLayoutEffect(() => {
    if (!isPrepending.current && chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  // 웹소켓 메시지 수신 (중복 방지)
  const handleReceive = useCallback(
    (msg: any) => {
      // user 정보가 세팅되기 전이면 메시지 처리하지 않음
      if (!myUserId) return;
      if (msg.type === 'TALK') {
        // id 중복 체크
        const msgId =
          msg.id ||
          msg._id ||
          msg.localId ||
          msg.created_at ||
          `ws-${Date.now()}`;
        // 내 메시지이고, 같은 내용을 가진 optimistic 메시지가 있으면 교체(merge)
        if (myUserId && msg.sender_id === myUserId) {
          setMessages((prev) => {
            // optimistic 메시지 찾기 (isMine, message, 시간 근사치)
            const idx = prev.findIndex(
              (m) =>
                m.isMine &&
                m.message === msg.message &&
                // 1분 이내(60초) 시간차 허용
                Math.abs(
                  (new Date(m.time || 0).getTime() || 0) -
                    (new Date(msg.created_at).getTime() || 0)
                ) < 60000
            );
            if (idx !== -1) {
              // 기존 optimistic 메시지 교체(merge)
              const newArr = [...prev];
              newArr[idx] = {
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
              // idSet도 갱신
              messageIdSet.current.add(msgId);
              return newArr;
            }
            // 없으면 기존 방식대로 추가
            if (messageIdSet.current.has(msgId)) return prev;
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
          });
          return;
        }
        // 상대 메시지 처리(중복 방지)
        if (messageIdSet.current.has(msgId)) return;
        messageIdSet.current.add(msgId);
        setMessages((prev) => [
          ...prev,
          {
            id: msgId,
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
          },
        ]);
        // 필요시 서버 동기화
        // refetch(); // 주석 해제시 서버와 강제 동기화
      }
    },
    [myUserId]
  );

  // 웹소켓 연결
  const { sendMessage } = useChatSocket({
    roomToken,
    onMessage: handleReceive,
    onError: (err) => {
      if (window.location.pathname.startsWith('/chat')) {
        console.log(err);
        alert('채팅 서버와 연결이 끊어졌습니다.');
        router.push('/');
      }
    },
    enabled: !!myUserId && !!roomToken,
  });

  // 메시지 전송 (optimistic update)
  const handleSend = (msg: string) => {
    if (!msg.trim()) return;
    const now = new Date();
    const tempId = `local-${now.getTime()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        message: msg,
        isMine: true,
        time: now.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        senderProfileUrl: user?.user_url,
        senderName: user?.user_nickname,
      },
    ]);
    messageIdSet.current.add(tempId);
    sendMessage({
      message: msg,
      type: 'TALK',
      room_token: roomToken,
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleLeave = () => {
    alert('채팅방을 나가시겠습니까? (구현 필요)');
  };

  useLayoutEffect(() => {
    const container = chatListRef.current;
    if (!container) return;
    // 더 불러오기(위로 prepend) 아닐 때, messages append(길이 증가) 또는 최초 진입 시 무조건 하단 스크롤
    if (
      !isPrepending.current &&
      messages.length >= prevMessagesLength.current
    ) {
      container.scrollTop = container.scrollHeight;
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

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
