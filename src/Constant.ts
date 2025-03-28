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
    background: "#ffffff",
    text: "#0f0f0f",
    error: "#ff0000",
    success: "#22C55E",
    pending: "#fbbf24",
    link: "#007aff",
    secondaryBackground: "#F9FAFB",
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
