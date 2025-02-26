import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Colors } from "../Constant";

export default function Link({
  value,
  onPress,
}: {
  value: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ fontSize: 16, color: Colors.primary }}>{value}</Text>
    </TouchableOpacity>
  );
}
