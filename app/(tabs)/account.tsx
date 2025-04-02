import { App } from "@/src/Constant";
import { useAuthStore } from "@/src/store/auth-store";
import { useNotificationStore } from "@/src/store/notification-store";
import { usePaymentStore } from "@/src/store/payment-store";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Bell,
  CheckCircle,
  ChevronRight,
  CreditCard,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react-native";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { paymentMethods, fetchPaymentMethods } = usePaymentStore();
  const { unreadCount, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchPaymentMethods();
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const handlePaymentMethods = () => {
    router.push("/payment/methods");
  };

  const handleNotifications = () => {
    router.push("/notifications");
  };

  const handleVerification = () => {
    router.push("/profile/verification");
  };

  const handleLogout = () => {
    logout();
    router.replace("/(auth)");
  };

  const renderMenuItem = (
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    onPress: () => void,
    rightElement?: React.ReactNode
  ) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemIcon}>{icon}</View>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
      </View>
      {rightElement || (
        <ChevronRight size={20} color={App.colors.textTertiary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              {user?.profileImage ? (
                <Image
                  source={{ uri: user.profileImage }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <User size={32} color={App.colors.card} />
                </View>
              )}
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <View style={styles.verificationStatus}>
                {user?.kycVerified ? (
                  <>
                    <CheckCircle size={14} color={App.colors.verified} />
                    <Text
                      style={[
                        styles.verificationText,
                        { color: App.colors.verified },
                      ]}
                    >
                      Verified
                    </Text>
                  </>
                ) : (
                  <Text style={styles.verificationText}>
                    Verification pending
                  </Text>
                )}
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          {renderMenuItem(
            <CreditCard size={24} color={App.colors.primary} />,
            "Payment Methods",
            `${paymentMethods.length} saved payment methods`,
            handlePaymentMethods
          )}

          {renderMenuItem(
            <Bell size={24} color={App.colors.primary} />,
            "Notifications",
            "Manage your notification preferences",
            handleNotifications,
            unreadCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            ) : undefined
          )}

          {renderMenuItem(
            <Shield size={24} color={App.colors.primary} />,
            "Account Verification",
            user?.kycVerified
              ? "Your account is verified"
              : "Complete verification to bid on high-value assets",
            handleVerification,
            user?.kycVerified ? (
              <CheckCircle size={20} color={App.colors.success} />
            ) : undefined
          )}

          {renderMenuItem(
            <Settings size={24} color={App.colors.primary} />,
            "Settings",
            "App preferences and account settings",
            () => {}
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={App.colors.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
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
  profileCard: {
    margin: 16,
    padding: 16,
    backgroundColor: App.colors.card,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: App.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: App.colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginBottom: 4,
  },
  verificationStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  verificationText: {
    fontSize: 12,
    color: App.colors.textTertiary,
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: App.colors.borderLight,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: App.colors.primary,
  },
  menuSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: App.colors.card,
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: App.colors.borderLight,
  },
  menuItemIcon: {
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: App.colors.textSecondary,
  },
  badge: {
    backgroundColor: App.colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: App.colors.card,
    fontSize: 10,
    fontWeight: "bold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: App.colors.card,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.danger,
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: App.colors.textTertiary,
    marginBottom: 24,
  },
});
