import { z } from 'zod';

// 채팅방 생성 응답 스키마
export const createChatRoomResponseSchema = z.object({
  room_token: z.string(),
});

// 채팅 메시지 스키마
export const chatMessageSchema = z.object({
  id: z.string(),
  type: z.string(),
  message: z.string(),
  room_token: z.string(),
  sender_id: z.number(),
  sender_name: z.string(),
  sender_profile_url: z.string().url(),
  created_at: z.string(),
});

// 채팅 내역 응답 스키마
export const chatMessagesResponseSchema = z.object({
  messages: z.array(chatMessageSchema),
  has_next: z.boolean(),
});

// 채팅방 리스트 아이템 스키마
export const chatRoomItemSchema = z.object({
  id: z.number(),
  room_token: z.string(),
  user1_id: z.number(),
  user2_id: z.number(),
  product_id: z.number(),
  product_thumbnail_url: z.string().url(),
  product_title: z.string(),
  other_user_nick_name: z.string(),
  other_user_profile_url: z.string().url(),
  message_count: z.number(),
  latest_message: z.string(),
  created_at: z.string(),
});

// 채팅방 리스트 응답 스키마
export const chatRoomListResponseSchema = z.array(chatRoomItemSchema);

// 가장 최신 채팅 1개 조회 응답 스키마
export const recentChatMessageResponseSchema = z.object({
  messages: z.array(chatMessageSchema),
  has_next: z.boolean(),
});
