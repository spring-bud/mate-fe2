'use client';

import { useState, useCallback, useEffect } from 'react';

interface NicknameSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const NicknameSearchBar: React.FC<NicknameSearchBarProps> = ({
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  // value prop이 변경되면 inputValue도 업데이트
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // onChange를 useCallback으로 안정화
  const stableOnChange = useCallback(onChange, []);

  // 디바운스된 onChange 핸들러
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value) {
        stableOnChange(inputValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, value, stableOnChange]);

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  // 검색 클리어 핸들러
  const handleClear = () => {
    setInputValue('');
    stableOnChange('');
  };

  return (
    <div className='w-full'>
      <div className='relative'>
        <div className='relative flex items-center'>
          <input
            type='text'
            placeholder='닉네임을 입력하세요'
            value={inputValue}
            onChange={handleInputChange}
            className='w-full px-4 py-3 pl-10 pr-10 bg-bgLight border border-border rounded-lg text-textLight placeholder-textDim focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent transition-all'
          />

          {/* 검색 아이콘 */}
          <div className='absolute left-3 text-textDim'>
            <svg
              className='w-5 h-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>

          {/* 클리어 버튼 */}
          {inputValue && (
            <button
              type='button'
              onClick={handleClear}
              className='absolute right-3 text-textDim hover:text-textLight transition-colors'
            >
              <svg
                className='w-4 h-4'
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
          )}
        </div>
      </div>
    </div>
  );
};

export default NicknameSearchBar;
