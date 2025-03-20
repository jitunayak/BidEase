import { Colors } from "@/src/Constant";
import { useOTPScreen } from "@/src/hooks/componentHooks/useOtpScreen";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";

const OTP_LENGTH = 4;
export default function OtpScreen() {
  const {
    handleOtpVerification,
    data,
    error,
    loading,
    setOtp,
    otp,
    phoneNumber,
  } = useOTPScreen();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, color: Colors.text, marginTop: 30 }}>
        {OTP_LENGTH} digit verification code sent to xxxxxx
        {phoneNumber?.substring(6, 10)}
      </Text>
      <OtpInput
        numberOfDigits={OTP_LENGTH}
        focusColor={Colors.primary}
        onTextChange={(text) => {
          setOtp(text);
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
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
        }}
        disabled={otp.length !== OTP_LENGTH}
        onPress={() => {
          handleOtpVerification();
        }}
      >
        {loading && (
          <ActivityIndicator size="small" color={Colors.background} />
        )}
        <Text style={{ color: Colors.background }}>
          {error ? "Error" : "Verify"}
        </Text>
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
