import React from 'react';
import ChatListItem from './ChatListItem';

export interface ChatListItemData {
  id: number;
  roomToken: string;
  profileUrl: string;
  nickname: string;
  productThumbnailUrl: string;
  productTitle: string;
  unreadCount: number;
  lastMessage: string;
  lastTime: string;
  selected?: boolean;
  createdAt: number;
}

interface ChatListProps {
  items: ChatListItemData[];
  onItemClick?: (id: number, roomToken: string) => void;
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
    // 최신순(내림차순)
    return b.createdAt - a.createdAt;
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
          lastMessage={item.lastMessage}
          lastTime={item.lastTime}
          selected={item.id === selectedId}
          onClick={() => onItemClick?.(item.id, item.roomToken)}
        />
      ))}
    </div>
  );
};

export default ChatList;
