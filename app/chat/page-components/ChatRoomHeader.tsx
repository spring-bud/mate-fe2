import React from 'react';
import Image from 'next/image';

interface ChatRoomHeaderProps {
  profileUrl: string;
  nickname: string;
  productTitle: string;
  onBack?: () => void;
  onLeave?: () => void;
}

const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({
  profileUrl,
  nickname,
  productTitle,
  onBack,
  onLeave,
}) => {
  return (
    <header className='sticky top-0 z-10 bg-bgDark border-b border-border px-4 py-3 flex items-center justify-center'>
      <div className='max-w-lg w-full mx-auto flex items-center gap-3'>
        <button
          type='button'
          onClick={onBack}
          className='mr-2 p-1 rounded-full hover:bg-hover transition-colors text-textDim'
          aria-label='뒤로가기'
        >
          <svg width='24' height='24' fill='none' viewBox='0 0 24 24'>
            <path
              d='M15 19l-7-7 7-7'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        {profileUrl ? (
          <Image
            src={profileUrl}
            alt='상대방 프로필'
            className='w-10 h-10 rounded-full object-cover border border-border flex-shrink-0'
            width={40}
            height={40}
          />
        ) : null}
        <div className='flex flex-col min-w-0 flex-1'>
          <span className='text-base font-semibold text-textLight truncate max-w-[160px] xs:max-w-[80px] sm:max-w-[160px] md:max-w-[220px]'>
            {nickname}
          </span>
          <span className='text-xs text-textDim truncate max-w-[160px] xs:max-w-[80px] sm:max-w-[160px] md:max-w-[220px]'>
            {productTitle}
          </span>
        </div>
        <button
          type='button'
          onClick={onLeave}
          className='ml-2 p-1 rounded-full hover:bg-hover transition-colors text-error'
          aria-label='채팅방 나가기'
        >
          <svg width='22' height='22' fill='none' viewBox='0 0 22 22'>
            <path
              d='M15.5 8.5L18 11m0 0l-2.5 2.5M18 11H7m2-7h3a4 4 0 014 4v10a4 4 0 01-4 4h-3a4 4 0 01-4-4v-2'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default ChatRoomHeader;
