'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(value);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // 외부에서 value prop이 변경되면 내부 상태도 업데이트
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // 타이핑이 멈추면 검색어 업데이트 (디바운싱)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      onChange(newValue);
    }, 500);
  };

  // 엔터 키로 즉시 검색
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      onChange(inputValue);
    }
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  return (
    <div className='relative w-full'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <svg
          className='w-4 h-4 text-textDim'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </div>
      <input
        type='search'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className='block w-full p-2.5 pl-10 typo-body1 bg-bgLight border border-border rounded-lg 
        focus:ring-active focus:border-active text-textLight placeholder-textDim'
        placeholder='제품 검색...'
      />
    </div>
  );
};

export default SearchBar;
