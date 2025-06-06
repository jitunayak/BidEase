import { App } from "@/src/Constant";
import { useLoginScreen } from "@/src/hooks/componentHooks/useLoginScreen";
import { storage } from "@/src/hooks/storage";
import { sanitizePhoneNumber } from "@/src/lib/format";
import { RNUtils } from "@/src/lib/rn-utils";
import { Button, PhoneNumberInput } from "@/src/ui";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Login() {
  const { handleLogin, phoneNumber, onChangePhoneNumber } = useLoginScreen();

  useEffect(() => {
    storage.set("user.route", "auth/phone");
  }, []);

  return (
    <>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          display: "flex",
          paddingTop: 100,
          paddingHorizontal: App.ui.padding.md,
          backgroundColor: App.colors.card,
        }}
      >
        <StatusBar style="auto" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Image
                source={require("@/assets/images/bidding.png")}
                style={{ width: 120, height: 120 }}
              />
              <Text style={styles.title}>Welcome to BidEase</Text>
              <Text style={styles.secondaryText}>
                Secure banking auctions at your fingertips
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 50, marginTop: 30, padding: 8 }}>
            <PhoneNumberInput
              phoneNumber={phoneNumber}
              onChangePhoneNumber={onChangePhoneNumber}
              countryCode="+91"
            />
            {sanitizePhoneNumber(phoneNumber).length >= 10 && (
              <Button
                title="Continue"
                variant="primary"
                disabled={sanitizePhoneNumber(phoneNumber).length < 10}
                style={
                  sanitizePhoneNumber(phoneNumber).length < 10
                    ? {
                        ...styles.button,
                        backgroundColor: App.colors.primary,
                      }
                    : styles.button
                }
                onPress={() => {
                  RNUtils.giveHapticFeedback();
                  handleLogin();
                }}
              ></Button>
            )}
            <Text
              style={{
                marginTop: 10,
                color: App.colors.textSecondary,
                fontSize: 12,
                paddingHorizontal: 20,
              }}
            >
              By continuing, you agree to our{" "}
              <Link
                style={{ color: App.colors.primary }}
                href="https://www.ahouse.in/privacy-policy"
              >
                Terms of Service{" "}
                <Text style={{ color: App.colors.textSecondary }}>and</Text>{" "}
                Privacy Policy
              </Link>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
      {/* </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 40,
    letterSpacing: 1,
    color: App.colors.text,
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: App.ui.borderRadius.sm,
    padding: 10,
    margin: 10,
    display: "flex",
    width: "auto",
    fontSize: 18,
  },
  button: {
    backgroundColor: App.colors.primary,
    padding: 16,
    borderRadius: App.ui.borderRadius.sm,
    margin: 10,
    width: "auto",
    display: "flex",
    alignItems: "center",
  },

  secondaryText: {
    fontSize: 12,
    color: App.colors.textSecondary,
  },
});
