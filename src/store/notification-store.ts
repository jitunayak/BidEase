import { Notification } from "@/src/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "../lib/http-client";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;

  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      isLoading: false,

      fetchNotifications: async () => {
        set({ isLoading: true });
        try {
          const response = await httpClient.get("/api/notifications");

          set({
            notifications: response.data,
            unreadCount: response.data.filter((n: Notification) => !n.read)
              .length,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching notifications:", error);
          set({ isLoading: false });
        }
      },

      markAsRead: (id: string) => {
        set((state) => {
          const updatedNotifications = state.notifications.map((notification) =>
            notification.id === id
              ? { ...notification, read: true }
              : notification
          );

          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter((n) => !n.read).length,
          };
        });
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            read: true,
          })),
          unreadCount: 0,
        }));
      },

      deleteNotification: (id: string) => {
        set((state) => {
          const updatedNotifications = state.notifications.filter(
            (notification) => notification.id !== id
          );

          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter((n) => !n.read).length,
          };
        });
      },

      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
      },
    }),
    {
      name: "notification-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
