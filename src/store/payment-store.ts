import { mockPaymentMethods } from "@/src/mocks/payments";
import { PaymentMethod } from "@/src/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PaymentState {
  paymentMethods: PaymentMethod[];
  isLoading: boolean;

  fetchPaymentMethods: () => Promise<void>;
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => Promise<void>;
  removePaymentMethod: (id: string) => Promise<void>;
  setDefaultPaymentMethod: (id: string) => Promise<void>;
  processPayment: (
    amount: number,
    paymentMethodId: string,
    description: string
  ) => Promise<boolean>;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      paymentMethods: [],
      isLoading: false,

      fetchPaymentMethods: async () => {
        set({ isLoading: true });
        try {
          // Simulating API call
          await new Promise((resolve) => setTimeout(resolve, 800));

          set({
            paymentMethods: mockPaymentMethods,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching payment methods:", error);
          set({ isLoading: false });
        }
      },

      addPaymentMethod: async (method) => {
        set({ isLoading: true });
        try {
          // Simulating API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const newMethod: PaymentMethod = {
            ...method,
            id: Date.now().toString(),
          };

          set((state) => ({
            paymentMethods: [...state.paymentMethods, newMethod],
            isLoading: false,
          }));
        } catch (error) {
          console.error("Error adding payment method:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      removePaymentMethod: async (id) => {
        set({ isLoading: true });
        try {
          // Simulating API call
          await new Promise((resolve) => setTimeout(resolve, 800));

          set((state) => ({
            paymentMethods: state.paymentMethods.filter(
              (method) => method.id !== id
            ),
            isLoading: false,
          }));
        } catch (error) {
          console.error("Error removing payment method:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      setDefaultPaymentMethod: async (id) => {
        set({ isLoading: true });
        try {
          // Simulating API call
          await new Promise((resolve) => setTimeout(resolve, 800));

          set((state) => ({
            paymentMethods: state.paymentMethods.map((method) => ({
              ...method,
              isDefault: method.id === id,
            })),
            isLoading: false,
          }));
        } catch (error) {
          console.error("Error setting default payment method:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      processPayment: async (amount, paymentMethodId, description) => {
        set({ isLoading: true });
        try {
          // Simulating API call
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // Simulate successful payment
          set({ isLoading: false });
          return true;
        } catch (error) {
          console.error("Error processing payment:", error);
          set({ isLoading: false });
          return false;
        }
      },
    }),
    {
      name: "payment-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        paymentMethods: state.paymentMethods,
      }),
    }
  )
);
