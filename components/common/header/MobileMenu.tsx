'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useChatBadge from '@/hooks/query/useChatBadge';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const currentPath = pathname;
  const prevPathRef = useRef(pathname);
  const hasUnread = useChatBadge();

  const navItems = [
    { href: '/products', label: 'Products' },
    { href: '/freelancer', label: 'Freelancer' },
    { href: '/chat', label: 'Chat', badge: hasUnread },
    { href: '/help', label: 'Help' },
  ];

  // 경로가 변경되었을 때만 메뉴를 닫도록 수정
  useEffect(() => {
    // 이전 경로와 현재 경로가 다를 때만 메뉴 닫기
    if (prevPathRef.current !== pathname && isOpen) {
      onClose();
    }

    prevPathRef.current = pathname;
  }, [pathname, isOpen, onClose]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[9999] bg-black bg-opacity-50 md:hidden'>
      <div
        ref={menuRef}
        className='absolute right-0 top-0 h-full w-64 transform bg-white dark:bg-bgDark shadow-lg transition-transform duration-200 ease-in-out'
      >
        <div className='flex h-16 items-center justify-between border-b border-border px-4'>
          <h2 className='typo-head3 text-textPrimary dark:text-textLight'>
            메뉴
          </h2>
          <button
            onClick={onClose}
            className='text-textDim hover:text-textPrimary'
            aria-label='Close menu'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <nav className='mt-4 px-4'>
          <ul className='space-y-2'>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`typo-button1 block rounded-md py-2 px-3 ${
                    currentPath.startsWith(item.href)
                      ? 'bg-active text-white'
                      : 'text-textPrimary hover:bg-hover dark:text-textLight'
                  } relative`}
                  onClick={onClose}
                >
                  {item.label}
                  {item.label === 'Chat' && item.badge && (
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
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
