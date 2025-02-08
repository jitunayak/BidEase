import { MMKV } from "react-native-mmkv";

const store = new MMKV();

export type StorageKeys = "user.phone_number" | "user.token";

const set = (key: StorageKeys, value: string) => {
  store.set(key, value);
};

const get = (key: StorageKeys) => {
  return store.getString(key);
};

const remove = (key: StorageKeys) => {
  store.delete(key);
};

export const storage = { set, get, remove };