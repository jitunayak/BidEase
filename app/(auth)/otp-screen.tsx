import { App, Colors } from "@/src/Constant";
import { useOTPScreen } from "@/src/hooks/componentHooks/useOtpScreen";
import { HStack } from "@/src/ui";
import React, { useRef } from "react";
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
    clearError,
  } = useOTPScreen();

  const otpRef = useRef<any>(null);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, color: Colors.text, marginTop: 30 }}>
        {OTP_LENGTH} digit verification code sent to xxxxxx
        {phoneNumber?.substring(6, 10)}
      </Text>
      <OtpInput
        ref={otpRef}
        numberOfDigits={OTP_LENGTH}
        focusColor={
          error?.code === "INVALID_OTP" ? Colors.error : Colors.primary
        }
        onTextChange={(text) => {
          setOtp(text);
        }}
        theme={{
          containerStyle: {
            width: "auto",
            gap: 16,
          },
          pinCodeContainerStyle: {
            borderRadius: App.ui.borderRadius.sm,
            padding: 8,
            borderColor:
              error?.code === "INVALID_OTP" ? Colors.error : Colors.secondary,
            borderWidth: 1,
          },
          pinCodeTextStyle: {
            color: error?.code === "INVALID_OTP" ? Colors.error : Colors.text,
          },
        }}
      />
      <HStack>
        <TouchableOpacity>
          <Text style={{ color: Colors.secondary }}>Resend OTP</Text>
        </TouchableOpacity>
        {error && (
          <TouchableOpacity
            onPress={() => {
              clearError();
              otpRef?.current?.clear();
            }}
          >
            <Text style={{ color: Colors.primary }}>Clear OTP</Text>
          </TouchableOpacity>
        )}
      </HStack>

      <TouchableOpacity
        style={{
          backgroundColor:
            otp.length === OTP_LENGTH ? Colors.primary : Colors.border,
          padding: 16,
          borderRadius: App.ui.borderRadius.sm,
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
          {error ? "Retry" : "Verify"}
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
