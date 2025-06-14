import { create } from 'zustand';

interface UnreadRoomInfo {
  count: number;
  lastMessage: string;
  lastTime: string;
}

interface UnreadState {
  perRoom: Record<string, UnreadRoomInfo>;
  totalUnread: number;
  setPerRoom: (perRoom: Record<string, UnreadRoomInfo>) => void;
  setRoomUnread: (roomToken: string, info: UnreadRoomInfo) => void;
  clear: () => void;
}

export const useUnreadStore = create<UnreadState>((set) => ({
  perRoom: {},
  totalUnread: 0,
  setPerRoom: (perRoom) =>
    set(() => ({
      perRoom,
      totalUnread: Object.values(perRoom).reduce(
        (sum, v) => sum + (v?.count || 0),
        0
      ),
    })),
  setRoomUnread: (roomToken, info) =>
    set((state) => {
      const newPerRoom = { ...state.perRoom, [roomToken]: info };
      return {
        perRoom: newPerRoom,
        totalUnread: Object.values(newPerRoom).reduce(
          (sum, v) => sum + (v?.count || 0),
          0
        ),
      };
    }),
  clear: () => set({ perRoom: {}, totalUnread: 0 }),
}));
