import { Editor } from '@tiptap/react';

export const mockUploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // 1초 지연으로 로딩 시뮬레이션
      setTimeout(() => {
        resolve(reader.result as string);
      }, 1000);
    };
    reader.readAsDataURL(file);
  });
};

export const uploadImageToEditor = async (
  file: File,
  editor: Editor | null,
  setLoading: (isLoading: boolean) => void
): Promise<void> => {
  if (!editor) return;

  try {
    setLoading(true);

    // 실제 환경에서는 서버 API로 변경 필요
    const imageUrl = await mockUploadImage(file);

    // 에디터에 이미지 추가
    editor.chain().focus().setImage({ src: imageUrl }).run();
  } catch (error) {
    console.error('이미지 업로드 오류:', error);
    alert('이미지 업로드에 실패했습니다.');
  } finally {
    setLoading(false);
  }
};
