import { Colors } from "@/src/Constant";
import { wishListedAuctions } from "@/src/data/auctions";
import { HStack } from "@/src/ui/HStack";
import { VStack } from "@/src/ui/VStack";
import Octicons from "@expo/vector-icons/Octicons";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const WishlistItem = ({ item }: { item: (typeof wishListedAuctions)[0] }) => {
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
        borderRadius: 8,
        opacity: dayjs(item.date).isBefore(new Date()) ? 0.5 : 1,
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
            <Octicons name="heart-fill" size={16} color={Colors.error} />
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
};

export default function Wishlist() {
  const [monthRangeFilter, setMonthRangeFilter] = useState(1);

  const filteredAuctions = useMemo(
    () =>
      wishListedAuctions
        .sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        .filter((item) => {
          return dayjs(item.date).isBefore(
            dayjs().add(monthRangeFilter, "month").toDate()
          );
        }),
    [monthRangeFilter]
  );

  return (
    <View style={{ padding: 8, flex: 1 }}>
      <HStack justifyContent="flex-start">
        {[3, 6, 12].map((item) => (
          <TouchableOpacity
            onPress={() => setMonthRangeFilter(item)}
            style={{
              backgroundColor:
                item === monthRangeFilter ? Colors.primary : Colors.border,
              padding: 10,
              borderRadius: 16,
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color:
                  item === monthRangeFilter ? Colors.background : Colors.text,
              }}
            >
              {item} {item > 1 ? "Months" : "Month"}
            </Text>
          </TouchableOpacity>
        ))}
      </HStack>

      <FlatList
        data={filteredAuctions}
        keyExtractor={(item) => item.id}
        renderItem={WishlistItem}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}
