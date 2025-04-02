import { AssetCard } from "@/src/components/AssetCard";
import { App } from "@/src/Constant";
import { useAuctionStore } from "@/src/store/auction-store";
import { StatusBar } from "expo-status-bar";
import { Heart } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ShortlistScreen() {
  const { assets, shortlistedAssets, fetchAssets, isLoading } =
    useAuctionStore();

  useEffect(() => {
    if (assets.length === 0) {
      fetchAssets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shortlistedItems = assets.filter((asset) =>
    shortlistedAssets.includes(asset.id)
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Your Shortlist</Text>
        <Text style={styles.subtitle}>
          {shortlistedItems.length}{" "}
          {shortlistedItems.length === 1 ? "item" : "items"}
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={App.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={shortlistedItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <AssetCard asset={item} size="large" />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Heart size={48} color={App.colors.textTertiary} />
              <Text style={styles.emptyStateTitle}>
                Your shortlist is empty
              </Text>
              <Text style={styles.emptyStateText}>
                Add items to your shortlist by tapping the heart icon on assets
                you're interested in
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: App.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: App.colors.borderLight,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: App.colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
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
    maxWidth: "80%",
  },
});
