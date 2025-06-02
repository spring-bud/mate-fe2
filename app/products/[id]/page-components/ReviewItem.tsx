import Image from 'next/image';
import { useState } from 'react';
import StarRating from './StarRating';
import ReviewModal from './ReviewModal';
import { ReviewItemType } from '@/schemas/api/review.schema';
import { useAuthStore } from '@/store/authStore';
import useDeleteReview from '@/hooks/mutation/useDeleteReview';

const ReviewItem = ({
  review,
  productOwnerId,
  productId,
}: {
  review: ReviewItemType;
  productOwnerId: number;
  productId: string;
}) => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const isReviewOwner = user?.user_id === review.review_user_id;
  const deleteReviewMutation = useDeleteReview();

  const handleDeleteReview = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteReviewMutation.mutate({
        reviewId: review.id,
        productOwnerId: productOwnerId,
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className='border-b border-border py-6 first:pt-0'>
        <div className='flex items-start gap-4'>
          <div className='flex-shrink-0'>
            <Image
              src={review.profile_url || '/api/placeholder/40/40'}
              width={40}
              height={40}
              alt={review.nickname || '익명'}
              className='w-10 h-10 rounded-full object-cover border border-border'
            />
          </div>
          <div className='flex-grow'>
            <div className='flex items-center justify-between mb-1'>
              <div className='font-medium text-textLight'>
                {review.nickname || '익명'}
              </div>
              <div>
                {isReviewOwner && (
                  <>
                    <button
                      onClick={handleEditClick}
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
                      onClick={handleDeleteReview}
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
                  </>
                )}
              </div>
            </div>
            <div className='mb-3'>
              <StarRating rating={review.star} />
            </div>
            <p className='text-textPrimary text-sm'>{review.content}</p>
          </div>
        </div>
      </div>

      {isEditing && (
        <ReviewModal
          productId={productId}
          isOpen={isEditing}
          onClose={handleEditClose}
          initialReview={{
            star: review.star,
            content: review.content,
            id: review.id,
          }}
        />
      )}
    </>
  );
};

export default ReviewItem;
