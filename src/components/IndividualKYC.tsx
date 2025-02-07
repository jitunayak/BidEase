import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Text, View } from "react-native";
import { Colors } from "../Constanst";

export default function IndividualKYC() {
  return (
    <View
      style={{
        width: "100%",
        gap: 8,
        padding: 8,
      }}
    >
      <Text
        style={{
          color: Colors.text,
          fontSize: 20,
          marginBottom: 8,
          fontWeight: "500",
          marginTop: 14,
        }}
      >
        Individual e-KYC
      </Text>

      {/* Aadhar Card */}
      <View
        style={{
          padding: 14,
          inset: 0,
          borderWidth: 0.6,
          borderRadius: 8,
          width: "100%",
          borderColor: Colors.border,
          gap: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Octicons name="id-badge" size={20} color={Colors.primary} />
            <Text style={{ color: Colors.text }}>Aadhar Card</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Octicons
              name="check-circle-fill"
              size={20}
              color={Colors.success}
            />
            <Text style={{ color: Colors.success }}>Verified</Text>
          </View>
        </View>
        <Text style={{ color: Colors.secondary }}>XXXX-XXXX-1234</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Octicons name="upload" size={20} color={Colors.primary} />
          <Text style={{ color: Colors.primary }}>Upload Document</Text>
        </View>
      </View>

      {/* PAN Verification */}
      <View
        style={{
          padding: 14,
          inset: 0,
          borderWidth: 0.6,
          borderRadius: 8,
          width: "100%",
          borderColor: Colors.border,
          gap: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Octicons name="file" size={20} color={Colors.primary} />
            <Text style={{ color: Colors.text }}>PAN Card</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Octicons name="clock" size={20} color={Colors.pending} />
            <Text style={{ color: Colors.pending }}>Pending</Text>
          </View>
        </View>
        <Text style={{ color: Colors.secondary }}>ABCDE124F</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Octicons name="upload" size={20} color={Colors.primary} />
          <Text style={{ color: Colors.primary }}>Upload Document</Text>
        </View>
      </View>
    </View>
  );
}
