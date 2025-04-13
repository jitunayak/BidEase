import Octicons from "@expo/vector-icons/Octicons";
import dayjs from "dayjs";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { App, Colors } from "../Constant";
import { Wishlist } from "../gql/generated";
import { HStack } from "../ui/HStack";
import { VStack } from "../ui/VStack";

export default function AssetCompactCard({
  item,
  compact,
  onPress,
}: {
  item: Wishlist["auction"];
  compact?: boolean;
  onPress?: () => void;
}) {
  if (!item) return null;
  return (
    <Pressable
      disabled={dayjs(Number(item.endTime)).isBefore(new Date())}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flex: 1,
        borderColor: Colors.border,
        borderWidth: 0.6,
        borderRadius: App.ui.borderRadius.md,
        opacity: dayjs(item.endTime).isBefore(new Date()) ? 0.5 : 1,
        backgroundColor: Colors.background,
        maxWidth: compact ? "50%" : "auto",
      }}
    >
      <View
        style={{
          flexDirection: compact ? "column" : "row",
          gap: 8,
          padding: 8,
        }}
      >
        <Image
          source={{ uri: item.images[0] }}
          style={{
            width: compact ? "auto" : 140,
            height: 120,
            borderRadius: App.ui.borderRadius.sm,
          }}
        />
        <VStack alignItems="flex-start">
          <HStack justifyContent="space-between">
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                maxWidth: compact ? "50%" : "auto",
              }}
            >
              {item.title}
            </Text>
            <Octicons
              name={true ? "heart-fill" : "heart"}
              size={16}
              color={Colors.error}
            />
          </HStack>
          <Text>EMD : ₹{item.emd}</Text>
          <Text style={{ color: Colors.primary }}>
            Starting : ₹{Number(item.startingBid).toLocaleString()}
          </Text>
          <HStack alignItems="center" justifyContent="flex-start">
            <Octicons name="location" size={16} color={Colors.secondary} />
            <Text>{item.location}</Text>
          </HStack>
          <Text>{dayjs(item.endTime).format("MMM DD, YYYY")}</Text>
        </VStack>
      </View>
    </Pressable>
  );
}
