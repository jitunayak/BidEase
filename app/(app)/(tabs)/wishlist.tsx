import AssetCompactCard from "@/src/components/AssetCompactCard";
import { Colors } from "@/src/Constant";
import { wishListedAuctions } from "@/src/data/auctions";
import { HStack } from "@/src/ui/HStack";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Wishlist() {
  const [monthRangeFilter, setMonthRangeFilter] = useState(12);

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
      <SafeAreaView style={{ marginVertical: 16 }} />
      <HStack
        justifyContent="flex-start"
        style={{ paddingHorizontal: 8 }}
        gap={8}
      >
        {[3, 6, 12].map((item) => (
          <TouchableOpacity
            id={item.toString()}
            onPress={() => setMonthRangeFilter(item)}
            style={{
              backgroundColor:
                item === monthRangeFilter ? Colors.primary : Colors.background,
              padding: 8,
              borderRadius: 16,
              marginBottom: 8,
              borderWidth: 0.5,
              borderColor: Colors.border,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
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
        data={filteredAuctions.filter((item) => item.isWishListed)}
        keyExtractor={(item) => item.id}
        renderItem={AssetCompactCard}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}
