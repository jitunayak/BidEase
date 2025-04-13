import { AssetCard2 } from "@/src/components/AssetCard2";
import AssetCompactCard from "@/src/components/AssetCompactCard";
import { App, Colors } from "@/src/Constant";
import {
  useAuctionsQuery,
  useGetBannersQuery,
  useGetWishlistsQuery,
} from "@/src/gql/generated";
import { advertisements } from "@/src/mocks/advertisements";
import { useAuctionStore } from "@/src/store/auction-store";
import { AssetCategory as AssetCategoryType } from "@/src/types";
import { EText } from "@/src/ui";
import { AdvertisementCard } from "@/src/ui/AdvertisementCard";
import { BannerCarousel } from "@/src/ui/BannerCaraousel";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const categories: AssetCategoryType[] = [
  "gold",
  "vehicle",
  "house",
  "apartment",
];

export default function Home() {
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);

  const bannersQuery = useGetBannersQuery();
  const {
    data: auctions,
    loading: loadingAuctions,
    refetch: refetchAuctions,
  } = useAuctionsQuery();

  const {
    assets,
    featuredAssets,
    fetchAssets,
    fetchFeaturedAssets,
    isLoading,
  } = useAuctionStore();

  const { data: wishListedAuctions, refetch: refetchWishlists } =
    useGetWishlistsQuery();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    await Promise.all([fetchAssets(), fetchFeaturedAssets()]);
  };

  const getCategoryCount = (category: AssetCategoryType) => {
    return assets.filter((asset) => asset.category === category).length;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    bannersQuery.refetch();
    refetchAuctions();
    refetchWishlists();
    setRefreshing(false);
  };

  const renderHeader = () => (
    <View style={{ flex: 1, padding: 8, gap: 16 }}>
      {bannersQuery.loading || !bannersQuery.data ? null : (
        <BannerCarousel banners={bannersQuery.data.banners} />
      )}

      {/* Categories */}
      {/* <View
        style={styles.section}
        // entering={FadeInDown.delay(200).duration(600)}
      >
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <View
              key={category}
              // entering={FadeInRight.delay(300 + index * 100).duration(600)}
            >
              <CategoryCard
                category={category}
                count={getCategoryCount(category)}
                // style={styles.categoryCard}
              />
            </View>
          ))}
        </View>
      </View> */}

      <View style={{ gap: 24 }}>
        {/* Featured Auctions */}
        <View
          style={styles.section}
          // entering={FadeInDown.delay(400).duration(600)}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Auctions</Text>
            {/* <TouchableOpacity onPress={handleSeeAllFeatured}> */}
            <Text style={styles.seeAll}>See All</Text>
            {/* </TouchableOpacity> */}
          </View>

          {loadingAuctions ? (
            <View>
              <ShimmerPlaceholder
                style={{
                  width: 300,
                  height: 180,
                  borderRadius: App.ui.borderRadius.lg,
                  marginBottom: 10,
                }}
              />
              <ShimmerPlaceholder />
              <ShimmerPlaceholder style={{ marginTop: 16, height: 30 }} />
              <ShimmerPlaceholder
                style={{ marginTop: 16, width: 300, height: 40 }}
              />
            </View>
          ) : (
            <Animated.FlatList
              data={auctions?.auctions}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
              renderItem={({ item, index }) => (
                <View
                  style={styles.featuredItem}
                  // entering={FadeInRight.delay(500 + index * 100).duration(600)}
                >
                  <AssetCard2 asset={item as any} size="medium" />
                </View>
              )}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    No featured auctions available
                  </Text>
                </View>
              }
            />
          )}
        </View>

        {/* <HStack>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Live Auctions
            </Text>
            <Octicons name="flame" size={14} color={Colors.error} />
          </View>
          <Link href={"/live"} style={{ color: Colors.primary }}>
            See All
          </Link>
        </HStack> */}
        {/* {loading && (
          <View>
            <ShimmerPlaceholder
              style={{
                width: 300,
                height: 180,
                borderRadius: App.ui.borderRadius.lg,
                marginBottom: 10,
              }}
            />
            <ShimmerPlaceholder />
            <ShimmerPlaceholder style={{ marginTop: 16, height: 30 }} />
            <ShimmerPlaceholder
              style={{ marginTop: 16, width: 300, height: 40 }}
            />
          </View>
        )} */}
        {/* 
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
        )} */}
        <Animated.View
          style={styles.section}
          entering={FadeInDown.delay(600).duration(600)}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sponsored</Text>
          </View>

          <FlatList
            data={advertisements}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.adsList}
            renderItem={({ item, index }) => (
              <AdvertisementCard ad={item} index={index} />
            )}
          />
        </Animated.View>
        {/* <AssetCategory /> */}
        <EText variant="title" style={{ marginLeft: 8 }}>
          Wishlists
        </EText>
      </View>
    </View>
  );

  return (
    // <View style={uiStyles.container}>
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          title="Pull to refresh"
        />
      }
      data={wishListedAuctions?.wishlist}
      keyExtractor={(item) => String(item.id)}
      renderItem={(item) => (
        <AssetCompactCard
          item={item.item.auction as any}
          compact={true}
          onPress={() => {
            router.navigate(`/asset/${item.item.auction.id}`);
          }}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      numColumns={2}
      columnWrapperStyle={{ gap: 8, padding: 8 }}
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
    // </View>
  );
}

const styles = StyleSheet.create({
  section: {
    // marginTop: 24,
    // paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: App.colors.text,
  },
  adsList: {
    paddingRight: 16,
  },
  featuredList: {
    paddingRight: 16,
  },
  featuredItem: {
    width: 280,
    margin: 12,
    height: 300,
  },

  liveAuctionItem: {
    marginBottom: App.ui.padding.md,
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: App.colors.card,
    borderRadius: 12,
    marginVertical: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: App.colors.textSecondary,
  },
  seeAll: {
    fontSize: 14,
    color: App.colors.primary,
    fontWeight: "600",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
    flex: 1,
    width: "100%",
    paddingHorizontal: App.ui.padding.md,
    gap: 16,
  },
  categoryCard: {
    width: "68%",
    marginBottom: 16,
  },
});
