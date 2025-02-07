import { Colors } from "@/src/Constant";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

export default function OtpScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, color: Colors.text, marginTop: 30 }}>
        Verification Screen
      </Text>
      <OtpInput
        numberOfDigits={4}
        focusColor={Colors.primary}
        onTextChange={(text) => console.log(text)}
        theme={{
          containerStyle: {
            width: "auto",
            gap: 16,
          },
          pinCodeContainerStyle: {
            borderRadius: 8,
            padding: 8,
          },
        }}
      />
      <TouchableOpacity>
        <Text style={{ color: Colors.primary }}>Resend OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
          padding: 16,
          borderRadius: 8,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        onPress={() => {
          router.push("/(tabs)");
        }}
      >
        <Text style={{ color: Colors.background }}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
    gap: 16,
  },
});
