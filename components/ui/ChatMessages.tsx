import React, { useEffect, useRef } from 'react';
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
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='flex-1 overflow-y-auto px-2 py-4 bg-bgDark'>
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
};

export default ChatMessages;
