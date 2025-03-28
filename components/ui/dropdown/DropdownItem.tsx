"use client";

import React, { ReactNode } from "react";
import Link from "next/link";

/**
 * DropdownItem 컴포넌트 Props 인터페이스
 * @interface DropdownItemProps
 */
export interface DropdownItemProps {
  /** 표시할 내용 */
  children: ReactNode;

  /** 이동할 경로 (지정 시 Link 컴포넌트 사용) */
  href?: string;

  /** 클릭 시 실행할 함수 */
  onClick?: () => void;

  /** 현재 활성화 여부 */
  active?: boolean;

  /** 비활성화 여부 */
  disabled?: boolean;

  /** 아이콘 (왼쪽에 표시) */
  icon?: ReactNode;

  /** 클릭 시 드롭다운 닫기 여부 */
  keepOpen?: boolean;

  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 드롭다운 메뉴 아이템 컴포넌트
 *
 * @component
 * @example
 * // 기본 사용법
 * <DropdownItem href="/profile">프로필</DropdownItem>
 *
 * @example
 * // 아이콘과 함께 사용
 * <DropdownItem
 *   icon={<UserIcon className="w-4 h-4" />}
 *   href="/profile"
 * >
 *   프로필
 * </DropdownItem>
 *
 * @example
 * // onClick 함수 사용
 * <DropdownItem
 *   onClick={() => handleLogout()}
 *   disabled={isLoggingOut}
 * >
 *   로그아웃
 * </DropdownItem>
 */
const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  href,
  onClick,
  active = false,
  disabled = false,
  icon,
  keepOpen = false,
  className = "",
}) => {
  // 기본 스타일
  const baseClasses = `
    flex items-center w-full px-4 py-2 typo-body1 
    ${
      disabled ? "opacity-50 cursor-not-allowed text-textDim" : "cursor-pointer"
    }
    ${
      active
        ? "bg-active text-white"
        : "text-textPrimary hover:bg-hover dark:text-textLight"
    }
    ${className}
  `;

  // 클릭 이벤트 핸들러
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  // href가 없고 onClick만 있는 경우 - 일반 버튼으로 렌더링
  if (!href) {
    return (
      <button
        className={baseClasses}
        onClick={handleClick}
        disabled={disabled}
        type="button"
        {...(keepOpen ? { "data-keep-open": "true" } : {})}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }

  // href가 있는 경우 - Link 컴포넌트로 렌더링
  return (
    <Link
      href={disabled ? "#" : href}
      className={baseClasses}
      onClick={disabled ? (e) => e.preventDefault() : handleClick}
      {...(keepOpen ? { "data-keep-open": "true" } : {})}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Link>
  );
};

export default DropdownItem;
