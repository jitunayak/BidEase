import Octicons from "@expo/vector-icons/Octicons";
import dayjs from "dayjs";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { Colors } from "../Constant";
import { wishListedAuctions } from "../data/auctions";
import { HStack } from "../ui/HStack";
import { VStack } from "../ui/VStack";

export default function AssetCompactCard({
  item,
  compact,
}: {
  item: (typeof wishListedAuctions)[0];
  compact?: boolean;
}) {
  return (
    <Link
      href={`/(app)/app/${item.id}`}
      asChild
      disabled={dayjs(item.date).isBefore(new Date())}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          flex: 1,
          borderColor: Colors.border,
          borderWidth: 0.6,
          borderRadius: 12,
          opacity: dayjs(item.date).isBefore(new Date()) ? 0.5 : 1,
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
            source={item.image}
            style={{
              width: compact ? "auto" : 140,
              height: 120,
              borderRadius: 8,
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
                name={item.isWishListed ? "heart-fill" : "heart"}
                size={16}
                color={Colors.error}
              />
            </HStack>
            <Text>EMD : ₹{item.emd.toLocaleString()}</Text>
            <Text style={{ color: Colors.primary }}>
              Starting : ₹{item.bid.toLocaleString()}
            </Text>
            <HStack alignItems="center" justifyContent="flex-start">
              <Octicons name="location" size={16} color={Colors.secondary} />
              <Text>{item.location}</Text>
            </HStack>
            <Text>{dayjs(item.date).format("MMM DD, YYYY")}</Text>
          </VStack>
        </View>
      </View>
    </Link>
  );
}
