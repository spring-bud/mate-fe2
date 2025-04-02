'use client';

import React, { useState, useEffect } from 'react';

interface TableSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (rows: number, cols: number) => void;
  maxRows?: number;
  maxCols?: number;
}

const TableSelectorModal: React.FC<TableSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  maxRows = 10,
  maxCols = 10,
}) => {
  const [hoveredCell, setHoveredCell] = useState({ rows: 0, cols: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 환경 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isOpen) return null;

  // 그리드 셀에 마우스 오버 또는 터치 시 호출
  const handleCellInteraction = (rows: number, cols: number) => {
    setHoveredCell({ rows, cols });
  };

  // 셀 클릭 시 호출
  const handleCellClick = () => {
    if (hoveredCell.rows > 0 && hoveredCell.cols > 0) {
      onSelect(hoveredCell.rows, hoveredCell.cols);
      onClose();
    }
  };

  // 모달 클릭 시 이벤트 버블링 방지
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 배경 클릭 시 모달 닫기
  const handleBackdropClick = () => {
    onClose();
  };

  // 모바일에서는 작은 셀 크기 사용
  const cellSize = isMobile ? 'w-4 h-4' : 'w-6 h-6';
  // 모바일에서는 더 작은 그리드 표시 (예: 8x8)
  const displayRows = isMobile ? Math.min(8, maxRows) : maxRows;
  const displayCols = isMobile ? Math.min(8, maxCols) : maxCols;

  return (
    <div
      className='fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50'
      style={{ marginTop: isMobile ? '20px' : '40px' }}
      onClick={handleBackdropClick}
    >
      <div
        className='bg-bgLight rounded-lg shadow-lg p-2 sm:p-3 border border-border'
        onClick={handleModalClick}
      >
        <div className='mb-2 text-center text-textLight typo-caption1'>
          {hoveredCell.rows > 0 && hoveredCell.cols > 0
            ? `${hoveredCell.rows} × ${hoveredCell.cols}`
            : '행과 열을 선택하세요'}
        </div>

        <div
          className={`grid gap-1 p-1 ${
            isMobile ? 'grid-cols-8' : 'grid-cols-10'
          }`}
        >
          {Array.from({ length: displayRows * displayCols }).map((_, index) => {
            const row = Math.floor(index / displayCols) + 1;
            const col = (index % displayCols) + 1;
            const isHighlighted =
              row <= hoveredCell.rows && col <= hoveredCell.cols;

            return (
              <div
                key={index}
                className={`${cellSize} border ${
                  isHighlighted
                    ? 'bg-active border-active'
                    : 'bg-bgDark border-border'
                }`}
                onMouseEnter={() => handleCellInteraction(row, col)}
                onTouchStart={() => handleCellInteraction(row, col)}
                onTouchMove={(e) => {
                  // 모바일에서 드래그하며 선택할 수 있도록 처리
                  e.preventDefault();
                  const touch = e.touches[0];
                  const element = document.elementFromPoint(
                    touch.clientX,
                    touch.clientY
                  );

                  // 그리드 셀 요소인지 확인하고 인덱스 추출
                  if (
                    element &&
                    element.classList.contains(cellSize.split(' ')[0])
                  ) {
                    const cellIndex = Array.from(
                      element.parentElement?.children || []
                    ).indexOf(element);
                    if (cellIndex !== -1) {
                      const r = Math.floor(cellIndex / displayCols) + 1;
                      const c = (cellIndex % displayCols) + 1;
                      handleCellInteraction(r, c);
                    }
                  }
                }}
                onClick={handleCellClick}
              />
            );
          })}
        </div>

        {/* 모바일에서는 확인/취소 버튼 추가 */}
        {isMobile && (
          <div className='flex justify-between mt-3'>
            <button
              className='px-3 py-1 border border-border rounded text-textLight typo-caption1'
              onClick={onClose}
            >
              취소
            </button>
            <button
              className='px-3 py-1 bg-active text-white rounded typo-caption1'
              onClick={handleCellClick}
              disabled={hoveredCell.rows === 0 || hoveredCell.cols === 0}
            >
              확인 ({hoveredCell.rows}×{hoveredCell.cols})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableSelectorModal;
