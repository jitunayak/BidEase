import { AssetCard2 } from "@/src/components/AssetCard2";
import { App } from "@/src/Constant";
import { advertisements } from "@/src/mocks/advertisements";
import { banners } from "@/src/mocks/banner";
import { useAuctionStore } from "@/src/store/auction-store";
import { useAuthStore } from "@/src/store/auth-store";
import { useNotificationStore } from "@/src/store/notification-store";
import { AssetCategory } from "@/src/types";
import { AdvertisementCard } from "@/src/ui/AdvertisementCard";
import { BannerCarousel } from "@/src/ui/BannerCaraousel";
import { CategoryCard } from "@/src/ui/CategoryCard";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Bell, Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

// Conditionally use Animated components based on platform
const AnimatedView = Platform.OS !== "web" ? Animated.View : View;
const AnimatedFlatList = Platform.OS !== "web" ? Animated.FlatList : FlatList;
const AnimatedScrollView =
  Platform.OS !== "web" ? Animated.ScrollView : ScrollView;

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    assets,
    featuredAssets,
    fetchAssets,
    fetchFeaturedAssets,
    isLoading,
  } = useAuctionStore();
  const { notifications, unreadCount, fetchNotifications } =
    useNotificationStore();

  const [refreshing, setRefreshing] = useState(false);
  // const scrollY = useRef(new RNAnimated.Value(0)).current;
  const headerOpacity = useSharedValue(1);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    await Promise.all([
      fetchAssets(),
      fetchFeaturedAssets(),
      fetchNotifications(),
    ]);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleNotificationsPress = () => {
    router.push("/notifications");
  };

  const handleSearchPress = () => {
    router.push("/search");
  };

  const handleSeeAllFeatured = () => {
    router.push("/search?featured=true");
  };

  const handleSeeAllLive = () => {
    router.push("/search?status=live");
  };

  const handleCategoryPress = (category: AssetCategory) => {
    router.push(`/category/${category}`);
  };

  const liveAuctions = assets.filter((asset) => asset.status === "live");

  const categories: AssetCategory[] = ["gold", "vehicle", "house", "apartment"];

  const getCategoryCount = (category: AssetCategory) => {
    return assets.filter((asset) => asset.category === category).length;
  };

  const headerAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    };
  });

  // const handleScroll = RNAnimated.event(
  //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
  //   { useNativeDriver: true }
  // );

  // const headerTranslateY = scrollY.interpolate({
  //   inputRange: [0, 50],
  //   outputRange: [0, -10],
  //   extrapolate: "clamp",
  // });

  // const headerScale = scrollY.interpolate({
  //   inputRange: [0, 50],
  //   outputRange: [1, 0.96],
  //   extrapolate: "clamp",
  // });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={[styles.header]}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name.split(" ")[0]}</Text>
          <Text style={styles.subtitle}>Find your next investment</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleSearchPress}
          >
            <Search size={24} color={App.colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleNotificationsPress}
          >
            <Bell size={24} color={App.colors.text} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <AnimatedScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        // onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[App.colors.primary]}
            tintColor={App.colors.primary}
          />
        }
      >
        {/* Banners */}
        <AnimatedView entering={FadeInDown.delay(100).duration(600)}>
          <BannerCarousel banners={banners} />
        </AnimatedView>

        {/* Categories */}
        <AnimatedView
          style={styles.section}
          entering={FadeInDown.delay(200).duration(600)}
        >
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <AnimatedView
                key={category}
                entering={FadeInRight.delay(300 + index * 100).duration(600)}
              >
                <CategoryCard
                  category={category}
                  count={getCategoryCount(category)}
                  style={styles.categoryCard}
                  // onPress={() => handleCategoryPress(category)}
                />
              </AnimatedView>
            ))}
          </View>
        </AnimatedView>

        {/* Featured Auctions */}
        <AnimatedView
          style={styles.section}
          entering={FadeInDown.delay(400).duration(600)}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Auctions</Text>
            <TouchableOpacity onPress={handleSeeAllFeatured}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <AnimatedFlatList
            data={featuredAssets.slice(0, 5)}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
            renderItem={({ item, index }) => (
              <AnimatedView
                style={styles.featuredItem}
                entering={FadeInRight.delay(500 + index * 100).duration(600)}
              >
                <AssetCard2 asset={item} size="medium" />
              </AnimatedView>
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No featured auctions available
                </Text>
              </View>
            }
          />
        </AnimatedView>

        {/* Advertisements */}
        <AnimatedView
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
        </AnimatedView>

        {/* Live Auctions */}
        <AnimatedView
          style={styles.section}
          entering={FadeInDown.delay(700).duration(600)}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Live Auctions</Text>
            <TouchableOpacity onPress={handleSeeAllLive}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {liveAuctions.slice(0, 3).map((asset, index) => (
            <AnimatedView
              key={asset.id}
              style={styles.liveAuctionItem}
              entering={FadeInDown.delay(800 + index * 100).duration(600)}
            >
              <AssetCard2 asset={asset} size="large" />
            </AnimatedView>
          ))}

          {liveAuctions.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No live auctions available
              </Text>
            </View>
          )}
        </AnimatedView>
      </AnimatedScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: App.colors.card,
    zIndex: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: App.colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: App.colors.borderLight,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: App.colors.danger,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: App.colors.card,
    fontSize: 10,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
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
  },
  categoryCard: {
    width: "48%",
    marginBottom: 16,
  },
  featuredList: {
    paddingRight: 16,
  },
  featuredItem: {
    marginRight: 16,
    width: 280,
  },
  adsList: {
    paddingRight: 16,
  },
  liveAuctionItem: {
    marginBottom: 16,
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
});
