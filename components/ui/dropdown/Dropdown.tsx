"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";

/**
 * 드롭다운 컴포넌트의 위치 옵션
 */
export type DropdownPosition =
  | "bottom-right" // 트리거 요소 아래, 오른쪽 정렬
  | "bottom-left" // 트리거 요소 아래, 왼쪽 정렬
  | "top-right" // 트리거 요소 위, 오른쪽 정렬
  | "top-left" // 트리거 요소 위, 왼쪽 정렬
  | "right-top" // 트리거 요소 오른쪽, 위쪽 정렬
  | "right-bottom" // 트리거 요소 오른쪽, 아래쪽 정렬
  | "left-top" // 트리거 요소 왼쪽, 위쪽 정렬
  | "left-bottom"; // 트리거 요소 왼쪽, 아래쪽 정렬

/**
 * 드롭다운 크기 옵션
 */
export type DropdownSize = "sm" | "md" | "lg" | "auto";

/**
 * Dropdown 컴포넌트 Props 인터페이스
 * @interface DropdownProps
 */
export interface DropdownProps {
  /** 드롭다운 트리거 요소 */
  trigger: ReactNode;

  /** 드롭다운 내용 */
  children: ReactNode;

  /** 드롭다운이 열려있는지 여부 (제어 컴포넌트로 사용할 경우) */
  isOpen?: boolean;

  /** 드롭다운 상태가 변경될 때 호출되는 함수 (제어 컴포넌트로 사용할 경우) */
  onOpenChange?: (isOpen: boolean) => void;

  /** 드롭다운 위치 */
  position?: DropdownPosition;

  /** 드롭다운 너비 */
  width?: DropdownSize;

  /** 드롭다운 최대 높이 (픽셀) */
  maxHeight?: number;

  /** 외부 클릭 시 드롭다운 닫기 여부 */
  closeOnOutsideClick?: boolean;

  /** ESC 키 누를 때 드롭다운 닫기 여부 */
  closeOnEsc?: boolean;

  /** 링크 클릭 시 드롭다운 닫기 여부 */
  closeOnItemClick?: boolean;

  /** 드롭다운 컨테이너에 적용할 추가 클래스 */
  className?: string;

  /** 드롭다운 메뉴에 적용할 추가 클래스 */
  menuClassName?: string;

  /** z-index 값 */
  zIndex?: number;
}

/**
 * 재사용 가능한 드롭다운 컴포넌트
 *
 * @component
 * @example
 * // 기본 사용법
 * <Dropdown
 *   trigger={<button>메뉴 열기</button>}
 *   position="bottom-right"
 * >
 *   <div className="p-2">
 *     <a href="/profile">프로필</a>
 *     <a href="/settings">설정</a>
 *     <a href="/logout">로그아웃</a>
 *   </div>
 * </Dropdown>
 *
 * @example
 * // 제어 컴포넌트로 사용
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Dropdown
 *   trigger={<button>메뉴 열기</button>}
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   position="bottom-right"
 * >
 *   <div className="p-2">드롭다운 내용</div>
 * </Dropdown>
 */
const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
  position = "bottom-right",
  width = "md",
  maxHeight,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  closeOnItemClick = true,
  className = "",
  menuClassName = "",
  zIndex = 50,
}) => {
  // 제어/비제어 컴포넌트 상태 관리
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);

  // 컴포넌트가 제어되는지 여부 확인
  const isControlled = controlledIsOpen !== undefined;

  // 현재 드롭다운의 열림 상태
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  // 드롭다운 요소에 대한 참조
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * 드롭다운 열림 상태 변경 함수
   * @param newIsOpen - 새로운 열림 상태
   */
  const setIsOpen = (newIsOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledIsOpen(newIsOpen);
    }
    onOpenChange?.(newIsOpen);
  };

  /**
   * 드롭다운 토글 함수
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeOnOutsideClick]);

  // ESC 키 누를 때 드롭다운 닫기
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, closeOnEsc]);

  // 링크 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!closeOnItemClick || !isOpen) return;

    const dropdownElement = dropdownRef.current;
    if (!dropdownElement) return;

    const handleItemClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // a 태그나 button 태그 클릭 시 드롭다운 닫기
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        // 특정 data-keep-open 속성이 있으면 닫지 않음
        if (
          target.hasAttribute("data-keep-open") ||
          target.closest("[data-keep-open]")
        ) {
          return;
        }
        setIsOpen(false);
      }
    };

    dropdownElement.addEventListener("click", handleItemClick);

    return () => {
      dropdownElement.removeEventListener("click", handleItemClick);
    };
  }, [isOpen, closeOnItemClick]);

  // 드롭다운 위치에 따른 CSS 클래스
  const positionClasses = {
    "bottom-right": "top-full right-0 mt-1",
    "bottom-left": "top-full left-0 mt-1",
    "top-right": "bottom-full right-0 mb-1",
    "top-left": "bottom-full left-0 mb-1",
    "right-top": "left-full top-0 ml-1",
    "right-bottom": "left-full bottom-0 ml-1",
    "left-top": "right-full top-0 mr-1",
    "left-bottom": "right-full bottom-0 mr-1",
  };

  // 드롭다운 너비에 따른 CSS 클래스
  const widthClasses = {
    sm: "w-32",
    md: "w-48",
    lg: "w-64",
    auto: "w-auto",
  };

  // 최대 높이 스타일
  const maxHeightStyle = maxHeight ? { maxHeight: `${maxHeight}px` } : {};

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* 트리거 요소 */}
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div
          className={`absolute ${positionClasses[position]} ${widthClasses[width]} z-${zIndex} rounded-md bg-white dark:bg-bgLight shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto origin-top-right ${menuClassName}`}
          style={maxHeightStyle}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
