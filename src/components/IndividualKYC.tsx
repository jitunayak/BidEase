import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Text, View } from "react-native";
import { Colors } from "../Constant";
import { User } from "../gql/graphql";

const VerificationStatus = ({ isVerified }: { isVerified: boolean }) => (
  <View style={{ flexDirection: "row", gap: 8 }}>
    <Octicons
      name={isVerified ? "check-circle-fill" : "clock"}
      size={20}
      color={isVerified ? Colors.success : Colors.pending}
    />
    <Text style={{ color: isVerified ? Colors.success : Colors.pending }}>
      {isVerified ? "Verified" : "Pending"}
    </Text>
  </View>
);

export const IndividualKYC = ({ user }: { user: User }) => {
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
          <VerificationStatus isVerified={!!user?.kyc.isAadharVerified} />
        </View>
        <Text style={{ color: Colors.secondary }}>
          {user?.kyc.aadharNumber}
        </Text>
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
          <VerificationStatus isVerified={!!user?.kyc.isPanVerified} />
        </View>
        <Text style={{ color: Colors.secondary }}>{user?.kyc.panNumber}</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Octicons name="upload" size={20} color={Colors.primary} />
          <Text style={{ color: Colors.primary }}>Upload Document</Text>
        </View>
      </View>
    </View>
  );
};