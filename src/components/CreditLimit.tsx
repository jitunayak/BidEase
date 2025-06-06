import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Text, View } from "react-native";
import { App, Colors } from "../Constant";
import { Button } from "../ui";

export const CreditLimit = () => {
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
          borderRadius: App.ui.borderRadius.sm,
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
        <Button size="md" variant="primary" title="Request limit increase" />
      </View>
    </View>
  );
};
