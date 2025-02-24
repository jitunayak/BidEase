import { Colors } from "@/src/Constant";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

const OTP_LENGTH = 4;
export default function OtpScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, color: Colors.text, marginTop: 30 }}>
        Verification Screen
      </Text>
      <OtpInput
        numberOfDigits={OTP_LENGTH}
        focusColor={Colors.primary}
        onTextChange={(text) => {
          setOtp(text);
          if (text.length === OTP_LENGTH) {
            router.navigate("/(app)/(tabs)");
          }
        }}
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
          backgroundColor:
            otp.length === OTP_LENGTH ? Colors.primary : Colors.border,
          padding: 16,
          borderRadius: 8,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        disabled={otp.length !== OTP_LENGTH}
        onPress={() => {
          router.navigate("/(app)/(tabs)");
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
    backgroundColor: Colors.background,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
    gap: 16,
  },
});
