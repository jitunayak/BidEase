import { Colors } from "@/src/Constant";
import { notifications } from "@/src/data/notifications";
import { INotification } from "@/src/types/INotification";
import { HStack } from "@/src/ui/HStack";
import { VStack } from "@/src/ui/VStack";
import Octicons from "@expo/vector-icons/Octicons";
import Color from "color"; // Install this library: npm install color
import { Link } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const notificationColor = (type: INotification["type"]) => {
  switch (type) {
    case "general":
      return "black";
    case "reminder":
      return "#EA580C";
    case "successful":
      return "#16A34A";
    case "promotional":
      return Colors.primary;
    case "failed":
      return "red";
    case "transactional":
      return "purple";
  }
};

const NotificationItem = ({ item }: { item: INotification }) => {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: item.read
          ? Colors.background
          : Color(Colors.primary).alpha(0.1).string(),
      }}
    >
      <HStack gap={16}>
        <Octicons
          name={
            item.type === "reminder"
              ? "bell"
              : item.type === "successful"
              ? "check"
              : item.type === "promotional"
              ? "megaphone"
              : item.type === "failed"
              ? "alert"
              : item.type === "transactional"
              ? "credit-card"
              : "info"
          }
          size={24}
          color={notificationColor(item.type)}
          style={{
            backgroundColor: Color(notificationColor(item.type))
              .alpha(0.1)
              .string(),
            padding: 8,
            borderRadius: 8,
          }}
        />
        <VStack alignItems="flex-start">
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>{item.date}</Text>
          <Link
            push
            href={item.link as any}
            style={{ color: notificationColor(item.type) }}
          >
            {item.action}
          </Link>
        </VStack>
      </HStack>
    </View>
  );
};

export default function Notification() {
  const [selectedTab, setSelectedTab] = useState("all");
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      {notifications.length === 0 && (
        <>
          <Octicons name="bell" size={48} color={Colors.secondary} />
          <Text>Nothing missed!</Text>
        </>
      )}

      <HStack
        style={{ paddingHorizontal: 4 }}
        gap={16}
        justifyContent="flex-start"
      >
        {[
          { value: "all", name: "All" },
          { value: "unread", name: "Unread" },
          { value: "read", name: "Read" },
        ].map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => setSelectedTab(item.value)}
            style={{
              padding: 8,
              borderColor: Colors.primary,
              borderWidth: 0,
              borderBottomWidth: selectedTab === item.value ? 2 : 0,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color:
                  selectedTab === item.value
                    ? Colors.primary
                    : Colors.secondary,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </HStack>

      <FlatList
        data={notifications.filter((item) => {
          if (selectedTab === "all") return true;
          return selectedTab === "unread" ? !item.read : item.read;
        })}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: "100%",
              opacity: 0.5,
              backgroundColor: Color(Colors.primary).alpha(0.2).string(),
            }}
          />
        )}
        renderItem={NotificationItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
