import { Colors } from "@/src/Constant";
import { wishListedAuctions } from "@/src/data/auctions";
import { notifications } from "@/src/data/notifications";
import Badge from "@/src/ui/Badge";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

function RootLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        // tabBarStyle: {
        //   position: "absolute",
        // },
        // tabBarBackground: () => (
        //   <BlurView
        //     intensity={100}
        //     style={{
        //       ...StyleSheet.absoluteFillObject,
        //       backgroundColor: "transparent",
        //     }}
        //   />
        // ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "",
          tabBarIcon: (tab) => (
            <Octicons
              color={tab.focused ? Colors.primary : "gray"}
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
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>BidEase</Text>
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
                onPress={() => router.navigate("/(app)/app/search")}
              >
                <Octicons name="search" size={22} color={Colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.navigate("/(app)/app/notification")}
              >
                <Badge count={notifications.filter((n) => !n.read).length}>
                  <Octicons name="bell" size={22} color={Colors.text} />
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
              color={tab.focused ? Colors.primary : "gray"}
              name="flame"
              size={22}
            />
          ),
          headerSearchBarOptions: {
            inputType: "text",
            placeholder: "Search for live auctions",
            cancelButtonText: "Clear",
          },
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
        name="wishlist"
        options={{
          title: "Wishlist",
          headerShown: false,
          tabBarIcon: (tab) => (
            <Octicons
              color={tab.focused ? Colors.primary : "gray"}
              name="heart"
              size={22}
            />
          ),
          tabBarBadge: wishListedAuctions.length,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: (tab) => (
            <Octicons
              name="person"
              size={22}
              color={tab.focused ? Colors.primary : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default RootLayout;
