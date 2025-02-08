import { Colors } from "@/src/Constant";
import { storage } from "@/src/hooks/storage";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = () => {
    storage.set("user.phone_number", phoneNumber);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.navigate("/otp-screen");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        backgroundColor: Colors.background,
      }}
    >
      <SafeAreaView />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View>
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={{ width: 60, height: 60 }}
            />
            <Text style={styles.title}>Welcome to BidEase</Text>
            <Text style={styles.secondaryText}>
              Secure banking auctions at your fingertips
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 50, marginTop: 50, padding: 8 }}>
          <View style={styles.phoneNumberInput}>
            <Text style={{ fontSize: 12, color: "gray" }}>Phone Number</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <Text>+91{"   "}</Text>
              <TextInput
                placeholder="1234567890"
                placeholderTextColor={Colors.border}
                style={{ fontSize: 18, letterSpacing: 1 }}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(e) => {
                  if (e.length <= 10) {
                    setPhoneNumber(e);
                  }
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            disabled={phoneNumber.length < 10}
            style={
              phoneNumber.length < 10
                ? {
                    ...styles.button,
                    backgroundColor: Colors.border,
                  }
                : styles.button
            }
            onPress={() => {
              handleLogin();
            }}
          >
            <Text style={{ color: "white" }}>Continue</Text>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              color: "gray",
              fontSize: 12,
              paddingHorizontal: 20,
            }}
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 40,
    letterSpacing: 1,
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    display: "flex",
    width: "auto",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#0052CC",
    padding: 16,
    borderRadius: 8,
    margin: 10,
    width: "auto",
    display: "flex",
    alignItems: "center",
  },

  secondaryText: {
    fontSize: 12,
    color: "gray",
  },
});
