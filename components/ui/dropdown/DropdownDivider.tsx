"use client";

import React from "react";

/**
 * DropdownDivider 컴포넌트 Props 인터페이스
 * @interface DropdownDividerProps
 */
export interface DropdownDividerProps {
  /** 구분선 마진 값 */
  margin?: number;

  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 드롭다운 메뉴 내 구분선 컴포넌트
 *
 * @component
 * @example
 * // 기본 사용법
 * <DropdownItem href="/profile">프로필</DropdownItem>
 * <DropdownDivider />
 * <DropdownItem href="/logout">로그아웃</DropdownItem>
 *
 * @example
 * // 마진 조정
 * <DropdownDivider margin={4} />
 */
const DropdownDivider: React.FC<DropdownDividerProps> = ({
  margin = 2,
  className = "",
}) => {
  return (
    <div
      className={`border-t border-border my-${margin} ${className}`}
      role="separator"
      aria-orientation="horizontal"
    />
  );
};

export default DropdownDivider;
