import React, { useRef, forwardRef } from 'react';
import ChatMessageItem from './ChatMessageItem';

export interface ChatMessageData {
  id: string | number;
  message: string;
  isMine: boolean;
  time?: string;
  senderProfileUrl?: string;
  senderName?: string;
}

interface ChatMessagesProps {
  messages: ChatMessageData[];
  hasNext?: boolean;
  onLoadMore?: () => void;
}

const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ messages, hasNext, onLoadMore }, ref) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);

    return (
      <div className='flex-1 overflow-y-auto py-4 bg-bgDark' ref={ref}>
        <div ref={topRef} />
        {hasNext && onLoadMore && (
          <div className='flex justify-center mb-2'>
            <button
              className='px-3 py-1 rounded bg-bgLight text-textPrimary border border-border hover:bg-hover text-xs'
              onClick={onLoadMore}
            >
              채팅 더 불러오기
            </button>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessageItem
            key={msg.id}
            message={msg.message}
            isMine={msg.isMine}
            time={msg.time}
            senderProfileUrl={msg.senderProfileUrl}
            senderName={msg.senderName}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    );
  }
);

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
