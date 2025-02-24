import AssetCard from "@/src/components/AssetCard";
import AssetCategory from "@/src/components/AssetCategory";
import AssetCompactCard from "@/src/components/AssetCompactCard";
import Banner from "@/src/components/Banner";
import { Colors } from "@/src/Constant";
import { liveAuctionsLarge, wishListedAuctions } from "@/src/data/auctions";
import { EText, HStack } from "@/src/ui";
import Octicons from "@expo/vector-icons/Octicons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  const renderHeader = () => (
    <View style={{ flex: 1, padding: 8, gap: 16 }}>
      <Banner />
      <View style={{ gap: 24 }}>
        <HStack>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
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
        <AssetCategory />
        <EText variant="title" style={{ marginLeft: 8 }}>
          Wishlists
        </EText>
      </View>
    </View>
  );

  return (
    <FlatList
      data={wishListedAuctions.filter((item) => item.isWishListed)}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <AssetCompactCard item={item.item} compact={true} />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      numColumns={2}
      columnWrapperStyle={{ gap: 8 }}
      ListHeaderComponent={renderHeader}
    />
  );
}
