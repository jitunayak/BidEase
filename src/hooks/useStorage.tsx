import { create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { zustandStorage } from "./mmkv-storage";
import { createAuthSlice, IAuthStore } from "./user-store-slice";

type Store = IAuthStore;

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...createAuthSlice(...a),
        }))
      ),
      {
        name: "bid-ease-storage",
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
);
