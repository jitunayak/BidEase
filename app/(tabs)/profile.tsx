import {
  CreditLimit,
  IndividualKYC,
  LogOut,
  PersonalInfo,
} from "@/src/components";
import { App, Colors } from "@/src/Constant";
import { useGetUserQuery } from "@/src/gql/generated";
import { useStore } from "@/src/hooks/useStorage";
import { useNotificationStore } from "@/src/store/notification-store";
import { usePaymentStore } from "@/src/store/payment-store";
import { Link, useRouter } from "expo-router";
import {
  Bell,
  CheckCircle,
  ChevronRight,
  CreditCard,
  SettingsIcon,
  Shield,
} from "lucide-react-native";
import React, { useEffect } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

export default function Profile() {
  const { user, setUser } = useStore();
  const router = useRouter();
  // const { user, logout } = useAuthStore();
  const { paymentMethods, fetchPaymentMethods } = usePaymentStore();
  const { unreadCount, fetchNotifications } = useNotificationStore();

  const { loading: loadingUser, refetch: refetchUser } = useGetUserQuery({
    variables: {
      id: user?.id ?? "",
    },
    onCompleted: (data) => {
      setUser(data?.user as any);
    },
  });

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
  // const { error, data, loading, refetch } = useGetUserQuery({
  //   variables: {
  //     id: user?.id ?? "",
  //   },
  // });
  // console.log({ user });

  // useEffect(() => {
  //   setUser(null);
  //   if (error) {
  //     alert(error.message);
  //   } else if (data?.user) {
  //     setUser(data.user);
  //   }
  // }, [loading]);

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: App.colors.background }}
      refreshControl={
        <RefreshControl
          refreshing={loadingUser}
          tintColor={Colors.primary}
          onRefresh={() => {
            // fetchPaymentMethods();
            // fetchNotifications();
            refetchUser();
          }}
        />
      }
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          gap: 8,
          justifyContent: "center",
        }}
      >
        {!user && (
          <>
            <ShimmerPlaceholder
              style={{
                width: 120,
                height: 120,
                borderRadius: 100,
                alignSelf: "center",
              }}
            />
            <ShimmerPlaceholder style={{ marginTop: 16 }} />
            <ShimmerPlaceholder style={{ width: "100%", height: 120 }} />
            <ShimmerPlaceholder style={{ width: "100%", height: 120 }} />
            <ShimmerPlaceholder />
            <ShimmerPlaceholder style={{ width: "100%", height: 120 }} />
            <ShimmerPlaceholder style={{ width: "100%", height: 120 }} />
          </>
        )}

        {user && (
          <>
            {/* <EText>{JSON.stringify(data?.user?.preferences.interests)}</EText> */}
            <PersonalInfo />
            <Link
              href={"/(modals)/preference"}
              push
              style={{
                color: Colors.primary,
                textAlign: "center",
                marginTop: 16,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Update Auction Preference
            </Link>

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
                user?.kyc.isAadharVerified
                  ? "Your account is verified"
                  : "Complete verification to bid on high-value assets",
                handleVerification,
                user?.kyc.isAadharVerified ? (
                  <CheckCircle size={20} color={App.colors.success} />
                ) : undefined
              )}

              {renderMenuItem(
                <SettingsIcon size={24} color={App.colors.primary} />,
                "Preferences",
                "App preferences and account settings",
                () => {
                  router.push("/(modals)/preference");
                }
              )}
            </View>
            <IndividualKYC user={user} />
            <CreditLimit />
            <LogOut />
          </>
        )}
      </View>
    </ScrollView>
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
    marginHorizontal: 8,
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
    width: "100%",
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

