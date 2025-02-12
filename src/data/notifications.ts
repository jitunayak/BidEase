import { INotification } from "../types/INotification";

export const notifications: INotification[] = [
  {
    id: "1",
    title: "Auction ending soon",
    description:
      "Your auction 'Mercedes Benz AMG' is ending soon. Place your bid now!",
    date: "2025-03-02",
    read: false,
    link: "/notifications/1",
    type: "reminder",
    action: "Bid now",
  },
  {
    id: "2",
    title: "Auction ended!",
    description: "Your auction 'Mercedes Benz AMG' has ended.",
    date: "2025-03-02",
    read: false,
    link: "/notifications/2",
    type: "general",
    action: "View",
  },
  {
    id: "3",
    title: "New Deals Available",
    description:
      "New deals are available on your favorite products. Check them out now!",
    date: "2025-03-02",
    read: true,
    link: "/notifications/3",
    type: "promotional",
    action: "See deals",
  },
  {
    id: "4",
    title: "$23,000,00 deposited",
    description: "Your recent transaction of $23,000,00 was successful.",
    date: "2025-03-02",
    read: true,
    link: "/notifications/4",
    type: "transactional",
    action: "View transaction",
  },
  {
    id: "5",
    title: "Auction successful",
    description:
      "Congratulations, you have won the auction 'Mercedes Benz AMG'!",
    date: "2025-03-02",
    read: true,
    link: "/notifications/5",
    type: "successful",
    action: "View",
  },
];
