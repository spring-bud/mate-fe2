'use client';

import { useParams } from 'next/navigation';
import useProductDetail from '@/hooks/query/useProductDetail';
import UserInfo from './page-components/UserInfo';
import ProductContent from './page-components/ProductContent';
import ReviewList from './page-components/ReviewList';

const ProductDetailErrorState = () => {
  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <svg
        width='64'
        height='64'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='mb-4 text-textDim'
      >
        <path
          d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z'
          fill='currentColor'
        />
      </svg>
      <h2 className='text-xl font-medium text-textPrimary mb-2'>
        상품을 찾을 수 없습니다
      </h2>
      <p className='text-textDim mb-8'>
        요청하신 상품 정보를 불러올 수 없습니다. 다시 시도해 주세요.
      </p>
      <button
        className='px-4 py-2 bg-active text-white rounded hover:opacity-90 transition-opacity'
        onClick={() => window.location.reload()}
      >
        새로고침
      </button>
    </div>
  );
};

const ProductDetailClient = () => {
  const params = useParams();
  const productId = typeof params.id === 'string' ? params.id : '';

  const { data: product, error } = useProductDetail(productId);

  if (error || !product) {
    return <ProductDetailErrorState />;
  }

  return (
    <div className='flex flex-col gap-8 mx-auto max-w-screen-xl sm:p-4 xs:p-4'>
      <div className='flex justify-between items-center'>
        <div className='typo-head1 mb-3'>{product.title}</div>
        <div className='flex items-center gap-3'>
          <span className='px-3 py-1 bg-active bg-opacity-20 text-active rounded text-sm font-medium'>
            {product.category}
          </span>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='md:w-72 w-full order-2 md:order-1'>
          <div className='md:sticky md:top-20'>
            <UserInfo product={product} />
          </div>
        </div>

        <div className='flex-1 order-1 md:order-2'>
          <ProductContent product={product} />
          <ReviewList productId={productId} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailClient;
