import { StateCreator } from "zustand";

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  image?: string;
}

interface IAuthState {
  user: IUser | null;
}

interface IAuthAction {
  setUser: (user: IUser) => void;
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
