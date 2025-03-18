import React from "react";
import { Text, TextStyle } from "react-native";

export const Title = ({
  value,
  style,
}: {
  value: string;
  style?: TextStyle;
}) => {
  return (
    <Text style={{ fontSize: 20, fontWeight: "500", ...style }}>{value}</Text>
  );
};
