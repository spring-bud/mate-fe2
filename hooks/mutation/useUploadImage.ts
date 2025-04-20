'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import {
  uploadImageResponseDataSchema,
  UploadImageResponseData,
} from '@/schemas/api/upload.schema';
import { checkImageBeforeUpload } from '@/utils/checkValidateImage';

const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File): Promise<UploadImageResponseData> => {
      const validation = checkImageBeforeUpload(file);
      if (!validation.isValid) {
        throw new Error(
          validation.errorMessage || '이미지 유효성 검사에 실패했습니다.'
        );
      }

      const formData = new FormData();
      formData.append('file', file);

      return apiClient.post(uploadURL.images, {
        params: formData,
        schema: uploadImageResponseDataSchema,
      });
    },
    onError: (error) => {
      // 에러 메시지 표시
      alert(
        error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.'
      );
    },
  });
};

export default useUploadImage;
