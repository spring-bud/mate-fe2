'use client';

import { SORT_OPTIONS, SORT_LABELS } from '../../constants/productConstants';

interface SortSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const SortSelector = ({ value, onChange }: SortSelectorProps) => {
  return (
    <div className='flex items-center space-x-2'>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='bg-bgLight border border-border text-textLight rounded-lg 
        focus:ring-active focus:border-active p-2 typo-body2'
      >
        <option value={SORT_OPTIONS.CREATE}>
          {SORT_LABELS[SORT_OPTIONS.CREATE]}
        </option>
        <option value={SORT_OPTIONS.LIKE}>
          {SORT_LABELS[SORT_OPTIONS.LIKE]}
        </option>
      </select>
    </div>
  );
};

export default SortSelector;
