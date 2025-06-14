import { useEffect, useRef } from 'react';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws/init';
let globalStompClient: Client | null = null;

interface UseMultiChatSocketProps {
  userId: number;
  roomTokens: string[];
  onMessage: (roomToken: string, msg: any) => void;
  enabled?: boolean;
}

export function useMultiChatSocket({
  userId,
  roomTokens,
  onMessage,
  enabled = true,
}: UseMultiChatSocketProps) {
  const subscriptionsRef = useRef<Record<string, StompSubscription>>({});

  useEffect(() => {
    if (!enabled || !userId || !roomTokens.length) return;
    if (!globalStompClient) {
      globalStompClient = new Client({
        brokerURL: WS_URL,
        connectHeaders: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        reconnectDelay: 0,
        onConnect: () => {
          // 연결 성공 시 각 방 구독
          roomTokens.forEach((roomToken) => {
            const topic = `/sub/count/chat-rooms/${userId}/${roomToken}`;
            if (!subscriptionsRef.current[roomToken]) {
              subscriptionsRef.current[roomToken] =
                globalStompClient!.subscribe(topic, (message: IMessage) => {
                  try {
                    const data = JSON.parse(message.body);
                    onMessage(roomToken, data);
                  } catch (e) {
                    console.log(e);
                  }
                });
            }
          });
        },
      });
      globalStompClient.activate();
    } else if (globalStompClient.connected) {
      // 이미 연결되어 있으면 바로 구독
      roomTokens.forEach((roomToken) => {
        const topic = `/sub/count/chat-rooms/${userId}/${roomToken}`;
        if (!subscriptionsRef.current[roomToken]) {
          subscriptionsRef.current[roomToken] = globalStompClient!.subscribe(
            topic,
            (message: IMessage) => {
              try {
                const data = JSON.parse(message.body);
                onMessage(roomToken, data);
              } catch (e) {
                console.log(e);
              }
            }
          );
        }
      });
    } else {
      globalStompClient.activate();
    }
    // 해제 로직
    return () => {
      Object.values(subscriptionsRef.current).forEach((sub) =>
        sub.unsubscribe()
      );
      subscriptionsRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, roomTokens.join(','), enabled]);
}

function getAccessToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    ?.split('=')[1];
}
