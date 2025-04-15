import { CURRENT_API_VERSION } from '../api-version/apiVersion';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authURL = {
  login: `${baseUrl}/oauth2/authorization/kakao`,
  reissue: `${CURRENT_API_VERSION}/auth/reissue`,
  logout: `${CURRENT_API_VERSION}/auth/logout`,
};

// 사용자 관련 API 엔드포인트
export const userURL = {
  info: (userId: string) => `${CURRENT_API_VERSION}/users/${userId}`,
  update: `${CURRENT_API_VERSION}/users`,
};

// 제안서 관련 API 엔드포인트
export const proposalURL = {
  list: `${CURRENT_API_VERSION}/proposals`,
  byId: (proposalId: string) =>
    `${CURRENT_API_VERSION}/proposals/${proposalId}`,
  create: `${CURRENT_API_VERSION}/proposals`,
  update: (proposalId: string) =>
    `${CURRENT_API_VERSION}/proposals/${proposalId}`,
  delete: (proposalId: string) =>
    `${CURRENT_API_VERSION}/proposals/${proposalId}`,
};

// 리뷰 관련 API 엔드포인트
export const reviewURL = {
  list: `${CURRENT_API_VERSION}/review`,
  byProductId: (productId: string) =>
    `${CURRENT_API_VERSION}/review/${productId}`,
  create: (productId: string) => `${CURRENT_API_VERSION}/review/${productId}`,
  update: (reviewId: string) => `${CURRENT_API_VERSION}/review/${reviewId}`,
  delete: (reviewId: string) => `${CURRENT_API_VERSION}/review/${reviewId}`,
};

// 상품 관련 API 엔드포인트
export const productURL = {
  byUserId: (userId: string) =>
    `${CURRENT_API_VERSION}/products/user/${userId}`,
  create: `${CURRENT_API_VERSION}/products`,
  detail: (productId: string) => `${CURRENT_API_VERSION}/products/${productId}`,
  delete: (productId: string) => `${CURRENT_API_VERSION}/products/${productId}`,
  like: (productId: string) =>
    `${CURRENT_API_VERSION}/products/like/${productId}`,
  likes: (productId: string) =>
    `${CURRENT_API_VERSION}/products/likes/${productId}`,
};

// 업로드 관련 API 엔드포인트
export const uploadURL = {
  images: `${CURRENT_API_VERSION}/uploads/images`,
};

// 채팅 관련 API 엔드포인트
export const chatURL = {
  createRoom: (productId: string) =>
    `${CURRENT_API_VERSION}/chat/create/room/${productId}`,
  sendMessage: `${CURRENT_API_VERSION}/chat/chat`,
  getMessages: `${CURRENT_API_VERSION}/chat/roomToken/messages`,
  getRecentMessages: `${CURRENT_API_VERSION}/chat/roomToken/messages/recent`,
  getRoomList: `${CURRENT_API_VERSION}/chat/chatRoomList`,
  sendGreeting: `${CURRENT_API_VERSION}/chat/greet`,
};

// 전체 URL 묶음 내보내기
export const URLs = {
  user: userURL,
  proposal: proposalURL,
  review: reviewURL,
  product: productURL,
  upload: uploadURL,
  chat: chatURL,
};

export default URLs;
