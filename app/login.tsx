import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        backgroundColor: "white",
      }}
    >
      <SafeAreaView />
      <View>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Image
            source={require("../assets/images/logo.png")}
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
          <TextInput
            style={{ fontSize: 18, paddingTop: 8, letterSpacing: 1 }}
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.navigate("/otp-screen");
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
