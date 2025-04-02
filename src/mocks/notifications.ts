import { Notification } from "@/src/types";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Outbid Alert",
    message:
      "You've been outbid on 'Gold Bullion - 24K Pure Gold Bar'. Current highest bid is $5,200.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    type: "bid",
    relatedId: "1",
  },
  {
    id: "2",
    title: "Auction Ending Soon",
    message:
      "'Vintage Gold Coin Collection' auction ends in 24 hours. Don't miss your chance to bid!",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: false,
    type: "auction",
    relatedId: "5",
  },
  {
    id: "3",
    title: "Payment Successful",
    message:
      "Your payment of $36,500 for 'Luxury Sedan - 2020 Mercedes-Benz E-Class' has been processed successfully.",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true,
    type: "payment",
    relatedId: "2",
  },
  {
    id: "4",
    title: "Account Verified",
    message:
      "Congratulations! Your account has been successfully verified. You now have full access to all auction features.",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    read: true,
    type: "system",
  },
  {
    id: "5",
    title: "New Auction Alert",
    message:
      "A new property has been listed: 'Downtown Luxury Apartment'. Bidding starts in 2 days.",
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    read: true,
    type: "auction",
    relatedId: "7",
  },
];
