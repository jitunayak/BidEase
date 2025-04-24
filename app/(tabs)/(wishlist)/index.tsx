import AssetCompactCard from "@/src/components/AssetCompactCard";
import { useGetWishlistsQuery } from "@/src/gql/generated";
import { EText } from "@/src/ui";
import { FlashList } from "@shopify/flash-list";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { RefreshControl, Text, View } from "react-native";

export default function Wishlist() {
  const router = useRouter();
  const [monthRangeFilter, setMonthRangeFilter] = useState(12);

  const { search } = useGlobalSearchParams();

  const {
    data: wishlists,
    loading: wishlistsLoading,
    refetch: refetchWishlists,
  } = useGetWishlistsQuery();

  // const filteredAuctions = useMemo(
  //   () =>
  //     wishListedAuctions
  //       .sort((a, b) => {
  //         return new Date(b.date).getTime() - new Date(a.date).getTime();
  //       })
  //       .filter((item) => {
  //         return dayjs(item.date).isBefore(
  //           dayjs().add(monthRangeFilter, "month").toDate()
  //         );
  //       }),
  //   [monthRangeFilter]
  // );

  console.log("wishlists", wishlists?.wishlists);
  if (wishlistsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (!wishlists?.wishlists || wishlists.wishlists.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          You have no wishlists
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={{ padding: 8, flex: 1 }}>
        {/* <HStack
        justifyContent="flex-start"
        style={{ paddingHorizontal: 8 }}
        gap={8}
      >
        {[3, 6, 12].map((item) => (
          <TouchableOpacity
            id={item.toString()}
            key={item}
            onPress={() => setMonthRangeFilter(item)}
            style={{
              backgroundColor:
                item === monthRangeFilter ? Colors.primary : Colors.background,
              padding: 8,
              borderRadius: App.ui.borderRadius.lg,
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
      </HStack> */}

        <FlashList
          refreshControl={
            <RefreshControl
              refreshing={wishlistsLoading}
              onRefresh={() => {
                refetchWishlists();
              }}
            />
          }
          estimatedItemSize={200}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          // contentContainerStyle={{
          //   paddingBottom: 16,
          //   paddingHorizontal: 8,
          //   flexGrow: 1,
          //   gap: 8,
          // }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <EText style={{ fontSize: 16, fontWeight: "500" }}>
                You have no wishlists
              </EText>
            </View>
          )}
          data={wishlists.wishlists.filter((item) => {
            return item.auction.title
              .toLowerCase()
              .includes(
                (typeof search === "string" ? search : "").toLowerCase()
              );
          })}
          keyExtractor={(item) => item.auction.id}
          renderItem={(item) => (
            <AssetCompactCard
              item={item.item.auction as any}
              compact={false}
              onPress={() => {
                router.navigate(`/asset/${item.item.auction.id}`);
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          // numColumns={2}
          // columnWrapperStyle={{ gap: 8 }}
        />
      </View>
    </>
  );
}
