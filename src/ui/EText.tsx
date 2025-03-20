import * as AppleColors from "@bacons/apple-colors";
import React from "react";
import { Text, TextStyle } from "react-native";

export function EText({
  style,
  children,
  variant,
}: {
  style?: TextStyle;
  children?: React.ReactNode;
  variant?: "title" | "subtitle" | "body" | "label" | "link" | "error";
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

  const textColor = () => {
    switch (variant) {
      case "title":
        return AppleColors.label;
      case "subtitle":
        return AppleColors.secondaryLabel;
      case "body":
        return AppleColors.label;
      case "label":
        return AppleColors.secondaryLabel;
      case "link":
        return AppleColors.systemBlue;
      case "error":
        return AppleColors.systemRed;
      default:
        return AppleColors.label;
    }
  };
  return (
    <Text
      style={{
        fontSize: getFontSize(),
        fontWeight: variant === "title" ? "500" : "400",
        color: textColor(),
        ...style,
      }}
    >
      {children}
    </Text>
  );
}
