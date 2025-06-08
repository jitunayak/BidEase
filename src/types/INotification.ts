export interface INotification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  link: string;
  type:
    | "promotional"
    | "transactional"
    | "reminder"
    | "successful"
    | "failed"
    | "general"
    | "bid";
  action: string;
}
