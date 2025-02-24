import React from "react";
import { Text, TextStyle } from "react-native";

export function EText({
  style,
  children,
  variant,
}: {
  style?: TextStyle;
  children?: React.ReactNode;
  variant?: "title" | "subtitle" | "body" | "label";
}) {
  const getFontSize = () => {
    switch (variant) {
      case "title":
        return 20;
      case "subtitle":
        return 16;
      case "body":
        return 14;
      case "label":
        return 12;
      default:
        return 14;
    }
  };

  return (
    <Text
      style={{
        fontSize: getFontSize(),
        fontWeight: variant === "title" ? "500" : "400",
        ...style,
      }}
    >
      {children}
    </Text>
  );
}
