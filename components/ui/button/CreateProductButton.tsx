import React from 'react';
import Link from 'next/link';

const CreateProductsButton = () => {
  return (
    <Link
      href='/products/create'
      className='flex items-center gap-1 py-1 px-2 bg-active text-white rounded-md text-sm hover:bg-opacity-90 transition-all ml-auto'
    >
      <svg
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' fill='currentColor' />
      </svg>
      글 작성
    </Link>
  );
};

export default CreateProductsButton;
