import React from "react";
import { Text, View } from "react-native";
import { App } from "../Constant";
import { uiStyles } from "../Theme";

export default function Banner() {
  return (
    <View style={[uiStyles.shadow, { borderRadius: 16, position: "relative" }]}>
      <View
        style={{
          width: "100%",
          height: 200,
          borderRadius: App.ui.borderRadius.lg,
          position: "absolute",
          backgroundColor: App.colors.success,
        }}
        // source={require("../../assets/images/asset1.png")}
      />

      <View
        style={{
          width: "100%",
          height: 200,
          zIndex: 1,
          backgroundColor: "black",
          opacity: 0.2,
          borderRadius: App.ui.borderRadius.lg,
          // backgroundImage:
          //   "linear-gradient(to bottom,rgb(255, 109, 109), rgba(80, 112, 218, 0.1))",
        }}
      />

      <View
        style={{
          padding: 16,
          gap: 8,
          top: 70,
          position: "absolute",
          zIndex: 2,
        }}
      >
        <Text style={{ fontSize: 16, color: "white" }}>Featured auction</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
          Premium Car Collection
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <View
            style={{
              borderRadius: App.ui.borderRadius.lg,
              backgroundColor: "white",
              opacity: 0.6,
            }}
          >
            <Text
              style={{
                color: "black",
                padding: 8,
              }}
            >
              EMD: ₹50,000
            </Text>
          </View>
          <View
            style={{
              borderRadius: App.ui.borderRadius.lg,
              backgroundColor: "white",
              opacity: 0.6,
            }}
          >
            <Text
              style={{
                color: "black",
                padding: 8,
              }}
            >
              Starts in 2 days
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
