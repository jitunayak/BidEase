import { useNotificationStore } from "@/src/store/notification-store";
import { Notification } from "@/src/types";
import { useRouter } from "expo-router";
import {
  AlertCircle,
  Bell,
  CheckCircle,
  DollarSign,
  Gavel,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { App } from "../Constant";
import { formatRelativeTime } from "../lib/format";

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const router = useRouter();
  const { markAsRead } = useNotificationStore();

  const handlePress = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }

    if (notification.relatedId) {
      switch (notification.type) {
        case "bid":
        case "auction":
          router.push(`/asset/${notification.relatedId}`);
          break;
        case "payment":
          router.push(`/payment/history`);
          break;
        default:
          break;
      }
    }
  };

  const renderIcon = () => {
    const iconProps = { size: 20, color: App.colors.card };

    switch (notification.type) {
      case "bid":
        return (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: App.colors.warning },
            ]}
          >
            <Gavel {...iconProps} />
          </View>
        );
      case "payment":
        return (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: App.colors.success },
            ]}
          >
            <DollarSign {...iconProps} />
          </View>
        );
      case "auction":
        return (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: App.colors.primary },
            ]}
          >
            <Bell {...iconProps} />
          </View>
        );
      case "system":
        return (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: App.colors.verified },
            ]}
          >
            <CheckCircle {...iconProps} />
          </View>
        );
      default:
        return (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: App.colors.textSecondary },
            ]}
          >
            <AlertCircle {...iconProps} />
          </View>
        );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, !notification.read && styles.unread]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {renderIcon()}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {notification.title}
        </Text>
        <Text style={styles.message} numberOfLines={2}>
          {notification.message}
        </Text>
        <Text style={styles.timestamp}>
          {formatRelativeTime(new Date(notification.timestamp))}
        </Text>
      </View>

      {!notification.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: App.colors.borderLight,
  },
  unread: {
    backgroundColor: "rgba(0, 102, 204, 0.05)",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 12,
    color: App.colors.textTertiary,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: App.colors.primary,
    marginLeft: 8,
    alignSelf: "center",
  },
});
