import { App } from "@/src/Constant";
import { formatCurrency, formatDate } from "@/src/lib/format";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronRight, DollarSign } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Mock payment history data
interface PaymentHistory {
  id: string;
  assetId: string;
  assetTitle: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

const mockPaymentHistory: PaymentHistory[] = [
  {
    id: "1",
    assetId: "2",
    assetTitle: "Luxury Sedan - 2020 Mercedes-Benz E-Class",
    amount: 36500,
    date: new Date(Date.now() - 86400000).toISOString(),
    status: "completed",
  },
  {
    id: "2",
    assetId: "5",
    assetTitle: "Vintage Gold Coin Collection",
    amount: 13500,
    date: new Date(Date.now() - 172800000).toISOString(),
    status: "completed",
  },
  {
    id: "3",
    assetId: "8",
    assetTitle: "Gold Jewelry Collection",
    amount: 8200,
    date: new Date(Date.now() - 604800000).toISOString(),
    status: "completed",
  },
];

export default function PaymentHistoryScreen() {
  const [payments, setPayments] = useState<PaymentHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchPayments = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPayments(mockPaymentHistory);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const getStatusColor = (status: PaymentHistory["status"]) => {
    switch (status) {
      case "completed":
        return App.colors.success;
      case "pending":
        return App.colors.warning;
      case "failed":
        return App.colors.danger;
      default:
        return App.colors.textSecondary;
    }
  };

  const renderPaymentItem = ({ item }: { item: PaymentHistory }) => (
    <TouchableOpacity style={styles.paymentItem}>
      <View style={styles.paymentIconContainer}>
        <DollarSign size={24} color={App.colors.card} />
      </View>

      <View style={styles.paymentDetails}>
        <Text style={styles.paymentTitle} numberOfLines={1}>
          {item.assetTitle}
        </Text>
        <Text style={styles.paymentDate}>
          {formatDate(new Date(item.date))}
        </Text>
      </View>

      <View style={styles.paymentRight}>
        <Text style={styles.paymentAmount}>{formatCurrency(item.amount)}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + "20" },
          ]}
        >
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <ChevronRight size={20} color={App.colors.textTertiary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Stack.Screen
        options={{
          title: "Payment History",
        }}
      />

      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={renderPaymentItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No payment history</Text>
            <Text style={styles.emptyStateText}>
              Your payment history will appear here
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.colors.background,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  paymentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: App.colors.card,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: App.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  paymentDetails: {
    flex: 1,
    marginRight: 12,
  },
  paymentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 12,
    color: App.colors.textSecondary,
  },
  paymentRight: {
    alignItems: "flex-end",
    marginRight: 8,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: App.colors.text,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    marginTop: 80,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: App.colors.textSecondary,
    textAlign: "center",
  },
});
