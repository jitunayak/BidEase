import { PaymentMethod } from "@/src/types";

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    name: "Visa ending in 4242",
    last4: "4242",
    expiryDate: "04/25",
    isDefault: true,
  },
  {
    id: "2",
    type: "bank",
    name: "Chase Checking Account",
    last4: "9876",
    isDefault: false,
  },
  {
    id: "3",
    type: "wallet",
    name: "Digital Wallet",
    isDefault: false,
  },
];
