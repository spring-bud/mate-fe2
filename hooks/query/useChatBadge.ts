import useUnreadChatCount from './useUnreadChatCount';
import useChatRoomList from './useChatRoomList';

/**
 * 새 채팅 메시지가 있는지 여부를 반환하는 훅
 * - perRoom에 unread count가 1개 이상인 방이 있으면 true
 * - perRoom이 비어있고 roomList가 있으면 roomList의 message_count가 1개 이상인 방이 있으면 true
 */
const useChatBadge = () => {
  const { perRoom } = useUnreadChatCount();
  const { data: roomList } = useChatRoomList();

  if (Object.keys(perRoom).length > 0) {
    return Object.values(perRoom).some((v) => v?.count > 0);
  }
  if (roomList) {
    return roomList.some((room) => room.message_count > 0);
  }
  return false;
};

export default useChatBadge;
