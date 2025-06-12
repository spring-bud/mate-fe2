import React from 'react';

interface ChatMessageItemProps {
  message: string;
  isMine: boolean;
  time?: string;
  senderProfileUrl?: string;
  senderName?: string;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  isMine,
  time,
  senderProfileUrl,
  senderName,
}) => {
  return (
    <div
      className={`flex w-full mb-2 ${isMine ? 'justify-end' : 'justify-start'}`}
    >
      {!isMine && (
        <div className='flex flex-col items-center mr-2'>
          {senderProfileUrl && (
            <img
              src={senderProfileUrl}
              alt={senderName || '상대방 프로필'}
              className='w-7 h-7 rounded-full object-cover border border-border mb-1'
            />
          )}
          {senderName && (
            <span className='text-[11px] text-textDim max-w-[60px] truncate text-center'>
              {senderName}
            </span>
          )}
        </div>
      )}
      <div
        className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm break-words ${
          isMine
            ? 'bg-active text-white rounded-br-md'
            : 'bg-bgLight text-textPrimary rounded-bl-md'
        } shadow-sm`}
      >
        <span style={{ whiteSpace: 'pre-line' }}>{message}</span>
        {time && (
          <span className='block text-[10px] text-textDim mt-1 text-right'>
            {time}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessageItem;
