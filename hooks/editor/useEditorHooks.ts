import { useCallback, useState } from 'react';
import { Editor } from '@tiptap/react';

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

export const handleFileInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  editor: Editor | null,
  uploadFunc: (
    file: File,
    editor: Editor | null,
    setLoading: (isLoading: boolean) => void
  ) => Promise<void>,
  setLoading: (isLoading: boolean) => void
) => {
  const file = event.target.files?.[0];
  if (file) {
    uploadFunc(file, editor, setLoading);
  }
  // 입력값 초기화
  if (event.target) {
    event.target.value = '';
  }
};

export const handleDrop = (
  event: React.DragEvent,
  editor: Editor | null,
  uploadFunc: (
    file: File,
    editor: Editor | null,
    setLoading: (isLoading: boolean) => void
  ) => Promise<void>,
  setLoading: (isLoading: boolean) => void
) => {
  event.preventDefault();

  if (!editor) return;

  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      uploadFunc(file, editor, setLoading);
    }
  }
};

export default {
  useLinkActions,
  useTableActions,
  handleFileInputChange,
  handleDrop,
};
