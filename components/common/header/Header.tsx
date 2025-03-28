"use client";

import React, { useState } from "react";
import Logo from "./logo";
import Navigation from "./Navigation";
import UserProfile from "./UserProfile";
import MobileMenu from "./MobileMenu";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  userImageUrl?: string;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn = true,
  userName = "User Name",
  userImageUrl = "/assets/icons/default-avatar.png",
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white dark:bg-bgDark">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:block">
          <Navigation />
        </div>

        {/* User Profile / Login Button */}
        <div className="flex items-center">
          <UserProfile
            isLoggedIn={isLoggedIn}
            userName={userName}
            userImageUrl={userImageUrl}
          />

          {/* Mobile Menu Button - visible only on mobile */}
          <button
            className="ml-4 text-textDim hover:text-textPrimary md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
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
