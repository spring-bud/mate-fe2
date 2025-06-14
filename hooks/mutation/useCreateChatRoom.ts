'use client';

import { useMutation } from '@tanstack/react-query';
import { chatURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { createChatRoomResponseSchema } from '@/schemas/api/chat.schema';

const useCreateChatRoom = () => {
  return useMutation({
    mutationFn: async (productId: string) => {
      return apiClient.post(chatURL.createRoom(productId), {
        schema: createChatRoomResponseSchema,
      });
    },
  });
};

export default useCreateChatRoom;
