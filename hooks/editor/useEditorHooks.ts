import { useCallback, useState } from 'react';
import { Editor } from '@tiptap/react';
import useUploadImage from '@/hooks/api/useUpload';

export const useLinkActions = () => {
  const addLink = useCallback((editor: Editor | null) => {
    if (!editor) return;

    // 선택된 텍스트가 있는지 확인
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, ' ');

    // 이미 링크인지 확인
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL을 입력하세요:', previousUrl);

    // 취소 시
    if (url === null) {
      return;
    }

    // 빈 값인 경우 링크 제거
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // 프로토콜이 없는 경우 http:// 추가
    const urlWithProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`;

    // 선택된 텍스트가 없는 경우, URL을 텍스트로 삽입
    if (from === to || !selectedText) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'text',
          text: url,
          marks: [
            {
              type: 'link',
              attrs: { href: urlWithProtocol },
            },
          ],
        })
        .run();
    } else {
      // 선택된 텍스트가 있는 경우, 해당 텍스트를 링크로 변환
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: urlWithProtocol })
        .run();
    }
  }, []);

  return { addLink };
};

export const useTableActions = () => {
  // 테이블 선택기 모달 상태
  const [isTableSelectorOpen, setIsTableSelectorOpen] = useState(false);
  const [selectedEditor, setSelectedEditor] = useState<Editor | null>(null);

  const openTableSelector = useCallback((editor: Editor | null) => {
    if (!editor) return;
    setSelectedEditor(editor);
    setIsTableSelectorOpen(true);
  }, []);

  const closeTableSelector = useCallback(() => {
    setIsTableSelectorOpen(false);
  }, []);

  const insertTable = useCallback(
    (rows: number, cols: number) => {
      if (!selectedEditor) return;

      selectedEditor
        .chain()
        .focus()
        .insertTable({
          rows,
          cols,
          withHeaderRow: true,
        })
        .run();
    },
    [selectedEditor]
  );

  const addTable = useCallback(
    (editor: Editor | null) => {
      openTableSelector(editor);
    },
    [openTableSelector]
  );

  return {
    addTable,
    isTableSelectorOpen,
    closeTableSelector,
    insertTable,
  };
};

export const useImageUploadActions = (editor: Editor | null) => {
  const {
    mutateAsync,
    isPending,
    isError,
    error: uploadError,
  } = useUploadImage();

  const uploadImageToEditor = useCallback(
    async (file: File): Promise<void> => {
      if (!editor || !file) return;
      try {
        const result = await mutateAsync(file);
        if (result.image_url) {
          editor.chain().focus().setImage({ src: result.image_url }).run();
        }
      } catch (error) {
        console.error('이미지 업로드 오류:', error);
      }
    },
    [editor, mutateAsync]
  );

  // 드래그 앤 드롭 핸들러
  const handleImageDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!editor) return;

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith('image/'));

      if (imageFile) {
        uploadImageToEditor(imageFile);
      }
    },
    [editor, uploadImageToEditor]
  );

  // 파일 입력 변경 핸들러
  const handleImageInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        uploadImageToEditor(file);
      }

      // 같은 파일 선택 시 이벤트 발생하도록 초기화
      e.target.value = '';
    },
    [uploadImageToEditor]
  );

  return {
    uploadImageToEditor,
    handleImageDrop,
    handleImageInputChange,
    isImageUploading: isPending,
    imageUploadError: isError ? uploadError : null,
  };
};
