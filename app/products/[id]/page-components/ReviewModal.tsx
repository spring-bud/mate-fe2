'use client';

import React, { useState, useRef, useEffect } from 'react';
import useCreateReview from '@/hooks/mutation/useCreateReview';
import { CreateReviewRequest } from '@/schemas/api/review.schema';

interface ReviewModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal = ({ productId, isOpen, onClose }: ReviewModalProps) => {
  const [reviewData, setReviewData] = useState<CreateReviewRequest>({
    star: 5,
    content: '',
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const { mutate: createReview, isPending } = useCreateReview();

  // 외부 클릭시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const handleStarChange = (selectedStar: number) => {
    setReviewData({ ...reviewData, star: selectedStar });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData({ ...reviewData, content: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewData.content.trim() === '') {
      return;
    }

    createReview(
      { productId, data: reviewData },
      {
        onSuccess: () => {
          onClose();
          setReviewData({ star: 5, content: '' });
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-bgDark bg-opacity-75 flex items-center justify-center z-50 px-4'>
      <div
        ref={modalRef}
        className='bg-bgLight border border-border rounded-lg shadow-xl max-w-lg w-full p-6 md:p-8'
      >
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold text-textLight'>리뷰 작성</h2>
          <button
            onClick={onClose}
            className='text-textDim hover:text-textLight transition-colors'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18 6L6 18M6 6L18 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label className='block text-textLight mb-2'>별점</label>
            <div className='flex'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  onClick={() => handleStarChange(star)}
                  className='focus:outline-none mr-1'
                >
                  <svg
                    className={`w-8 h-8 ${
                      star <= reviewData.star ? 'text-warning' : 'text-border'
                    }`}
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className='mb-6'>
            <label
              htmlFor='review-content'
              className='block text-textLight mb-2'
            >
              내용
            </label>
            <textarea
              id='review-content'
              value={reviewData.content}
              onChange={handleContentChange}
              placeholder='리뷰 내용을 입력해주세요.'
              className='w-full bg-bgDark border border-border rounded-md p-3 text-textPrimary min-h-32 focus:border-active focus:outline-none'
              required
            />
            <p className='text-error text-xs mt-2'>
              * 욕설, 비방, 명예훼손, 허위사실 기재 등의 내용은 관련 법률에 의해
              제재를 받을 수 있습니다.
            </p>
          </div>

          <div className='flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 border border-border text-textPrimary rounded-md hover:bg-hover transition-colors mr-2'
            >
              취소
            </button>
            <button
              type='submit'
              disabled={isPending || reviewData.content.trim() === ''}
              className={`px-4 py-2 bg-active text-white rounded-md hover:bg-opacity-90 transition-colors ${
                isPending || reviewData.content.trim() === ''
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {isPending ? '제출 중...' : '리뷰 등록'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
