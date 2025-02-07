import CreditLimit from "@/src/components/CreditLimit";
import IndividualKYC from "@/src/components/IndividualKYC";
import PersonalInfo from "@/src/components/PersonalInfo";
import { Colors } from "@/src/Constanst";
import React from "react";
import { ScrollView, View } from "react-native";

export default function profile() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: Colors.background }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          padding: 8,
          backgroundColor: Colors.background,
          gap: 8,
        }}
      >
        <PersonalInfo />
        <IndividualKYC />
        <CreditLimit />
      </View>
    </ScrollView>
  );
}
