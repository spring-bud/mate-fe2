'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api';
import {
  uploadImageResponseDataSchema,
  UploadImageResponseData,
} from '@/schemas/api/upload.schema';

const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File): Promise<UploadImageResponseData> => {
      const formData = new FormData();
      formData.append('file', file);

      return apiClient.post(uploadURL.images, {
        params: formData,
        schema: uploadImageResponseDataSchema,
      });
    },
  });
};

export default useUploadImage;
