import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Colors } from "../Constant";

export default function Link({ value }: { value: string }) {
  return (
    <TouchableOpacity>
      <Text style={{ fontSize: 16, color: Colors.primary }}>{value}</Text>
    </TouchableOpacity>
  );
}
