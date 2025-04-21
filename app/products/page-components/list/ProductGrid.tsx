'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ProductListItem } from '@/schemas/api/product.schema';

interface ProductGridProps {
  products: ProductListItem[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  // 추후 분리
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  };

  return (
    <div className='grid grid-cols-1 gap-6'>
      {products.map((product) => (
        <Link
          href={`/products/${product.id}`}
          key={product.id}
          className='block hover:opacity-95 transition-opacity'
        >
          <div className='bg-bgLight border border-border rounded-lg overflow-hidden hover:border-active transition-colors'>
            <div className='flex flex-col md:flex-row'>
              {/* 썸네일 */}
              <div className='md:w-64 h-48 md:h-auto relative'>
                <Image
                  src={product.thumbnail_url}
                  alt={product.title}
                  fill
                  sizes='(max-width: 768px) 100vw, 256px'
                  style={{ objectFit: 'cover' }}
                  className='bg-bgDark'
                />
              </div>

              {/* 콘텐츠 */}
              <div className='flex-1 p-4 flex flex-col'>
                <div className='flex-1'>
                  {/* 카테고리 */}
                  <div className='flex justify-between items-center mb-2'>
                    <span className='px-2 py-1 bg-active bg-opacity-20 text-active rounded text-xs font-medium'>
                      {product.category}
                    </span>
                    <span className='text-textDim typo-caption1'>
                      {formatDate(product.created_at)}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className='typo-head3 text-textLight mb-2 line-clamp-1'>
                    {product.title}
                  </h3>

                  {/* 내용 */}
                  <p className='typo-body2 text-textDim mb-3 line-clamp-2'>
                    {product.content.replace(/<[^>]*>/g, '')}
                  </p>

                  {/* 태그 */}
                  <div className='flex flex-wrap gap-1 mb-3'>
                    {product.product_tags.map((tag) => (
                      <span
                        key={tag.tag_id}
                        className='px-2 py-0.5 bg-selection text-textLight rounded-md text-xs'
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 하단 정보 */}
                <div className='flex justify-between items-center border-t border-border pt-3'>
                  <div className='flex items-center'>
                    <div className='w-6 h-6 rounded-full overflow-hidden relative mr-2'>
                      <Image
                        src={product.owner.profile_url}
                        alt={product.owner.nickname}
                        fill
                        sizes='24px'
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <span className='typo-caption1 text-textLight'>
                      {product.owner.nickname}
                    </span>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <div className='flex items-center space-x-1'>
                      <svg
                        className='w-4 h-4 text-textDim'
                        fill={product.is_liked ? 'currentColor' : 'none'}
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                        />
                      </svg>
                      <span className='typo-caption1 text-textDim'>
                        {product.count.like_count}
                      </span>
                    </div>

                    <div className='flex items-center space-x-1'>
                      <svg
                        className='w-4 h-4 text-textDim'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                        />
                      </svg>
                      <span className='typo-caption1 text-textDim'>
                        {product.count.review_count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
