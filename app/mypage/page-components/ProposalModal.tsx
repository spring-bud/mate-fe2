'use client';

import React, { useRef, useEffect } from 'react';
import useProposalDetail from '@/hooks/query/proposal/useProposalDetail';

interface ProposalModalProps {
  proposalId: number;
  onClose: () => void;
}

const ProposalModal: React.FC<ProposalModalProps> = ({
  proposalId,
  onClose,
}) => {
  const {
    data: proposal,
    isLoading,
    error,
  } = useProposalDetail(proposalId.toString());
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (isLoading) {
    return (
      <div className='fixed inset-0 bg-bgDarker bg-opacity-75 flex items-center justify-center z-50'>
        <div className='animate-pulse text-textLight'>로딩 중...</div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className='fixed inset-0 bg-bgDarker bg-opacity-75 flex items-center justify-center z-50'>
        <div className='text-error'>
          제안서를 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-bgDarker bg-opacity-75 flex items-center justify-center p-4 z-50'>
      <div
        ref={modalRef}
        className='bg-bgLight border border-border rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col'
      >
        <div className='p-4 sm:p-6 border-b border-border flex justify-between items-center sticky top-0 bg-bgDark'>
          <h2 className='typo-head3 text-textLight truncate pr-4'>
            {proposal.title}
          </h2>
          <button
            onClick={onClose}
            className='text-textDim hover:text-textLight transition-colors'
            aria-label='Close modal'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>
        </div>

        <div className='p-4 sm:p-6 overflow-y-auto flex-grow'>
          <div className='prose prose-invert max-w-none'>
            {proposal.description ? (
              <div dangerouslySetInnerHTML={{ __html: proposal.description }} />
            ) : (
              <p className='text-textDim'>제안서 내용이 없습니다.</p>
            )}
          </div>
        </div>

        <div className='p-4 sm:p-6 border-t border-border bg-bgDark'>
          <div className='flex justify-end space-x-3'>
            <button
              onClick={onClose}
              className='px-4 py-2 bg-bgLight text-textLight border border-border rounded-md hover:bg-hover transition-colors'
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalModal;
