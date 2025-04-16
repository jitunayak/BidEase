import Octicons from "@expo/vector-icons/Octicons";
import dayjs from "dayjs";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { App, Colors } from "../Constant";
import { Wishlist } from "../gql/generated";
import { EText } from "../ui";
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
        flex: 1,
        // borderColor: Colors.border,
        // borderWidth: 0.6,
        borderRadius: App.ui.borderRadius.md,
        opacity: dayjs(new Date(Number(item.endTime))).isBefore(new Date())
          ? 0.5
          : 1,
        backgroundColor: Colors.background,
        maxWidth: compact ? "50%" : "auto",
      }}
    >
      <View
        style={{
          flexDirection: compact ? "column" : "row",
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
        <VStack
          alignItems="flex-start"
          style={compact ? { marginTop: 4 } : { marginLeft: 12 }}
        >
          <HStack justifyContent="space-between">
            <EText
              style={{
                fontWeight: "500",
                maxWidth: compact ? "60%" : "auto",
              }}
            >
              {item.title.trim().substring(0, 26)}
              {item.title.length > 26 && ".."}
            </EText>
            <Octicons
              name={true ? "heart-fill" : "heart"}
              size={16}
              color={Colors.error}
            />
          </HStack>
          <View style={{ width: "100%", gap: 6 }}>
            <EText>EMD : ₹{item.emd}</EText>
            <EText style={{ color: Colors.primary }}>
              Starting : ₹{Number(item.startingBid).toLocaleString()}
            </EText>
            <HStack alignItems="center" justifyContent="flex-start">
              <Octicons name="location" size={16} color={Colors.secondary} />
              <EText>{item.location}</EText>
            </HStack>
            <EText>
              {dayjs(new Date(Number(item.endTime))).format("MMM DD, YYYY")}
            </EText>
          </View>
        </VStack>
      </View>
    </Pressable>
  );
}
