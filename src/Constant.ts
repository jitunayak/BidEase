import { Platform } from "react-native";
export const Colors = {
  primary: "#0052CC",
  secondary: "#757575",
  border: "#ccc",
  background: "#ffffff",
  text: "#0f0f0f",
  error: "#ff0000",
  success: "#22C55E",
  pending: "#fbbf24",
  link: "#007aff",
};

export const App = {
  isAndroid: Platform.OS === "android",
  isIOS: Platform.OS === "ios",
  colors: {
    primary: "#0052CC",
    secondary: "#757575",
    border: "#E5E7EB",
    // background: "#ffffff",
    // text: "#0f0f0f",
    error: "#ff0000",
    // success: "#22C55E",
    pending: "#fbbf24",
    link: "#007aff",
    secondaryBackground: "#F9FAFB",

    // App color palette
    // primary: "#0066CC", // Primary blue
    // secondary: "#4D96FF", // Secondary blue
    accent: "#FFB830", // Accent gold for highlighting
    success: "#34C759", // Success green
    danger: "#FF3B30", // Error/danger red
    warning: "#FF9500", // Warning orange

    // Neutrals
    background: "#F8F9FA",
    card: "#FFFFFF",
    text: "#1C1C1E",
    textSecondary: "#6E6E73",
    textTertiary: "#8E8E93",
    // border: "#E5E5EA",
    borderLight: "#F2F2F7",

    // Status colors
    bidActive: "#34C759",
    bidEnded: "#8E8E93",
    verified: "#5AC8FA",

    // Category colors
    gold: "#FFD700",
    vehicle: "#5856D6",
    property: "#FF2D55",
    gradients: {
      primary: ["#0066CC", "#4D96FF"],
      gold: ["#FF8C00", "#FFD700"],
      property: ["#FF2D55", "#FF4D6B", "#FF6B7A"],
      vehicle: ["#7B61FF", "#5E5CE6"],
    },
  },
  typography: {
    largeTitle: 34,
    title1: 28,
    title2: 22,
    title3: 20,
    headline: 17,
    body: 17,
    callout: 16,
    subhead: 15,
    footnote: 13,
    caption1: 12,
    caption2: 11,
  },
  ui: {
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
    },
    padding: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 32,
    },
  },
};

// // iOS-inspired color palette
// export const colors = {
//   // Primary colors
//   primary: '#007AFF', // iOS blue
//   secondary: '#5AC8FA', // iOS light blue

//   // Neutral colors
//   background: '#F2F2F7', // iOS light background
//   card: '#FFFFFF',
//   text: '#000000',
//   secondaryText: '#8E8E93',
//   border: '#C6C6C8',

//   // Semantic colors
//   success: '#34C759', // iOS green
//   warning: '#FF9500', // iOS orange
//   error: '#FF3B30', // iOS red
//   info: '#5856D6', // iOS purple

//   // Utility colors
//   divider: 'rgba(60, 60, 67, 0.1)',
//   overlay: 'rgba(0, 0, 0, 0.4)',
//   highlight: 'rgba(0, 122, 255, 0.1)',
// };
