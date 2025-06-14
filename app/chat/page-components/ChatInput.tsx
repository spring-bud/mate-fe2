import React, { useState, useRef } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onPlusClick?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onPlusClick }) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      setValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // textarea 높이 자동 조절
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className='flex items-end bg-bgLight border-t border-border px-2 py-2 gap-2 w-full'>
      {/* + 버튼 */}
      <button
        type='button'
        className='w-9 h-9 flex items-center justify-center rounded-full hover:bg-hover transition-colors text-textDim'
        onClick={onPlusClick}
        aria-label='추가'
      >
        <span className='text-xl font-bold'>+</span>
      </button>
      {/* 입력창 (textarea) */}
      <textarea
        ref={textareaRef}
        className='flex-1 bg-bgDark text-textPrimary px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-active transition-all text-sm resize-none min-h-[38px] max-h-32 overflow-y-auto'
        placeholder='메시지를 입력하세요'
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      {/* 전송 버튼 */}
      <button
        type='button'
        className='w-9 h-9 flex items-center justify-center rounded-full bg-active text-white hover:bg-blue-600 transition-colors'
        onClick={handleSend}
        aria-label='전송'
      >
        <svg width='20' height='20' fill='none' viewBox='0 0 20 20'>
          <path
            fill='currentColor'
            d='M2.5 17.5l15-7.5-15-7.5v6.25l10 1.25-10 1.25v6.25z'
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
