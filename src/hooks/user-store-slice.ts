import { StateCreator } from "zustand";
import { User } from "../gql/generated";

interface IAuthState {
  user: User | null;
}

interface IAuthAction {
  setUser: (user: User | null) => void;
}

export interface IAuthStore extends IAuthState, IAuthAction {}

export const createAuthSlice: StateCreator<
  IAuthStore,
  [["zustand/immer", never]],
  [],
  IAuthStore
> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});
