import { useEffect, useRef, useCallback, useState } from 'react';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { getAccessToken } from '@/utils/api/api';

interface UseChatSocketProps {
  roomToken: string;
  onMessage: (message: any) => void;
  onError?: (error: any) => void;
  onConnect?: () => void;
  enabled?: boolean;
}

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws/init';

// stomp.js 인스턴스 싱글턴 제거, useRef로 인스턴스별 관리
// let globalStompClient: Client | null = null;

export function useChatSocket({
  roomToken,
  onMessage,
  onError,
  onConnect,
  enabled = true,
}: UseChatSocketProps) {
  const [connected, setConnected] = useState(false);
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const stompClientRef = useRef<Client | null>(null);
  const reconnectAttempts = useRef(0);
  const MAX_RECONNECT = 3;

  // 메시지 전송 함수
  const sendMessage = useCallback((body: object) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: '/pub/chat',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // 기존 구독 해제
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }
    // 기존 stompClient 해제
    if (stompClientRef.current) {
      try {
        stompClientRef.current.deactivate();
      } catch (e) {
        console.log(e);
        // 무시
      }
      stompClientRef.current = null;
    }

    // 새로운 stompClient 생성
    const stompClient = new Client({
      brokerURL: WS_URL,
      connectHeaders: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      reconnectDelay: 0, // 직접 재연결 시도
      onConnect: () => {
        setConnected(true);
        reconnectAttempts.current = 0;

        // 채팅방 구독
        if (roomToken) {
          subscriptionRef.current = stompClient.subscribe(
            `/sub/chat-rooms/${roomToken}`,
            (message: IMessage) => {
              try {
                const data = JSON.parse(message.body);
                onMessage(data);
              } catch (e) {
                if (onError) onError(e);
              }
            }
          );
        }
        if (onConnect) onConnect();
      },
      onStompError: (frame) => {
        setConnected(false);
        handleReconnect(frame);
      },
      onWebSocketError: (event) => {
        setConnected(false);
        handleReconnect(event);
      },
    });
    stompClientRef.current = stompClient;
    stompClient.activate();

    // 해제 로직
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomToken, enabled]);

  // 재연결 로직
  function handleReconnect(error: any) {
    if (reconnectAttempts.current < MAX_RECONNECT) {
      reconnectAttempts.current += 1;
      setTimeout(() => {
        if (stompClientRef.current) stompClientRef.current.activate();
      }, 1000 * reconnectAttempts.current);
    } else {
      if (onError) onError(error);
    }
  }

  return { sendMessage, connected };
}
