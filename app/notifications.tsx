import React from "react";
import { Text, View } from "react-native";

export default function notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "500" }}>No notifications</Text>
    </View>
  );
}
