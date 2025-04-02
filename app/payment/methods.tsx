import { App } from "@/src/Constant";
import { usePaymentStore } from "@/src/store/payment-store";
import { PaymentMethodItem } from "@/src/ui/PaymentMethodItem";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CreditCard, Plus } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const {
    paymentMethods,
    fetchPaymentMethods,
    removePaymentMethod,
    setDefaultPaymentMethod,
    isLoading,
  } = usePaymentStore();

  useEffect(() => {
    fetchPaymentMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddMethod = () => {
    router.push("/payment/add-method");
  };

  const handleSetDefault = (id: string) => {
    Alert.alert(
      "Set as Default",
      "Are you sure you want to set this as your default payment method?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Set as Default",
          onPress: async () => {
            try {
              await setDefaultPaymentMethod(id);
            } catch (error) {
              Alert.alert("Error", "Failed to set default payment method");
            }
          },
        },
      ]
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Remove Payment Method",
      "Are you sure you want to remove this payment method?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await removePaymentMethod(id);
            } catch (error) {
              Alert.alert("Error", "Failed to remove payment method");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddMethod}
            >
              <Plus size={24} color={App.colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={App.colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {paymentMethods.length > 0 ? (
            <View style={styles.methodsContainer}>
              {paymentMethods.map((method) => (
                <PaymentMethodItem
                  key={method.id}
                  method={method}
                  onDelete={() => handleDelete(method.id)}
                  onSetDefault={
                    !method.isDefault
                      ? () => handleSetDefault(method.id)
                      : undefined
                  }
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <CreditCard size={48} color={App.colors.textTertiary} />
              <Text style={styles.emptyStateTitle}>No payment methods</Text>
              <Text style={styles.emptyStateText}>
                Add a payment method to make purchases and place bids
              </Text>
              <TouchableOpacity
                style={styles.addMethodButton}
                onPress={handleAddMethod}
              >
                <Text style={styles.addMethodText}>Add Payment Method</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.colors.background,
  },
  addButton: {
    padding: 8,
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  methodsContainer: {
    gap: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: App.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: App.colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  addMethodButton: {
    backgroundColor: App.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addMethodText: {
    color: App.colors.card,
    fontSize: 16,
    fontWeight: "600",
  },
});
