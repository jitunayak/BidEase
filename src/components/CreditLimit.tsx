import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../Constant";

export default function CreditLimit() {
  return (
    <View style={{ width: "100%", gap: 14, padding: 8, marginTop: 14 }}>
      <Text style={{ color: Colors.text, fontSize: 20, fontWeight: "500" }}>
        Credit Limit
      </Text>
      <View
        style={{
          padding: 14,
          inset: 0,
          borderWidth: 0.6,
          borderRadius: 8,
          width: "100%",
          borderColor: Colors.border,
          gap: 14,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={{ color: Colors.secondary, fontSize: 14 }}>
              Current Credit Limit
            </Text>
            <Text
              style={{
                color: Colors.text,
                fontSize: 32,
                fontWeight: "500",
              }}
            >
              ₹ 10,00,000
            </Text>
          </View>
          <Octicons name="credit-card" size={32} color={Colors.primary} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <Text style={{ color: Colors.secondary, fontSize: 14 }}>
              Available
            </Text>
            <Text style={{ color: Colors.secondary, fontSize: 14 }}>
              ₹10000
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <Text style={{ color: Colors.secondary, fontSize: 14 }}>Used</Text>
            <Text style={{ color: Colors.secondary, fontSize: 14 }}>₹5000</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            padding: 14,
            borderRadius: 8,
            width: "auto",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Text style={{ color: Colors.background, fontSize: 14 }}>
            Request limit increase
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
