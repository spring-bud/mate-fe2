'use client';

import React, { useState, useEffect } from 'react';
import Logo from './logo';
import Navigation from './Navigation';
import UserProfile from './UserProfile';
import MobileMenu from './MobileMenu';
import { useAuthStore } from '@/store/authStore';
import { AccessTokenPayload } from '@/schemas/api/auth.schema';

interface HeaderProps {
  initialUserInfo: AccessTokenPayload | null;
}

const Header: React.FC<HeaderProps> = ({ initialUserInfo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useAuthStore();

  // initialUserInfo로 스토어 초기화
  useEffect(() => {
    if (initialUserInfo) {
      setUser(initialUserInfo);
    }
  }, [initialUserInfo, setUser]);

  const displayUser = user || initialUserInfo;
  const isLoggedIn = !!displayUser;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border bg-white dark:bg-bgDark'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Logo />

        {/* Desktop Navigation - hidden on mobile */}
        <div className='hidden md:block'>
          <Navigation />
        </div>

        {/* User Profile / Login Button */}
        <div className='flex items-center'>
          <UserProfile
            isLoggedIn={isLoggedIn}
            userName={displayUser?.user_nickname}
            userImageUrl={displayUser?.user_url}
          />

          {/* Mobile Menu Button - visible only on mobile */}
          <button
            className='ml-4 text-textDim hover:text-textPrimary md:hidden'
            onClick={toggleMobileMenu}
            aria-label='Toggle menu'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - slides in from the side */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
