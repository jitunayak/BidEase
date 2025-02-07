import AssetCard from "@/src/components/AssetCard";
import AssetCategory from "@/src/components/AssetCategory";
import Banner from "@/src/components/Banner";
import Link from "@/src/components/Link";
import Title from "@/src/components/Title";
import { Colors } from "@/src/Constant";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { ScrollView, View } from "react-native";

export default function index() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, padding: 8, gap: 16 }}>
        <Banner />
        <View style={{ gap: 24 }}>
          <Title value="Categories" />
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

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <AssetCard />
            <AssetCard />
            <AssetCard />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
