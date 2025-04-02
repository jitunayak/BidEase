import { User } from "@/src/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phone: string
  ) => Promise<void>;
  logout: () => void;
  verifyAccount: (otp: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          // In a real app, this would be an API call
          // Simulating API response
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock successful login
          const mockUser: User = {
            id: "1",
            name: "John Doe",
            email: email,
            phone: "+1234567890",
            isVerified: true,
            role: "buyer",
            createdAt: new Date().toISOString(),
            kycVerified: true,
          };

          set({
            user: mockUser,
            token: "mock-jwt-token",
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error("Login error:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (name, email, password, phone) => {
        set({ isLoading: true });
        try {
          // Simulating API response
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock successful registration
          const mockUser: User = {
            id: "1",
            name,
            email,
            phone,
            isVerified: false,
            role: "buyer",
            createdAt: new Date().toISOString(),
            kycVerified: false,
          };

          set({
            user: mockUser,
            token: "mock-jwt-token",
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error("Registration error:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      verifyAccount: async (otp) => {
        set({ isLoading: true });
        try {
          // Simulating API response
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Update user verification status
          set((state) => ({
            user: state.user ? { ...state.user, isVerified: true } : null,
            isLoading: false,
          }));
        } catch (error) {
          console.error("Verification error:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      updateProfile: async (userData) => {
        set({ isLoading: true });
        try {
          // Simulating API response
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Update user data
          set((state) => ({
            user: state.user ? { ...state.user, ...userData } : null,
            isLoading: false,
          }));
        } catch (error) {
          console.error("Profile update error:", error);
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
