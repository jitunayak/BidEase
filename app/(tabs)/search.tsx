import { AssetCard2 } from "@/src/components/AssetCard2";
import { App } from "@/src/Constant";
import { useAuctionStore } from "@/src/store/auction-store";
import { Asset, AssetCategory } from "@/src/types";
import { FilterModal, FilterOptions } from "@/src/ui/FilterModal";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Search as SearchIcon,
  SlidersHorizontal,
  X,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Conditionally use Animated components based on platform
const AnimatedView = Platform.OS !== "web" ? Animated.View : View;
const AnimatedFlatList = Platform.OS !== "web" ? Animated.FlatList : FlatList;

export default function SearchScreen() {
  const params = useLocalSearchParams<{
    featured?: string;
    status?: string;
    category?: string;
  }>();
  const { assets, searchAssets, isLoading } = useAuctionStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Asset[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});

  const filterButtonScale = useSharedValue(1);

  useEffect(() => {
    // Apply URL params as filters
    const initialFilters: FilterOptions = {};

    if (params.featured === "true") {
      initialFilters.featured = true;
    }

    if (
      params.status &&
      ["live", "upcoming", "ended"].includes(params.status)
    ) {
      initialFilters.status = [params.status as "live" | "upcoming" | "ended"];
    }

    if (
      params.category &&
      ["gold", "vehicle", "house", "apartment"].includes(params.category)
    ) {
      initialFilters.categories = [params.category as AssetCategory];
    }

    setActiveFilters(initialFilters);

    // Apply initial filters
    applyFilters(assets, "", initialFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, assets]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      applyFilters(assets, "", activeFilters);
      return;
    }

    const results = await searchAssets(searchQuery);
    applyFilters(results, searchQuery, activeFilters);
  };

  const applyFilters = (
    items: Asset[],
    query: string,
    filters: FilterOptions
  ) => {
    let filteredResults = [...items];

    // Apply search query if provided
    if (query) {
      const normalizedQuery = query.toLowerCase().trim();
      filteredResults = filteredResults.filter(
        (asset) =>
          asset.title.toLowerCase().includes(normalizedQuery) ||
          asset.description.toLowerCase().includes(normalizedQuery) ||
          asset.location.toLowerCase().includes(normalizedQuery) ||
          asset.bankName.toLowerCase().includes(normalizedQuery)
      );
    }

    // Apply category filter
    if (filters.categories && filters.categories.length > 0) {
      filteredResults = filteredResults.filter((asset) =>
        filters.categories?.includes(asset.category)
      );
    }

    // Apply status filter
    if (filters.status && filters.status.length > 0) {
      filteredResults = filteredResults.filter((asset) =>
        filters.status?.includes(asset.status)
      );
    }

    // Apply featured filter
    if (filters.featured) {
      filteredResults = filteredResults.filter((asset) => asset.featured);
    }

    // Apply price range filter
    if (filters.priceRange) {
      filteredResults = filteredResults.filter(
        (asset) =>
          asset.currentBid >= (filters.priceRange?.min || 0) &&
          asset.currentBid <= (filters.priceRange?.max || Infinity)
      );
    }

    // Apply bank filter
    if (filters.banks && filters.banks.length > 0) {
      filteredResults = filteredResults.filter((asset) =>
        filters.banks?.includes(asset.bankName)
      );
    }

    // Apply state filter (assuming assets have a state property)
    if (filters.states && filters.states.length > 0) {
      filteredResults = filteredResults.filter((asset) => {
        // Extract state from location (assuming format like "City, State")
        const locationParts = asset.location.split(",");
        const state =
          locationParts.length > 1
            ? locationParts[1].trim()
            : locationParts[0].trim();

        return filters.states?.includes(state);
      });
    }

    setSearchResults(filteredResults);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    applyFilters(assets, "", activeFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const openFilterModal = () => {
    setShowFilterModal(true);
  };

  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    applyFilters(assets, searchQuery, filters);
  };

  const handleFilterSelect = (
    type: "category" | "status" | "featured",
    value: any
  ) => {
    const newFilters = { ...activeFilters };

    if (type === "category") {
      const categories = newFilters.categories || [];
      if (categories.includes(value)) {
        newFilters.categories = categories.filter((c) => c !== value);
      } else {
        newFilters.categories = [...categories, value];
      }
    } else if (type === "status") {
      const statuses = newFilters.status || [];
      if (statuses.includes(value)) {
        newFilters.status = statuses.filter((s) => s !== value);
      } else {
        newFilters.status = [...statuses, value];
      }
    } else if (type === "featured") {
      newFilters.featured = !newFilters.featured;
    }

    setActiveFilters(newFilters);
    applyFilters(assets, searchQuery, newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    applyFilters(assets, searchQuery, {});
  };

  const renderFilterButton = (
    label: string,
    isActive: boolean,
    onPress: () => void
  ) => (
    <TouchableOpacity
      style={[styles.filterButton, isActive && styles.activeFilterButton]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterButtonText,
          isActive && styles.activeFilterButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const getActiveFiltersCount = () => {
    let count = 0;
    if (activeFilters.categories) count += activeFilters.categories.length;
    if (activeFilters.status) count += activeFilters.status.length;
    if (activeFilters.featured) count++;
    if (activeFilters.banks) count += activeFilters.banks.length;
    if (activeFilters.states) count += activeFilters.states.length;
    if (activeFilters.priceRange) count++;
    if (activeFilters.assetAge) count++;
    return count;
  };

  const filterButtonAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: filterButtonScale.value }],
    };
  });

  useEffect(() => {
    // Animate the filter button when filters change
    filterButtonScale.value = withTiming(1.2, { duration: 200 }, () => {
      filterButtonScale.value = withTiming(1, { duration: 200 });
    });
  }, [activeFilters, filterButtonScale]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <AnimatedView style={styles.header} entering={FadeIn.duration(300)}>
        <View style={styles.searchContainer}>
          <SearchIcon
            size={20}
            color={App.colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search assets, locations, banks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={handleClearSearch}
              style={styles.clearButton}
            >
              <X size={18} color={App.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <Animated.View style={filterButtonAnimStyle}>
          <TouchableOpacity
            style={[
              styles.filterToggle,
              getActiveFiltersCount() > 0 && styles.activeFilterToggle,
            ]}
            onPress={openFilterModal}
          >
            <SlidersHorizontal
              size={20}
              color={
                getActiveFiltersCount() > 0 ? App.colors.card : App.colors.text
              }
            />
            {getActiveFiltersCount() > 0 && (
              <View style={styles.filterCountBadge}>
                <Text style={styles.filterCountText}>
                  {getActiveFiltersCount()}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      </AnimatedView>

      {showFilters && (
        <AnimatedView
          style={styles.filtersContainer}
          entering={FadeInDown.duration(300)}
        >
          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Categories</Text>
            </View>
            <View style={styles.filterOptions}>
              {renderFilterButton(
                "Gold",
                activeFilters.categories?.includes("gold"),
                () => handleFilterSelect("category", "gold")
              )}
              {renderFilterButton(
                "Vehicles",
                activeFilters.categories?.includes("vehicle"),
                () => handleFilterSelect("category", "vehicle")
              )}
              {renderFilterButton(
                "Houses",
                activeFilters.categories?.includes("house"),
                () => handleFilterSelect("category", "house")
              )}
              {renderFilterButton(
                "Apartments",
                activeFilters.categories?.includes("apartment"),
                () => handleFilterSelect("category", "apartment")
              )}
            </View>
          </View>

          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Status</Text>
            </View>
            <View style={styles.filterOptions}>
              {renderFilterButton(
                "Live",
                activeFilters.status?.includes("live"),
                () => handleFilterSelect("status", "live")
              )}
              {renderFilterButton(
                "Upcoming",
                activeFilters.status?.includes("upcoming"),
                () => handleFilterSelect("status", "upcoming")
              )}
              {renderFilterButton(
                "Ended",
                activeFilters.status?.includes("ended"),
                () => handleFilterSelect("status", "ended")
              )}
            </View>
          </View>

          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Other</Text>
            </View>
            <View style={styles.filterOptions}>
              {renderFilterButton("Featured", !!activeFilters.featured, () =>
                handleFilterSelect("featured", true)
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.clearFiltersButton}
            onPress={clearAllFilters}
          >
            <Text style={styles.clearFiltersText}>Clear All Filters</Text>
          </TouchableOpacity>
        </AnimatedView>
      )}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={App.colors.primary} />
        </View>
      ) : (
        <AnimatedFlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          entering={FadeIn.duration(300)}
          renderItem={({ item, index }) => (
            <AnimatedView
              style={styles.cardContainer}
              entering={FadeInDown.delay(100 * index).duration(300)}
            >
              <AssetCard2 asset={item} size="large" />
            </AnimatedView>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No results found</Text>
              <Text style={styles.emptyStateText}>
                Try adjusting your search or filters to find what you're looking
                for
              </Text>
            </View>
          }
        />
      )}

      <FilterModal
        visible={showFilterModal}
        onClose={closeFilterModal}
        onApply={handleApplyFilters}
        initialFilters={activeFilters}
      />
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
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: App.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: App.colors.borderLight,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: App.colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: App.colors.text,
  },
  clearButton: {
    padding: 4,
  },
  filterToggle: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: App.colors.borderLight,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  activeFilterToggle: {
    backgroundColor: App.colors.primary,
  },
  filterCountBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: App.colors.danger,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  filterCountText: {
    color: App.colors.card,
    fontSize: 10,
    fontWeight: "bold",
  },
  filtersContainer: {
    backgroundColor: App.colors.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: App.colors.borderLight,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.text,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: App.colors.borderLight,
  },
  activeFilterButton: {
    backgroundColor: App.colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: App.colors.textSecondary,
  },
  activeFilterButtonText: {
    color: App.colors.card,
    fontWeight: "500",
  },
  clearFiltersButton: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  clearFiltersText: {
    fontSize: 14,
    color: App.colors.danger,
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: App.colors.card,
    borderRadius: 12,
    marginVertical: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: App.colors.textSecondary,
    textAlign: "center",
  },
});
