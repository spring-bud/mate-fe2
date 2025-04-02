'use client';

import { Control, Controller } from 'react-hook-form';

interface TitleInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  error?: string;
  defaultValue?: string;
}

const TitleInput = ({
  name,
  control,
  label = '제목',
  placeholder = '제목을 입력하세요',
  error,
  defaultValue = '',
}: TitleInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className='flex flex-col'>
          {label && (
            <label htmlFor={name} className='typo-body1 mb-2 block'>
              {label}
            </label>
          )}
          <input
            id={name}
            type='text'
            className={`w-full p-3 bg-bgLight border rounded-lg focus:outline-none ${
              error ? 'border-error' : 'border-border focus:border-active'
            }`}
            placeholder={placeholder}
            {...field}
          />
          {error && <p className='mt-1 !text-error typo-caption1'>{error}</p>}
        </div>
      )}
    />
  );
};

export default TitleInput;
