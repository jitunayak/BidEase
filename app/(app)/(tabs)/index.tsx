import AssetCard from "@/src/components/AssetCard";
import AssetCategory from "@/src/components/AssetCategory";
import Banner from "@/src/components/Banner";
import Link from "@/src/components/Link";
import Title from "@/src/components/Title";
import { Colors } from "@/src/Constant";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";

const liveAuctions = [
  {
    id: "1",
    bid: 4550000,
    title: "Mercedes Benz AMG",
    time: "1 hour ago",
    image: require("@/assets/images/asset1.png"),
  },
  {
    id: "2",
    bid: 320000,
    title: "Beach side villa",
    time: "2:30 hours ago",
    image: require("@/assets/images/asset2.png"),
  },
  {
    id: "3",
    bid: 560000,
    title: "Office space in Patia",
    time: "2 hours ago",
    image: require("@/assets/images/asset3.png"),
  },
];
export default function index() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, padding: 8, gap: 16 }}>
        <Banner />
        <View style={{ gap: 16 }}>
          <Title
            value="Categories"
            style={{ marginLeft: 8, marginBottom: 8 }}
          />
          <AssetCategory />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Title value="Live Auctions" />
              <Octicons name="flame" size={14} color={Colors.error} />
            </View>
            <Link value="See All" />
          </View>

          <FlatList
            data={liveAuctions}
            renderItem={({ item }) => (
              <AssetCard
                bid={item.bid}
                title={item.title}
                time={item.time}
                image={item.image}
              />
            )}
            keyExtractor={(item) => item.id}
            snapToAlignment="center"
            decelerationRate={"fast"}
            snapToInterval={300}
            horizontal
          />
        </View>
      </View>
    </ScrollView>
  );
}
