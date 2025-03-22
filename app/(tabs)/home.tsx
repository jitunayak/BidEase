import { AssetCard, AssetCategory } from "@/src/components";
import AssetCompactCard from "@/src/components/AssetCompactCard";
import Banner from "@/src/components/Banner";
import { Colors } from "@/src/Constant";
import { wishListedAuctions } from "@/src/data/auctions";
import { GET_AUCTIONS } from "@/src/lib/graphql/auctions.query";
import { EText, HStack } from "@/src/ui";
import { useQuery } from "@apollo/client";
import Octicons from "@expo/vector-icons/Octicons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

export default function Home() {
  const router = useRouter();

  const { loading, data, refetch } = useQuery(GET_AUCTIONS);

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
        {loading && (
          <View>
            <ShimmerPlaceholder
              style={{
                width: 300,
                height: 180,
                borderRadius: 16,
                marginBottom: 10,
              }}
            />
            <ShimmerPlaceholder />
            <ShimmerPlaceholder style={{ marginTop: 16, height: 30 }} />
            <ShimmerPlaceholder
              style={{ marginTop: 16, width: 300, height: 40 }}
            />
          </View>
        )}
        {!loading && data && (
          <FlatList
            data={data.auctions}
            renderItem={({ item }) => (
              <AssetCard
                id={item.id}
                bid={item.bid}
                title={item.title}
                time="2 hours ago"
                image={item.images[0]}
                onPress={() => {
                  router.navigate(`/(app)/${item.id}`);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            snapToAlignment="center"
            decelerationRate={"fast"}
            snapToInterval={320}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 8 }}
          />
        )}
        <AssetCategory />
        <EText variant="title" style={{ marginLeft: 8 }}>
          Wishlists
        </EText>
      </View>
    </View>
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refetch}
          tintColor={Colors.primary}
          title="Pull to refresh"
        />
      }
      data={wishListedAuctions.filter((item) => item.isWishListed)}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <AssetCompactCard
          item={item.item}
          compact={true}
          onPress={() => {
            router.navigate(`/(app)/app/${item.item.id}`);
          }}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      numColumns={2}
      columnWrapperStyle={{ gap: 8 }}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={() => (
        <>
          <View
            style={{
              height: 200,
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 16,
            }}
          >
            <EText
              variant="body"
              style={{ marginLeft: 8, fontSize: 18, color: Colors.border }}
            >
              Build with Love{"  "}
              <Octicons name="heart-fill" size={14} color={Colors.error} />
            </EText>
            <EText
              variant="title"
              style={{ marginLeft: 8, fontSize: 32, color: Colors.border }}
            >
              in Banglore
            </EText>
          </View>
        </>
      )}
    />
  );
}
