'use client';

import { CATEGORY_OPTIONS } from '../../constants/productConstants';
import CreateProductsButton from '@/components/ui/button/CreateProductButton';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  const categories = [
    { id: CATEGORY_OPTIONS.DEVELOP, label: '개발' },
    { id: CATEGORY_OPTIONS.DESIGN, label: '디자인' },
  ];

  return (
    <div className='flex items-center border-b border-border'>
      <div className='flex'>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`py-3 px-6 typo-button1 relative transition-colors duration-200 
            ${
              activeCategory === category.id
                ? 'text-textLight'
                : 'text-textDim hover:text-textLight'
            }`}
          >
            {category.label}
            {activeCategory === category.id && (
              <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-active' />
            )}
          </button>
        ))}
      </div>

      {/* 글 생성 버튼 */}
      <CreateProductsButton />
    </div>
  );
};

export default CategoryTabs;
