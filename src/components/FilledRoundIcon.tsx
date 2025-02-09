import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../Constant";

export default function FilledRoundIcon({
  icon,
  title,
  color,
  onPress = () => {},
}: {
  icon: React.ReactNode;
  title?: string;
  color?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
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
            backgroundColor: color ?? Colors.primary,
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
    </TouchableOpacity>
  );
}
