import React from "react";
import { Text, TextStyle } from "react-native";
import { Colors } from "../Constant";

export function EText({
  style,
  children,
  variant,
}: {
  style?: TextStyle;
  children?: React.ReactNode;
  variant?:
    | "title"
    | "subtitle"
    | "body"
    | "medium"
    | "label"
    | "link"
    | "error";
}) {
  const getFontSize = () => {
    switch (variant) {
      case "title":
        return 24;
      case "subtitle":
        return 20;
      case "medium":
        return 18;
      case "link":
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
        return Colors.text;
      case "subtitle":
        return Colors.text;
      case "body":
        return Colors.text;
      case "label":
        return Colors.secondary;
      case "link":
        return Colors.link;
      case "error":
        return Colors.error;
      default:
        return Colors.text;
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
