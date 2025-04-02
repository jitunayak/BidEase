import React from "react";
import { StyleSheet, View } from "react-native";
import { App } from "../Constant";

interface DividerProps {
  direction?: "horizontal" | "vertical";
  thickness?: number;
  color?: string;
  style?: any;
}

export function Divider({
  direction = "horizontal",
  thickness = 1,
  color = App.colors.border,
  style,
}: DividerProps) {
  return (
    <View
      style={[
        direction === "horizontal" ? styles.horizontal : styles.vertical,
        { backgroundColor: color },
        direction === "horizontal"
          ? { height: thickness }
          : { width: thickness },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    width: "100%",
    marginVertical: 8,
  },
  vertical: {
    height: "100%",
    marginHorizontal: 8,
  },
});
