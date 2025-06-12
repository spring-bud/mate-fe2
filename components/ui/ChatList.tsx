import React from 'react';
import ChatListItem from './ChatListItem';

export interface ChatListItemData {
  id: number;
  profileUrl: string;
  nickname: string;
  productThumbnailUrl: string;
  productTitle: string;
  unreadCount: number;
  selected?: boolean;
}

interface ChatListProps {
  items: ChatListItemData[];
  onItemClick?: (id: number) => void;
  selectedId?: number;
}

const ChatList: React.FC<ChatListProps> = ({
  items,
  onItemClick,
  selectedId,
}) => {
  // 읽지 않은 채팅이 있는 아이템이 상단에 오도록 정렬
  const sortedItems = [...items].sort((a, b) => {
    if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
    if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
    return 0;
  });

  return (
    <div className='w-full flex flex-col gap-1'>
      {sortedItems.map((item) => (
        <ChatListItem
          key={item.id}
          profileUrl={item.profileUrl}
          nickname={item.nickname}
          productThumbnailUrl={item.productThumbnailUrl}
          productTitle={item.productTitle}
          unreadCount={item.unreadCount}
          selected={item.id === selectedId}
          onClick={() => onItemClick?.(item.id)}
        />
      ))}
    </div>
  );
};

export default ChatList;
