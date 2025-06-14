'use client';

import { useQuery } from '@tanstack/react-query';
import { chatURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { chatRoomListResponseSchema } from '@/schemas/api/chat.schema';

const useChatRoomList = () => {
  return useQuery({
    queryKey: ['chat', 'roomList'],
    queryFn: async () => {
      return apiClient.get(chatURL.getRoomList, {
        schema: chatRoomListResponseSchema,
      });
    },
  });
};

export default useChatRoomList;
