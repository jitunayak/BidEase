import React from "react";
import { Text, View } from "react-native";
import { Colors } from "../Constant";

export default function FilledRoundIcon({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title?: string;
}) {
  return (
    <View
      style={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.primary,
            opacity: 0.1,
            position: "absolute",
            zIndex: 1,
            padding: 16,
            borderRadius: 50,
            width: 50,
            height: 50,
          }}
        />
        {icon}
      </View>
      <Text style={{ zIndex: 2 }}>{title}</Text>
    </View>
  );
}
