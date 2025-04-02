'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Controller, Control } from 'react-hook-form';

interface TagInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  maxTags?: number;
  error?: string;
  defaultValue?: string[];
}

const TagInput = ({
  name,
  control,
  label = '태그',
  placeholder = '태그를 입력하고 Enter를 누르세요',
  maxTags = 5,
  error,
  defaultValue = [],
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 태그 포맷팅 함수 - 띄어쓰기 허용, 각 단어의 첫 글자는 대문자로
  const formatTag = (tag: string): string => {
    // 앞뒤 공백만 제거
    const trimmedTag = tag.trim();

    // 빈 문자열이면 그대로 반환
    if (!trimmedTag) return '';

    // 한글 포함 여부 확인
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(trimmedTag);

    if (!hasKorean) {
      // 영어인 경우: 각 단어의 첫 글자를 대문자로 변환 (띄어쓰기 유지)
      return trimmedTag
        .split(' ')
        .map((word) =>
          word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
        )
        .join(' ');
    }

    // 한글인 경우 그대로 반환 (띄어쓰기 유지)
    return trimmedTag;
  };

  // 태그 길이 검증 함수
  const validateTagLength = (tag: string): boolean => {
    // 한글 포함 여부 확인
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(tag);

    // 한글 태그는 10자, 영문 태그는 20자로 제한
    const maxLength = hasKorean ? 10 : 20;

    return tag.length <= maxLength;
  };

  // 새 태그 추가 함수
  const addTag = (
    tags: string[],
    newTag: string,
    onChange: (value: string[]) => void
  ) => {
    // 입력값 포맷팅
    const formattedTag = formatTag(newTag);

    // 빈 문자열이면 무시
    if (!formattedTag) {
      return;
    }

    // 길이 검증
    if (!validateTagLength(formattedTag)) {
      // 한글 포함 여부 확인
      const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(formattedTag);
      const maxLength = hasKorean ? 10 : 20;

      alert(
        `태그는 ${hasKorean ? '한글 10자' : '영문 20자'} 이내로 입력해주세요.`
      );
      setInputValue('');
      return;
    }

    // 이미 존재하는 태그라면 무시
    if (tags.includes(formattedTag)) {
      setInputValue('');
      return;
    }

    // 최대 태그 수 확인
    if (tags.length >= maxTags) {
      alert(`태그는 최대 ${maxTags}개까지 추가할 수 있습니다.`);
      setInputValue('');
      return;
    }

    // 태그 추가
    const updatedTags = [...tags, formattedTag];
    onChange(updatedTags);
    setInputValue('');
  };

  // 태그 제거 함수
  const removeTag = (
    tags: string[],
    indexToRemove: number,
    onChange: (value: string[]) => void
  ) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    onChange(updatedTags);
  };

  // 버튼으로 태그 추가 (Enter 키에 추가로)
  const handleAddButtonClick = (
    value: string[],
    onChange: (value: string[]) => void
  ) => {
    if (inputValue.trim()) {
      addTag(value, inputValue, onChange);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value = [] } }) => (
        <div className='flex flex-col'>
          {label && <label className='typo-body1 mb-2 block'>{label}</label>}

          <div
            className={`flex flex-wrap p-2 border rounded-lg bg-bgLight min-h-[44px] ${
              error
                ? 'border-error'
                : 'border-border hover:border-active focus-within:border-active'
            }`}
            onClick={() => inputRef.current?.focus()}
          >
            {/* 태그 목록 */}
            {Array.isArray(value) &&
              value.map((tag: string, index: number) => (
                <div
                  key={index}
                  className='flex items-center bg-selection text-textLight rounded-md px-2 py-1 m-1'
                >
                  <span className='mr-1'>{tag}</span>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(value, index, onChange);
                    }}
                    className='hover:text-red-400 focus:outline-none'
                    aria-label={`태그 삭제: ${tag}`}
                  >
                    <svg
                      className='w-3 h-3'
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
              ))}

            {/* 입력 필드와 추가 버튼 */}
            <div className='flex flex-grow min-w-[120px] m-1'>
              <input
                ref={inputRef}
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  // Enter 키로 태그 추가
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    // 값이 비어있지 않은 경우에만 추가
                    if (inputValue.trim()) {
                      addTag(value, inputValue, onChange);
                    }
                  }

                  // Backspace 키로 태그 제거 (입력창이 비어있을 때)
                  if (
                    e.key === 'Backspace' &&
                    !inputValue &&
                    value.length > 0
                  ) {
                    removeTag(value, value.length - 1, onChange);
                  }
                }}
                placeholder={value.length === 0 ? placeholder : ''}
                className='flex-grow p-1 bg-transparent outline-none text-textLight'
              />
              <button
                type='button'
                onClick={() => handleAddButtonClick(value, onChange)}
                className='ml-1 px-2 py-1 bg-selection text-textLight rounded hover:bg-active transition-colors'
                disabled={!inputValue.trim()}
              >
                추가
              </button>
            </div>
          </div>

          {/* 태그 정보 및 에러 메시지 */}
          <div className='flex justify-between mt-1'>
            <span className='typo-caption1 text-textDim'>
              {value.length > 0 ? `${value.length}/${maxTags}` : ''}
            </span>
            {error && <p className='!text-error typo-caption1'>{error}</p>}
          </div>
        </div>
      )}
    />
  );
};

export default TagInput;
