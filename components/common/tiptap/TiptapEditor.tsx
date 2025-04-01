'use client';

import { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { Controller, Control } from 'react-hook-form';
import { getExtensions } from './tiptap-function/extensions';
import Toolbar from './Toolbar';
import { uploadImageToEditor } from './tiptap-function/imageUploader';
import {
  handleDrop,
  handleFileInputChange,
} from '../../../hooks/editor/useEditorHooks';

interface TiptapEditorProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
}

// 에디터 컴포넌트를 완전히 분리
const TiptapEditorContent = ({
  value,
  onChange,
  placeholder,
  error,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder: string;
  error?: string;
}) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이전 HTML을 추적하기 위한 ref
  const previousHtmlRef = useRef(value);

  // 이미지 버튼 클릭 핸들러
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 에디터 인스턴스 생성 - 컴포넌트의 최상위 레벨에서 호출
  const editor = useEditor({
    extensions: getExtensions(placeholder),
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      previousHtmlRef.current = html; // 업데이트될 때 이전 값 저장
      onChange(html);
    },
  });

  // 외부 값이 변경되었을 때만 에디터 콘텐츠 업데이트
  useEffect(() => {
    if (editor && value !== previousHtmlRef.current) {
      // 외부에서 변경된 경우에만 업데이트
      editor.commands.setContent(value || '');
      previousHtmlRef.current = value;
    }
  }, [editor, value]);

  // 에디터가 준비되지 않은 경우
  if (!editor) {
    return <div>에디터 로딩 중...</div>;
  }

  return (
    <div className='flex flex-col'>
      <div
        className={`relative border rounded-lg overflow-hidden transition-colors ${
          error ? 'border-error' : 'border-border hover:border-active'
        }`}
        onDrop={(e) =>
          handleDrop(e, editor, uploadImageToEditor, setIsImageUploading)
        }
        onDragOver={(e) => e.preventDefault()}
      >
        {/* 툴바 */}
        <Toolbar
          editor={editor}
          isImageUploading={isImageUploading}
          onImageButtonClick={handleImageButtonClick}
        />

        {/* 이미지 업로드를 위한 숨겨진 input */}
        <input
          type='file'
          ref={fileInputRef}
          onChange={(e) =>
            handleFileInputChange(
              e,
              editor,
              uploadImageToEditor,
              setIsImageUploading
            )
          }
          accept='image/*'
          className='hidden'
        />

        {/* 에디터 컨텐츠 영역 */}
        <div className='p-4 bg-bgLight min-h-[300px]'>
          <EditorContent
            editor={editor}
            className='prose prose-invert max-w-none'
          />
        </div>

        {/* 로딩 오버레이 */}
        {isImageUploading && (
          <div className='absolute inset-0 flex items-center justify-center bg-bgDark bg-opacity-50 z-10'>
            <div className='text-textLight flex items-center'>
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              이미지 업로드 중...
            </div>
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && <p className='mt-1 !text-error typo-caption1'>{error}</p>}
    </div>
  );
};

// 메인 컴포넌트 - React Hook Form 통합
const TiptapEditor = ({
  name,
  control,
  defaultValue = '',
  placeholder = '내용을 입력하세요...',
  error,
}: TiptapEditorProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <TiptapEditorContent
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
        />
      )}
    />
  );
};

export default TiptapEditor;
