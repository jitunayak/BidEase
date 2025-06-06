export type UserRole = "buyer" | "admin" | "bank";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  role: UserRole;
  profileImage?: string;
  createdAt: string;
  kycVerified: boolean;
}

export type AssetCategory = "gold" | "vehicle" | "house" | "apartment" | "car";

export interface Asset {
  id: string;
  title: string;
  description: string;
  category: AssetCategory;
  images: string[];
  basePrice: number;
  currentBid: number;
  incrementAmount: number;
  bankId: string;
  bankName: string;
  location: string;
  startTime: string;
  endTime: string;
  status: "upcoming" | "live" | "ended";
  featured: boolean;
  viewCount: number;
  bidCount: number;
  startingBid: number;
}

export interface Wishlist {
  id: number;
  createdAt: string;
  auction: Asset;
}

export interface Bid {
  id: string;
  assetId: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: string;
  status: "active" | "winning" | "outbid" | "lost";
}

export interface BankInfo {
  id: string;
  name: string;
  logo: string;
  description: string;
  assetsCount: number;
  verified: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "bank" | "wallet";
  name: string;
  last4?: string;
  expiryDate?: string;
  isDefault: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "bid" | "auction" | "payment" | "system";
  relatedId?: string;
}
