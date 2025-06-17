import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useUnreadChatCount from '@/hooks/query/useUnreadChatCount';
import useChatRoomList from '@/hooks/query/useChatRoomList';
import useChatBadge from '@/hooks/query/useChatBadge';

interface NavItemProps {
  href: string;
  label: string;
  current: boolean;
  badge?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, current, badge }) => {
  const isChat = label === 'Chat';
  return (
    <Link
      href={href}
      className={`typo-button2 px-3 py-2 rounded-md transition-colors relative ${
        current
          ? 'text-active font-medium'
          : 'text-textDim hover:text-textPrimary hover:bg-hover'
      }`}
      aria-current={current ? 'page' : undefined}
    >
      <span className={isChat ? 'relative inline-block' : ''}>
        {label}
        {isChat && badge && (
          <span
            className='absolute -top-2 -right-2 bg-red-500 rounded-full w-[12px] h-[12px] z-10'
            style={{
              minWidth: '12px',
              height: '12px',
              right: '-8px',
              top: '-6px',
              padding: 0,
            }}
          />
        )}
      </span>
    </Link>
  );
};

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const currentPath = pathname;
  const { data: roomList } = useChatRoomList();
  const { perRoom } = useUnreadChatCount();
  const hasUnread = useChatBadge();

  // 안읽은 채팅이 1개라도 있으면 true
  const hasUnreadChat =
    Object.keys(perRoom).length > 0
      ? Object.values(perRoom).some((v) => v?.count > 0)
      : roomList
      ? roomList.some((room) => room.message_count > 0)
      : false;

  const navItems = [
    { href: '/products', label: 'Product' },
    { href: '/freelancer', label: 'Freelancer' },
    { href: '/chat', label: 'Chat', badge: hasUnread },
    { href: '/help', label: 'Help' },
  ];

  return (
    <nav className='flex space-x-1'>
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          label={item.label}
          current={currentPath.startsWith(item.href)}
          badge={item.badge}
        />
      ))}
    </nav>
  );
};

export default Navigation;
