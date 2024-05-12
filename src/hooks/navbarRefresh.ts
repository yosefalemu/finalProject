import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  state: boolean;
  changeState: () => void;
};

export const useNavbarRefresh = create<UserState>()(
  persist(
    (set, get) => ({
      state: false,
      changeState: () => {
        set({ state: !get().state });
      },
    }),
    {
      name: "refresh-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
