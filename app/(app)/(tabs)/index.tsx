import AssetCard from "@/src/components/AssetCard";
import AssetCategory from "@/src/components/AssetCategory";
import Banner from "@/src/components/Banner";
import { Colors } from "@/src/Constant";
import { liveAuctionsLarge } from "@/src/data/auctions";
import { HStack } from "@/src/ui/HStack";
import Octicons from "@expo/vector-icons/Octicons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

export default function index() {
  const router = useRouter();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, padding: 8, gap: 16 }}>
        <Banner />
        <View style={{ gap: 24 }}>
          <AssetCategory />
          <HStack>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Live Auctions
              </Text>
              <Octicons name="flame" size={14} color={Colors.error} />
            </View>
            <Link href={"/live"} style={{ color: Colors.primary }}>
              See All
            </Link>
          </HStack>

          <FlatList
            data={liveAuctionsLarge}
            renderItem={({ item }) => (
              <AssetCard
                {...item}
                onPress={() => {
                  router.navigate(`/(app)/app/${item.id}`);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            snapToAlignment="center"
            decelerationRate={"fast"}
            snapToInterval={300}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
}
