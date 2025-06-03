'use client';

import React, { useState } from 'react';
import useWithdrawReasons from '@/hooks/query/useWithdrawReasons';
import useWithdraw from '@/hooks/mutation/useWithdraw';

// WithdrawReason 타입 정의 추가
interface WithdrawReason {
  code: string;
  description: string;
}

interface WithdrawModalProps {
  onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onClose }) => {
  const { data: reasonsData, isLoading, isError, error } = useWithdrawReasons();
  const withdrawMutation = useWithdraw();

  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [customReason, setCustomReason] = useState('');

  const handleReasonToggle = (code: string) => {
    setSelectedReasons((prev) =>
      prev.includes(code) ? prev.filter((r) => r !== code) : [...prev, code]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const confirmed = window.confirm(
      '정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
    );
    if (!confirmed) return;

    withdrawMutation.mutate(
      {
        reason: selectedReasons,
        ...(customReason && { detail: customReason }),
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error('회원 탈퇴 실패:', error);
          alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
        },
      }
    );
  };

  // 로딩 및 에러 상태 처리
  if (isLoading) {
    return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
        <div className='bg-bgLight p-6 rounded-lg'>
          <div className='text-textPrimary'>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
        <div className='bg-bgLight p-6 rounded-lg'>
          <div className='text-red-500 mb-2'>
            탈퇴 사유를 불러오는 중 오류가 발생했습니다.
          </div>
          <p className='text-red-500 text-sm mb-4'>
            {error?.message || '알 수 없는 오류가 발생했습니다.'}
          </p>
          <button
            onClick={onClose}
            className='w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
          >
            닫기
          </button>
        </div>
      </div>
    );
  }

  if (
    !reasonsData?.data ||
    !Array.isArray(reasonsData.data) ||
    reasonsData.data.length === 0
  ) {
    return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
        <div className='bg-bgLight p-6 rounded-lg'>
          <div className='text-red-500 mb-4'>
            지금은 회원탈퇴를 할 수 없습니다. 잠시만 기다려주세요
          </div>

          <button
            onClick={onClose}
            className='w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
          >
            닫기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md mx-4'>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <h3 className='text-lg font-semibold mb-4 text-black'>
              탈퇴 사유를 선택해주세요 (복수 선택 가능)
            </h3>

            <div className='space-y-3'>
              {reasonsData.data.map((reason: WithdrawReason) => (
                <label
                  key={reason.code}
                  className='flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors'
                  onClick={() => handleReasonToggle(reason.code)}
                >
                  <input
                    type='checkbox'
                    checked={selectedReasons.includes(reason.code)}
                    onChange={() => handleReasonToggle(reason.code)}
                    className='mr-3 accent-blue-500'
                  />
                  <span className='text-black'>{reason.description}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedReasons.includes('W0005') && (
            <div className='mb-6'>
              <label className='block text-sm font-medium mb-2 text-black'>
                기타 사유를 구체적으로 알려주세요
              </label>
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className='w-full p-3 rounded-lg bg-gray-50 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                rows={4}
                placeholder='탈퇴 사유를 자세히 알려주세요 (선택)'
              />
            </div>
          )}

          <div className='flex space-x-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 py-3 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition-colors font-medium'
            >
              취소
            </button>
            <button
              type='submit'
              disabled={
                selectedReasons.length === 0 || withdrawMutation.isPending
              }
              className={`
                flex-1 py-3 rounded-lg text-white font-semibold transition-colors
                ${
                  selectedReasons.length === 0 || withdrawMutation.isPending
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600 active:bg-red-700'
                }
              `}
            >
              {withdrawMutation.isPending ? '탈퇴 처리 중...' : '회원 탈퇴'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawModal;
