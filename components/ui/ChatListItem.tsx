import React from 'react';

interface ChatListItemProps {
  profileUrl: string;
  nickname: string;
  productThumbnailUrl: string;
  productTitle: string;
  unreadCount: number;
  selected?: boolean;
  onClick?: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  profileUrl,
  nickname,
  productThumbnailUrl,
  productTitle,
  unreadCount,
  selected = false,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center px-4 py-3 cursor-pointer transition-colors rounded-lg ${
        selected ? 'bg-hover' : 'hover:bg-hover'
      } w-full`}
      onClick={onClick}
    >
      {/* 프로필 이미지 */}
      <img
        src={profileUrl}
        alt='상대방 프로필'
        className='w-12 h-12 rounded-full object-cover border border-border flex-shrink-0'
      />
      {/* 내용 */}
      <div className='flex-1 min-w-0 ml-3'>
        <div className='flex items-center justify-between'>
          <span className='text-base font-semibold text-textLight truncate max-w-[120px] xs:max-w-[80px] sm:max-w-[120px] md:max-w-[180px]'>
            {nickname}
          </span>
          {/* 읽지 않은 채팅 갯수 */}
          {unreadCount > 0 && (
            <span className='ml-2 inline-flex items-center justify-center min-w-[22px] h-[22px] px-1 text-xs font-bold bg-error text-white rounded-full'>
              {unreadCount}
            </span>
          )}
        </div>
        <div className='flex items-center mt-1 space-x-2'>
          {/* product 썸네일 */}
          <img
            src={productThumbnailUrl}
            alt='상품 썸네일'
            className='w-6 h-6 rounded object-cover border border-border flex-shrink-0'
          />
          {/* product 타이틀 */}
          <span className='text-xs text-textDim truncate max-w-[120px] xs:max-w-[60px] sm:max-w-[120px] md:max-w-[180px]'>
            {productTitle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
