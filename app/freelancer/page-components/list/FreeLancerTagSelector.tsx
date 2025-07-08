'use client';

import { useState, useEffect, useRef } from 'react';
import useTagSearch from '@/hooks/query/useTagSearch';
import { PopularTagItem } from '@/hooks/query/usePopularTags';

interface FreeLancerTagSelectorProps {
  popularTags: PopularTagItem[];
  selectedTags: string[];
  onTagAdd: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  compact?: boolean; // 모바일용 컴팩트 모드
}

const FreeLancerTagSelector = ({
  popularTags = [], // Provide default empty array
  selectedTags,
  onTagAdd,
  onTagRemove,
  compact = false,
}: FreeLancerTagSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 태그 검색 결과
  const { data: searchResults = [] } = useTagSearch(searchTerm);

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagRemove(tag);
    } else {
      if (selectedTags.length < 10) {
        // 최대 10개 태그
        onTagAdd(tag);
        setSearchTerm('');
        setShowDropdown(false);
        inputRef.current?.focus();
      } else {
        alert('태그는 최대 10개까지 선택할 수 있습니다.');
      }
    }
  };

  // 검색어 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  // 검색어 입력 시 엔터키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() && searchResults.length > 0) {
      e.preventDefault();
      handleTagClick(searchResults[0]);
    }
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 필터링된 검색 결과 (이미 선택된 태그는 제외)
  const filteredResults = searchResults.filter(
    (tag) => !selectedTags.includes(tag)
  );

  // Ensure popularTags is an array before mapping
  const tagsToRender = Array.isArray(popularTags) ? popularTags : [];

  return (
    <div
      className={`bg-bgLight border border-border rounded-lg ${
        compact ? 'p-3' : 'p-4'
      }`}
    >
      <h3
        className={`${
          compact ? 'typo-body1' : 'typo-head4'
        } mb-3 text-textLight`}
      >
        태그로 검색
      </h3>

      {/* 태그 검색 입력 */}
      <div className='relative mb-3' ref={dropdownRef}>
        <input
          ref={inputRef}
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          placeholder='태그 검색...'
          className='w-full p-2 bg-bgDark border border-border rounded-lg focus:ring-active 
            focus:border-active text-textLight placeholder-textDim typo-body2'
        />

        {/* 검색 결과 드롭다운 */}
        {showDropdown && searchTerm.trim() && (
          <div className='absolute z-20 w-full mt-1 bg-bgLight border border-border rounded-lg shadow-lg'>
            {filteredResults.length > 0 ? (
              <ul className='py-1'>
                {filteredResults.slice(0, 5).map((tag) => (
                  <li
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className='px-3 py-2 hover:bg-hover cursor-pointer text-textLight typo-body2'
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : (
              <div className='px-3 py-2 text-textDim typo-caption1'>
                검색 결과가 없습니다
              </div>
            )}
          </div>
        )}
      </div>

      {/* 인기 태그 섹션 */}
      <div>
        <h4 className='typo-body1 mb-2 text-textLight'>인기 태그</h4>
        <div className='flex flex-wrap gap-2'>
          {/* 컴팩트 모드에서는 상위 10개 태그만 표시 */}
          {tagsToRender.slice(0, compact ? 10 : undefined).map((tag) => (
            <button
              key={tag.name}
              onClick={() => handleTagClick(tag.name)}
              className={`px-2 py-1 rounded-md typo-caption1 transition-colors ${
                selectedTags.includes(tag.name)
                  ? 'bg-active text-white'
                  : 'bg-selection text-textLight hover:bg-hover'
              }`}
            >
              {tag.name}
              <span className='ml-1 text-xs opacity-70'>({tag.count})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreeLancerTagSelector;
