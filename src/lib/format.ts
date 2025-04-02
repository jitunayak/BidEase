export const sanitizePhoneNumber = (number: string) =>
  number
    .replace(/-|[^0-9]/g, "")
    .trim()
    .substring(0, 10);

export const formatPhoneNumber = (number: string) => {
  if (number.length > 6) {
    return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6, 10)}`;
  } else if (number.length > 3) {
    return `${number.slice(0, 3)}-${number.slice(3, 6)}`;
  } else {
    return number;
  }
};


 export const cleanedInput = (text: string, limit: number) =>
   text.replace(/\s/g, "").trim().substring(0, limit);


 export const formatCurrency = (amount: number): string => {
   return new Intl.NumberFormat("en-IN", {
     style: "currency",
     currency: "INR",
     minimumFractionDigits: 0,
     maximumFractionDigits: 0,
   }).format(amount);
 };

 export const formatTimeLeft = (date: Date): string => {
   const now = new Date();
   const diffMs = date.getTime() - now.getTime();

   // If the date is in the past
   if (diffMs < 0) return "Ended";

   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
   const diffHours = Math.floor(
     (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
   );
   const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

   if (diffDays > 0) {
     return `in ${diffDays}d ${diffHours}h`;
   } else if (diffHours > 0) {
     return `in ${diffHours}h ${diffMinutes}m`;
   } else {
     return `in ${diffMinutes}m`;
   }
 };

 export const formatRelativeTime = (date: Date): string => {
   const now = new Date();
   const diffMs = now.getTime() - date.getTime();

   const diffSeconds = Math.floor(diffMs / 1000);
   const diffMinutes = Math.floor(diffSeconds / 60);
   const diffHours = Math.floor(diffMinutes / 60);
   const diffDays = Math.floor(diffHours / 24);

   if (diffSeconds < 60) {
     return "just now";
   } else if (diffMinutes < 60) {
     return `${diffMinutes}m ago`;
   } else if (diffHours < 24) {
     return `${diffHours}h ago`;
   } else if (diffDays < 7) {
     return `${diffDays}d ago`;
   } else {
     return date.toLocaleDateString("en-US", {
       month: "short",
       day: "numeric",
     });
   }
 };

 export const formatDate = (date: Date): string => {
   return date.toLocaleDateString("en-US", {
     month: "long",
     day: "numeric",
     year: "numeric",
   });
 };

 export const formatTime = (date: Date): string => {
   return date.toLocaleTimeString("en-US", {
     hour: "2-digit",
     minute: "2-digit",
   });
 };