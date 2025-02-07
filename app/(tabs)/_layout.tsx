import { Colors } from "@/src/Constanst";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import React from "react";

function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.primary }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: (tab) => (
            <Octicons
              color={tab.focused ? Colors.primary : "gray"}
              name="home"
              size={22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: "Live",
          tabBarIcon: (tab) => (
            <Octicons
              color={tab.focused ? Colors.primary : "gray"}
              name="flame"
              size={22}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: (tab) => (
            <Octicons
              color={tab.focused ? Colors.primary : "gray"}
              name="heart"
              size={22}
            />
          ),
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
