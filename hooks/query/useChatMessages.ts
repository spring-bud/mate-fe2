'use client';

import { useQuery } from '@tanstack/react-query';
import { chatURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { chatMessagesResponseSchema } from '@/schemas/api/chat.schema';

const useChatMessages = (roomToken: string, cursorId?: string) => {
  return useQuery({
    queryKey: ['chat', 'messages', roomToken, cursorId],
    queryFn: async () => {
      const url = cursorId
        ? chatURL.getMessages.replace('roomToken', roomToken) +
          `?cursorId=${cursorId}`
        : chatURL.getMessages.replace('roomToken', roomToken);
      return apiClient.get(url, {
        schema: chatMessagesResponseSchema,
      });
    },
    enabled: !!roomToken,
  });
};

export default useChatMessages;
