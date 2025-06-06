import { App, Colors } from "@/src/Constant";
import { notifications } from "@/src/data/notifications";
import { useGetWishlistsQuery } from "@/src/gql/generated";
import useFeatureFlag from "@/src/hooks/useFeatureFlags";
import { uiStyles } from "@/src/Theme";
import { Badge } from "@/src/ui";
import Octicons from "@expo/vector-icons/Octicons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { Tabs, useRouter } from "expo-router";
import { LucideBell, LucideSearch } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function RootLayout() {
  const router = useRouter();
  const wishListsQuery = useGetWishlistsQuery();

  const isNetWorkInspectorEnabled = useFeatureFlag("network-inspector", false);
  const isChatSupportEnabled = useFeatureFlag("chat-support", false);

  return (
    <Tabs
      screenListeners={{
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      }}
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: {
          position: "absolute",
        },
        tabBarBackground: () =>
          App.platform.isIOS ? (
            <BlurView
              intensity={100}
              tint="light"
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "transparent",
              }}
            />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "white",
          },
          tabBarIcon: (tab) => (
            <Octicons
              color={tab.focused ? Colors.primary : App.colors.textSecondary}
              name="home"
              size={22}
            />
          ),
          headerLeft: () => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 10,
                  marginBottom: 5,
                }}
                source={require("@/assets/images/logo.png")}
              />
              <Text style={{ fontSize: 21, fontWeight: "500" }}>BidEase</Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 24,
                marginRight: 12,
              }}
            >
              <TouchableOpacity
                style={uiStyles.iconButton}
                onPress={() => router.navigate("/(app)/search")}
              >
                <LucideSearch size={22} color={Colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={uiStyles.iconButton}
                onPress={() => router.navigate("/(app)/notification")}
              >
                <Badge count={notifications.filter((n) => !n.read).length}>
                  <LucideBell size={22} color={Colors.text} />
                </Badge>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: "Live",
          headerTitle: "",
          tabBarIcon: (tab) => (
            <Octicons
              color={tab.focused ? Colors.primary : App.colors.textSecondary}
              name="flame"
              size={22}
            />
          ),
          // headerSearchBarOptions: {
          //   inputType: "text",
          //   placeholder: "Search for live auctions",
          //   cancelButtonText: "Clear",
          // },
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 24, marginRight: 12 }}>
              <TouchableOpacity
                onPress={() => router.navigate("/(modals)/auction-filter")}
              >
                <Octicons name="filter" size={22} color={Colors.text} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.navigate("/(app)/search")}
              >
                <Octicons name="search" size={22} color={Colors.text} />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Octicons
                name="chevron-left"
                size={24}
                color={Colors.text}
                style={{ marginLeft: 12 }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="(wishlist)"
        options={{
          headerShown: false,
          title: "Wishlist",
          tabBarIcon: (tab) => (
            <Octicons
              color={tab.focused ? Colors.primary : App.colors.textSecondary}
              name="heart"
              size={22}
            />
          ),
          tabBarBadge: wishListsQuery.data?.wishlists.length || 0,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: (tab) => (
            <Octicons
              name="person"
              size={22}
              color={tab.focused ? Colors.primary : App.colors.textSecondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          href: isChatSupportEnabled ? "/support" : null,
          tabBarIcon: (tab) => (
            <Octicons
              name="code-review"
              size={22}
              color={tab.focused ? Colors.primary : App.colors.textSecondary}
            />
          ),
          title: "Support",
          headerTitle: "Support",
        }}
      />
      <Tabs.Screen
        name="network"
        options={{
          href: isNetWorkInspectorEnabled ? "/network" : null,
          tabBarIcon: (tab) => (
            <Octicons
              name="link"
              size={22}
              color={tab.focused ? Colors.primary : App.colors.textSecondary}
            />
          ),
        }}
      />
      <Tabs.Screen name="account" options={{ href: null }} />
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="shortlist" options={{ href: null }} />
      <Tabs.Screen name="home-feed" options={{ href: null }} />
    </Tabs>
  );
}

export default RootLayout;
