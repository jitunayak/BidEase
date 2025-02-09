import Octicons from "@expo/vector-icons/Octicons";
import dayjs from "dayjs";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { Colors } from "../Constant";
import { wishListedAuctions } from "../data/auctions";
import { HStack } from "../ui/HStack";
import { VStack } from "../ui/VStack";

export default function AssetCompactCard({
  item,
}: {
  item: (typeof wishListedAuctions)[0];
}) {
  return (
    <TouchableOpacity
      disabled={dayjs(item.date).isBefore(new Date())}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        padding: 8,
        borderColor: Colors.border,
        borderWidth: 0.6,
        borderRadius: 12,
        opacity: dayjs(item.date).isBefore(new Date()) ? 0.5 : 1,
        backgroundColor: Colors.background,
      }}
    >
      <HStack>
        <Image
          source={item.image}
          style={{ width: 140, height: 120, borderRadius: 8 }}
        />
        <VStack alignItems="flex-start">
          <HStack justifyContent="space-between">
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.title}
            </Text>
            <Octicons
              name={item.isWishListed ? "heart-fill" : "heart"}
              size={16}
              color={Colors.error}
            />
          </HStack>
          <Text>EMD : {item.emd.toLocaleString()}</Text>
          <Text style={{ color: Colors.primary }}>
            Starting : {item.bid.toLocaleString()}
          </Text>
          <HStack alignItems="center" justifyContent="flex-start">
            <Octicons name="location" size={16} color={Colors.secondary} />
            <Text>{item.location}</Text>
          </HStack>
          <Text>{dayjs(item.date).format("MMM DD, YYYY")}</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}
