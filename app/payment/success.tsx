import { App } from "@/src/Constant";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CheckCircle, FileText, Home } from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentSuccessScreen() {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace("/(tabs)");
  };

  const handleViewReceipt = () => {
    // In a real app, this would navigate to a receipt page
    router.push("/payment/history");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle size={80} color={App.colors.success} />
        </View>

        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.message}>
          Your payment has been processed successfully. You will receive a
          confirmation email shortly.
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleViewReceipt}
          >
            <FileText size={20} color={App.colors.primary} />
            <Text style={styles.actionText}>View Receipt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleGoHome}>
            <Home size={20} color={App.colors.primary} />
            <Text style={styles.actionText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(52, 199, 89, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: App.colors.text,
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: App.colors.textSecondary,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  actionButton: {
    alignItems: "center",
    padding: 16,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: App.colors.primary,
  },
});
