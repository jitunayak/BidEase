import { MMKV } from "react-native-mmkv";

const store = new MMKV();

export type StorageKeys =
  | "user.phone_number"
  | "user.token"
  | "notification.app"
  | "notification.email"
  | "notification.sms";

const set = (key: StorageKeys, value: string | boolean) => {
  store.set(key, value);
};

const get = (key: StorageKeys) => {
  return store.getString(key);
};

const getBoolean = (key: StorageKeys) => {
  return store.getBoolean(key);
};

const remove = (key: StorageKeys) => {
  store.delete(key);
};

export const storage = { set, get, remove, getBoolean };