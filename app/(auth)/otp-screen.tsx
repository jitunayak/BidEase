import { Colors } from "@/src/Constant";
import { useGetUserLazyQuery } from "@/src/gql/generated";
import { useStore } from "@/src/hooks/useStorage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";

const OTP_LENGTH = 4;
export default function OtpScreen() {
  const router = useRouter();
  const queryParams = useLocalSearchParams<{
    phoneNumber: string;
  }>();
  const { setUser } = useStore();

  const [otp, setOtp] = useState("");
  const [getUser, { data, loading, error }] = useGetUserLazyQuery();

  const handleOtpVerification = async () => {
    // perform verification. Get user Id
    const userId = "4";
    await getUser({
      variables: {
        id: userId,
      },
    });
  };

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
      router.navigate("/(app)/preference");
    }
    if (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, color: Colors.text, marginTop: 30 }}>
        Verification code sent to xxxxxx
        {queryParams?.phoneNumber?.substring(6, 10)}
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
