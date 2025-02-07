import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../Constant";
import Title from "./Title";

export default function AssetCard() {
  return (
    <View
      style={{
        gap: 8,
        width: 300,
        borderWidth: 0.6,
        borderColor: Colors.border,
        borderRadius: 16,
        marginRight: 8,
        backgroundColor: Colors.background,
      }}
    >
      <Image
        source={require("../../assets/images/asset1.png")}
        style={{
          width: 300,
          height: 160,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />
      <View style={{ padding: 8, gap: 8 }}>
        <Title value="Mercedes Benz AMG" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: Colors.secondary }}>Current Bid</Text>
            <Text
              style={{ color: Colors.primary, fontWeight: "700", fontSize: 20 }}
            >
              ₹32,50,000
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 8 }}>
            <Octicons name="clock" size={18} color={Colors.error} />
            <Text style={{ color: Colors.error }}>1hr 30m</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: Colors.background,
              fontSize: 16,
              alignSelf: "center",
            }}
          >
            Place Bid
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
