import { Colors } from "@/src/Constant";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Text, View } from "react-native";

export default function notifications() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Octicons name="bell" size={48} color={Colors.pending} />
      <Text>Nothing missed!</Text>
    </View>
  );
}
