import { App, Colors } from "@/src/Constant";
import { useLoginScreen } from "@/src/hooks/componentHooks/useLoginScreen";
import { sanitizePhoneNumber } from "@/src/lib/format";
import { RNUtils } from "@/src/lib/rn-utils";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
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

export default function Login() {
  const { handleLogin, phoneNumber, onChangePhoneNumber } = useLoginScreen();
  return (
    <>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          display: "flex",
          backgroundColor: Colors.primary,
          paddingTop: 100,
        }}
      >
        <StatusBar style="light" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Image
                source={require("@/assets/images/logo.png")}
                style={{ width: 120, height: 120 }}
              />
              <Text style={styles.title}>Welcome to BidEase</Text>
              <Text style={styles.secondaryText}>
                Secure banking auctions at your fingertips
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 50, marginTop: 30, padding: 8 }}>
            <View style={styles.phoneNumberInput}>
              <Text style={{ fontSize: 12, color: Colors.background }}>
                Phone Number
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    letterSpacing: 1,
                    color: Colors.background,
                  }}
                >
                  +91{"   "}
                </Text>
                <TextInput
                  testID="phone-input"
                  placeholder="111-222-3333"
                  placeholderTextColor={Colors.border}
                  style={{
                    fontSize: 22,
                    letterSpacing: 1,
                    color: Colors.background,
                    width: "90%",
                  }}
                  keyboardType="number-pad"
                  value={phoneNumber}
                  onChangeText={(e) => {
                    onChangePhoneNumber(e);
                  }}
                  autoFocus={true}
                />
              </View>
            </View>
            {sanitizePhoneNumber(phoneNumber).length >= 10 && (
              <TouchableOpacity
                disabled={sanitizePhoneNumber(phoneNumber).length < 10}
                style={
                  sanitizePhoneNumber(phoneNumber).length < 10
                    ? {
                        ...styles.button,
                        backgroundColor: Colors.border,
                      }
                    : styles.button
                }
                onPress={() => {
                  RNUtils.giveHapticFeedback();
                  handleLogin();
                }}
              >
                <Text style={{ color: Colors.primary, fontWeight: "600" }}>
                  Continue
                </Text>
              </TouchableOpacity>
            )}
            <Text
              style={{
                marginTop: 10,
                color: Colors.background,
                fontSize: 12,
                paddingHorizontal: 20,
              }}
            >
              By continuing, you agree to our{" "}
              <Link
                style={{ color: Colors.success }}
                href="https://www.ahouse.in/privacy-policy"
              >
                Terms of Service{" "}
                <Text style={{ color: Colors.border }}>and</Text> Privacy Policy
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 40,
    letterSpacing: 1,
    color: Colors.background,
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
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: App.ui.borderRadius.sm,
    margin: 10,
    width: "auto",
    display: "flex",
    alignItems: "center",
  },

  secondaryText: {
    fontSize: 12,
    color: Colors.border,
  },
});
