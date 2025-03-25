import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { App, Colors } from "../Constant";
import { RNUtils } from "../lib/rn-utils";
import { EText } from "./EText";

type IProps = {
  onPress?: () => void;
  title?: string;
  variant?: "primary" | "secondary" | "light";
  disabled?: boolean;
  style?: TouchableOpacityProps["style"];
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  fullWidth?: boolean;
};

export function Button(props: IProps) {
  const variant = props.variant ?? "primary";

  const getBackgroundColor = () => {
    if (props.disabled) {
      return App.colors.border;
    }
    switch (variant) {
      case "primary":
        return Colors.primary;
      case "secondary":
        return RNUtils.getLighterColor(Colors.border, 40);
      case "light":
        return RNUtils.getLighterColor(Colors.primary, 10);
      default:
        return Colors.primary;
    }
  };

  const getTextColor = () => {
    if (props.disabled) {
      return Colors.text;
    }
    switch (variant) {
      case "primary":
        return "white";
      case "secondary":
        return Colors.secondary;
      case "light":
        return Colors.primary;
      default:
        return "white";
    }
  };
  return (
    <TouchableOpacity
      style={{
        padding: 12,
        borderRadius: App.ui.borderRadius.sm,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
        flex: 1,
        borderWidth: 2,
        borderColor: "transparent",
        maxHeight: 50,
        width: props.fullWidth ? "100%" : "auto",
        opacity: props.disabled ? 0.8 : 1,
        backgroundColor: getBackgroundColor(),
        ...(props.style && (props.style as object)),
        // ...(props.variant === "light" && {
        //   borderWidth: 2,
        //   borderColor: Colors.primary,
        // }),
      }}
      onPress={() => {
        RNUtils.giveHapticFeedback();
        if (props.disabled || props.isLoading) return;
        props.onPress && props.onPress();
      }}
    >
      <View>{props.leftIcon}</View>
      {props.isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <EText
          variant="body"
          style={{ color: getTextColor(), fontWeight: "600" }}
        >
          {props.title || props.children}
        </EText>
      )}
      <View>{props.rightIcon}</View>
    </TouchableOpacity>
  );
}
