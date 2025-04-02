import { App } from "@/src/Constant";
import { formatCurrency } from "@/src/lib/format";
import { useAuctionStore } from "@/src/store/auction-store";
import { usePaymentStore } from "@/src/store/payment-store";
import { Button } from "@/src/ui";
import { PaymentMethodItem } from "@/src/ui/PaymentMethodItem";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CreditCard, Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CheckoutScreen() {
  const { assetId, amount } = useLocalSearchParams<{
    assetId: string;
    amount: string;
  }>();
  const router = useRouter();

  const { fetchAssetById, currentAsset } = useAuctionStore();
  const { paymentMethods, fetchPaymentMethods, processPayment, isLoading } =
    usePaymentStore();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (assetId) {
      fetchAssetById(assetId);
    }

    fetchPaymentMethods();

    // Set default payment method if available
    const defaultMethod = paymentMethods.find((method) => method.isDefault);
    if (defaultMethod) {
      setSelectedPaymentMethod(defaultMethod.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId]);

  const handleAddPaymentMethod = () => {
    router.push("/payment/add-method");
  };

  const handlePaymentMethodSelect = (id: string) => {
    setSelectedPaymentMethod(id);
  };

  const handleProcessPayment = async () => {
    if (!selectedPaymentMethod) {
      Alert.alert("Error", "Please select a payment method");
      return;
    }

    if (!currentAsset) {
      Alert.alert("Error", "Asset information not available");
      return;
    }

    try {
      const paymentAmount = parseInt(amount, 10);
      const success = await processPayment(
        paymentAmount,
        selectedPaymentMethod,
        `Payment for ${currentAsset.title}`
      );

      if (success) {
        router.push("/payment/success");
      } else {
        Alert.alert(
          "Payment Failed",
          "There was an error processing your payment. Please try again."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to process payment. Please try again.");
    }
  };

  const paymentAmount = parseInt(amount, 10);
  const processingFee = Math.round(paymentAmount * 0.025); // 2.5% processing fee
  const totalAmount = paymentAmount + processingFee;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Stack.Screen
        options={{
          title: "Checkout",
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {currentAsset && (
          <View style={styles.assetInfo}>
            <Text style={styles.assetTitle}>{currentAsset.title}</Text>
            <Text style={styles.assetCategory}>
              {currentAsset.category.charAt(0).toUpperCase() +
                currentAsset.category.slice(1)}
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Asset Price</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(paymentAmount)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Processing Fee (2.5%)</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(processingFee)}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>
                {formatCurrency(totalAmount)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddPaymentMethod}
            >
              <Plus size={16} color={App.colors.primary} />
              <Text style={styles.addButtonText}>Add New</Text>
            </TouchableOpacity>
          </View>

          {paymentMethods.length > 0 ? (
            <View style={styles.paymentMethodsContainer}>
              {paymentMethods.map((method) => (
                <PaymentMethodItem
                  key={method.id}
                  method={method}
                  selectable
                  selected={selectedPaymentMethod === method.id}
                  onSelect={() => handlePaymentMethodSelect(method.id)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.noPaymentMethods}>
              <CreditCard size={32} color={App.colors.textTertiary} />
              <Text style={styles.noPaymentMethodsText}>
                No payment methods available
              </Text>
              <Text style={styles.noPaymentMethodsSubtext}>
                Add a payment method to continue
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View>
            <Text style={styles.footerTotalLabel}>Total</Text>
            <Text style={styles.footerTotalValue}>
              {formatCurrency(totalAmount)}
            </Text>
          </View>

          <Button
            title="Pay Now"
            size="lg"
            onPress={handleProcessPayment}
            isLoading={isLoading}
            disabled={!selectedPaymentMethod || isLoading}
          />
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
  scrollContent: {
    padding: 16,
  },
  assetInfo: {
    padding: 16,
    backgroundColor: App.colors.card,
    borderRadius: 12,
    marginBottom: 24,
  },
  assetTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 4,
  },
  assetCategory: {
    fontSize: 14,
    color: App.colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    color: App.colors.primary,
    fontWeight: "500",
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: App.colors.card,
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: App.colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: App.colors.text,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: App.colors.borderLight,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: App.colors.primary,
  },
  paymentMethodsContainer: {
    gap: 12,
  },
  noPaymentMethods: {
    padding: 24,
    backgroundColor: App.colors.card,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  noPaymentMethodsText: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  noPaymentMethodsSubtext: {
    fontSize: 14,
    color: App.colors.textSecondary,
    textAlign: "center",
  },
  footer: {
    backgroundColor: App.colors.card,
    borderTopWidth: 1,
    borderTopColor: App.colors.borderLight,
    padding: 16,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerTotalLabel: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginBottom: 4,
  },
  footerTotalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: App.colors.text,
  },
});
