'use client';

import { useParams } from 'next/navigation';
import useProductDetail from '@/hooks/query/useProductDetail';
import UserInfo from './page-components/UserInfo';
import ProductContent from './page-components/ProductContent';
import ReviewList from './page-components/ReviewList';
import isOwner from '@/utils/isOwner';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const isProductOwner = product?.owner?.user_id
    ? isOwner(Number(product.owner.user_id))
    : false;

  if (error || !product) {
    return <ProductDetailErrorState />;
  }

  const handleEdit = () => {
    // 소유자 확인
    if (!isProductOwner) {
      alert('수정 권한이 없습니다. 상품 소유자만 수정할 수 있습니다.');
      return;
    }

    // 수정 페이지로 이동
    router.push(`/products/edit/${productId}`);
  };

  const handleDelete = () => {
    // 삭제 처리 로직
    console.log('Delete product:', productId);
  };

  return (
    <div className='flex flex-col gap-8 mx-auto max-w-screen-xl sm:p-4 xs:p-4'>
      <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-2'>
        <div className='flex items-center'>
          <h1 className='typo-head1 mb-3'>{product.title}</h1>
          {isProductOwner && (
            <div className='flex items-center ml-3 space-x-1 xs:ml-2'>
              {/* 수정 아이콘 */}
              <button
                onClick={handleEdit}
                className='p-1.5 rounded-md text-textDim hover:text-textPrimary hover:bg-hover transition-colors'
                aria-label='수정'
                title='수정'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z'
                    fill='currentColor'
                  />
                </svg>
              </button>
              {/* 삭제 아이콘 */}
              <button
                onClick={handleDelete}
                className='p-1.5 rounded-md text-textDim hover:text-error hover:bg-hover transition-colors'
                aria-label='삭제'
                title='삭제'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z'
                    fill='currentColor'
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
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
