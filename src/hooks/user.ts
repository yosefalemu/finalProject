import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  userId: string;
  addUserId: (id: string) => void;
  getUserId: () => string;
};

export const useUser = create<UserState>()(
  persist(
    (set, get) => ({
      userId: "",
      addUserId: (userId: string) => {
        set({ userId });
      },
      getUserId: () => {
        return get().userId;
      },
    }),
    {
      name: "logged-in-user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
