import React from "react";
import { Text } from "react-native";

export default function Title({ value }: { value: string }) {
  return <Text style={{ fontSize: 20, fontWeight: "500" }}>{value}</Text>;
}
