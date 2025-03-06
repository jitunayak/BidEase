import * as Haptics from "expo-haptics";
import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Colors } from "../Constant";

type IProps = {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  style?: TouchableOpacityProps["style"];
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function Button(props: IProps) {
  return (
    <TouchableOpacity
      style={{
        padding: 16,
        borderRadius: 8,
        width: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
        opacity: props.disabled ? 0.8 : 1,
        backgroundColor:
          props.variant === "primary" ? Colors.primary : Colors.border,
        ...(props.style && props.style),
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (props.disabled || props.isLoading) return;
        props.onPress();
      }}
    >
      <View>{props.leftIcon}</View>
      {props.isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={{ color: "white", fontWeight: "500" }}>
          {props.title ?? "Press me"}
        </Text>
      )}
      <View>{props.rightIcon}</View>
    </TouchableOpacity>
  );
}
