'use client';

import React, { useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';

export type Category = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

export const defaultCategories: Category[] = [
  {
    value: 'DEVELOP',
    label: '개발',
    icon: (
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
          d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
        />
      </svg>
    ),
  },
  {
    value: 'DESIGN',
    label: '디자인',
    icon: (
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
          d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
        />
      </svg>
    ),
  },
];

interface CategorySelectorProps {
  name: string;
  control: Control<any>;
  label?: string;
  categories?: Category[];
  error?: string;
  defaultValue?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  name,
  control,
  label = '카테고리',
  categories = defaultCategories,
  error,
  defaultValue = '',
}) => {
  // 드롭다운 열림/닫힘 상태 관리
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        const selectedCategory = categories.find((cat) => cat.value === value);
        const handleCategorySelect = (categoryValue: string) => {
          onChange(categoryValue);
          setIsDropDownOpen(false);
        };

        const dropdownTrigger = (
          <button
            type='button'
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
            className={`flex items-center justify-between w-full p-3 ${
              error
                ? 'border-error'
                : 'border-border hover:border-active focus:border-active'
            } border rounded-lg bg-bgLight text-left transition-colors`}
          >
            <div className='flex items-center'>
              {selectedCategory ? (
                <>
                  {selectedCategory.icon && (
                    <span className='mr-2 text-textDim'>
                      {selectedCategory.icon}
                    </span>
                  )}
                  <span>{selectedCategory.label}</span>
                </>
              ) : (
                <span className='text-textDim'>카테고리 선택</span>
              )}
            </div>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isDropDownOpen ? 'transform rotate-180' : ''
              }`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>
        );

        return (
          <div className='flex flex-col'>
            {label && <label className='typo-body1 mb-2 block'>{label}</label>}

            <Dropdown
              trigger={dropdownTrigger}
              position='bottom-left'
              width='auto'
              menuClassName='w-full py-1'
              className='w-full'
              isOpen={isDropDownOpen}
              onOpenChange={setIsDropDownOpen}
              closeOnItemClick={false}
            >
              {categories.map((category) => (
                <DropdownItem
                  key={category.value}
                  onClick={() => handleCategorySelect(category.value)}
                  active={value === category.value}
                  icon={category.icon}
                >
                  {category.label}
                </DropdownItem>
              ))}
            </Dropdown>

            {/* 에러 메시지 */}
            {error && <p className='mt-1 !text-error typo-caption1'>{error}</p>}
          </div>
        );
      }}
    />
  );
};

export default CategorySelector;
