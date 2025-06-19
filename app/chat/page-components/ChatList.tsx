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
  return (
    <div className='w-full flex flex-col gap-1'>
      {items.map((item) => (
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
