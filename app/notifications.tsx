import { App } from "@/src/Constant";
import { useNotificationStore } from "@/src/store/notification-store";
import { NotificationItem } from "@/src/ui/NoitficationItem";
import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NotificationsScreen() {
  const { notifications, markAllAsRead, isLoading, fetchNotifications } =
    useNotificationStore();

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={handleMarkAllAsRead}
              style={styles.markAllButton}
            >
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          ),
        }}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={App.colors.primary} />
        </View>
      ) : (
        <FlashList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationItem notification={item} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No notifications</Text>
              <Text style={styles.emptyStateText}>
                You don't have any notifications at the moment
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  markAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  markAllText: {
    fontSize: 14,
    color: App.colors.primary,
    fontWeight: "500",
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
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: App.colors.textSecondary,
    textAlign: "center",
  },
});
