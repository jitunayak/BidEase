import { App } from "@/src/Constant";
import { useAuctionQuery } from "@/src/gql/generated";
import {
  formatCurrency,
  formatDate,
  formatTime,
  formatTimeLeft,
} from "@/src/lib/format";
import { useAuctionStore } from "@/src/store/auction-store";
import { Bid } from "@/src/types";
import { Button } from "@/src/ui";
import { BidItem } from "@/src/ui/BidItem";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Building,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Heart,
  IndianRupeeIcon,
  MapPin,
  Share2,
  Users,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AssetDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const auctionQuery = useAuctionQuery({
    variables: { id },
  });

  const {
    fetchAssetById,

    shortlistedAssets,
    toggleShortlist,
    placeBid,
    fetchBidsForAsset,
    isLoading,
  } = useAuctionStore();

  const [bids, setBids] = useState<Bid[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [showBidForm, setShowBidForm] = useState(false);

  useEffect(() => {
    if (id) {
      loadAssetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadAssetData = async () => {
    try {
      await fetchAssetById(id);
      const assetBids = await fetchBidsForAsset(id);
      setBids(assetBids);
    } catch (error) {
      console.error("Error loading asset data:", error);
    }
  };

  const handleShortlistToggle = () => {
    //  FIX ME
  };

  const handleShare = () => {
    // In a real app, this would use the Share API
    Alert.alert("Share", "Sharing functionality would be implemented here");
  };

  if (
    auctionQuery.loading ||
    auctionQuery.error ||
    !auctionQuery.data ||
    !auctionQuery.data.auction
  ) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar style="dark" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handleNextImage = () => {
    if (
      auctionQuery.data?.auction?.images &&
      activeImageIndex < auctionQuery.data.auction.images.length - 1
    ) {
      setActiveImageIndex(activeImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  const handleBidAmountChange = (text: string) => {
    // Allow only numbers
    if (/^\d*$/.test(text)) {
      setBidAmount(text);
    }
  };

  const handlePlaceBid = async () => {
    if (!auctionQuery.data?.auction) return;

    const amount = parseInt(bidAmount, 10);

    if (isNaN(amount)) {
      Alert.alert("Invalid Amount", "Please enter a valid bid amount");
      return;
    }

    if (amount <= auctionQuery.data.auction.currentBid!) {
      Alert.alert(
        "Bid Too Low",
        `Your bid must be higher than the current bid of ${formatCurrency(
          auctionQuery.data.auction.currentBid!
        )}`
      );
      return;
    }

    if (
      amount <
      auctionQuery.data.auction.startingBid! +
        auctionQuery.data.auction.incrementAmount
    ) {
      Alert.alert(
        "Bid Too Low",
        `Minimum bid increment is ${formatCurrency(
          auctionQuery.data.auction.incrementAmount
        )}`
      );
      return;
    }

    try {
      await placeBid(auctionQuery.data.auction.id, amount);

      // Refresh bids
      const updatedBids = await fetchBidsForAsset(auctionQuery.data.auction.id);
      setBids(updatedBids);

      // Hide bid form
      setShowBidForm(false);

      Alert.alert(
        "Bid Placed",
        `Your bid of ${formatCurrency(amount)} has been placed successfully`
      );
    } catch (error) {
      Alert.alert("Error", "Failed to place bid. Please try again.");
    }
  };

  const handleBuyNow = () => {
    if (auctionQuery.data?.auction) {
      const asset = auctionQuery.data.auction;
      router.push({
        pathname: "/payment/checkout",
        params: { assetId: asset.id, amount: String(asset?.currentBid) },
      });
    }
  };

  // const isShortlisted = asset ? shortlistedAssets.includes(asset.id) : false;

  const isLive = auctionQuery.data.auction.status === "live";
  const isEnded = auctionQuery.data.auction.status === "ended";
  const isUpcoming = auctionQuery.data.auction.status === "upcoming";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleShortlistToggle}
              >
                <Heart
                  size={24}
                  color={true ? App.colors.danger : App.colors.text}
                  fill={true ? App.colors.danger : "none"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleShare}
              >
                <Share2 size={24} color={App.colors.text} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: auctionQuery.data.auction.images[activeImageIndex],
            }}
            style={styles.image}
            contentFit="cover"
            placeholder={{ blurhash: "LjIOX|xvV?a#pfSPaxofxvRPt7fl" }}
          />

          {auctionQuery.data.auction.images.length > 1 && (
            <>
              <TouchableOpacity
                style={[styles.imageNavButton, styles.prevButton]}
                onPress={handlePrevImage}
                disabled={activeImageIndex === 0}
              >
                <ChevronLeft size={24} color={App.colors.card} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.imageNavButton, styles.nextButton]}
                onPress={handleNextImage}
                disabled={
                  activeImageIndex ===
                  auctionQuery.data.auction.images.length - 1
                }
              >
                <ChevronRight size={24} color={App.colors.card} />
              </TouchableOpacity>

              <View style={styles.imagePagination}>
                <Text style={styles.paginationText}>
                  {activeImageIndex + 1} /{" "}
                  {auctionQuery.data.auction.images.length}
                </Text>
              </View>
            </>
          )}

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isLive
                  ? App.colors.bidActive
                  : isUpcoming
                  ? App.colors.warning
                  : App.colors.textTertiary,
              },
            ]}
          >
            <Text style={styles.statusText}>
              {isLive ? "Live Now" : isUpcoming ? "Upcoming" : "Ended"}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>
            {auctionQuery.data.auction.category.charAt(0).toUpperCase() +
              auctionQuery.data.auction.category.slice(1)}
          </Text>

          <Text style={styles.title}>{auctionQuery.data.auction.title}</Text>

          <View style={styles.bankInfo}>
            <Building size={16} color={App.colors.textSecondary} />
            <Text style={styles.bankName}>
              {auctionQuery.data.auction.bankId}
            </Text>
          </View>

          <View style={styles.locationContainer}>
            <MapPin size={16} color={App.colors.textSecondary} />
            <Text style={styles.location}>
              {auctionQuery.data.auction.location}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Eye size={16} color={App.colors.textSecondary} />
              <Text style={styles.statText}>
                {auctionQuery.data.auction.viewCount} views
              </Text>
            </View>

            <View style={styles.stat}>
              <Users size={16} color={App.colors.textSecondary} />
              <Text style={styles.statText}>
                {auctionQuery.data.auction.bidCount} bids
              </Text>
            </View>

            <View style={styles.stat}>
              <Clock size={16} color={App.colors.textSecondary} />
              <Text style={styles.statText}>
                {isEnded
                  ? "Auction ended"
                  : isUpcoming
                  ? `Starts ${formatTimeLeft(
                      new Date(Number(auctionQuery.data.auction.startTime))
                    )}`
                  : `Ends ${formatTimeLeft(
                      new Date(Number(auctionQuery.data.auction.endTime))
                    )}`}
              </Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Current Bid</Text>
            <Text style={styles.price}>
              {formatCurrency(auctionQuery.data.auction.currentBid!)}
            </Text>
            <Text style={styles.basePrice}>
              Base Price: {formatCurrency(auctionQuery.data.auction.basePrice)}
            </Text>
          </View>

          {isLive && (
            <View style={styles.bidActions}>
              {showBidForm ? (
                <View style={styles.bidForm}>
                  <Text style={styles.bidFormTitle}>Place Your Bid</Text>
                  <Text style={styles.bidFormSubtitle}>
                    Minimum bid:{" "}
                    {formatCurrency(
                      auctionQuery.data.auction.currentBid! +
                        auctionQuery.data.auction.incrementAmount
                    )}
                  </Text>

                  <View style={styles.bidInputContainer}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                      style={styles.bidInput}
                      value={bidAmount}
                      onChangeText={handleBidAmountChange}
                      keyboardType="number-pad"
                      placeholder="Enter bid amount"
                    />
                  </View>

                  <View style={styles.bidFormButtons}>
                    <Button
                      title="Cancel"
                      variant="outline"
                      size="md"
                      onPress={() => setShowBidForm(false)}
                      style={{ flex: 1 }}
                    />
                    <Button
                      title="Place Bid"
                      variant="primary"
                      size="md"
                      onPress={handlePlaceBid}
                      isLoading={isLoading}
                      style={{ flex: 1 }}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.bidButtons}>
                  <Button
                    title="Place Bid"
                    variant="primary"
                    size="md"
                    leftIcon={<IndianRupeeIcon size={20} color="#FFFFFF" />}
                    onPress={() => setShowBidForm(true)}
                    style={{ flex: 1 }}
                  />
                  <Button
                    title="Buy Now"
                    variant="secondary"
                    size="md"
                    onPress={handleBuyNow}
                    style={{ flex: 1 }}
                  />
                </View>
              )}
            </View>
          )}

          {isEnded && (
            <View style={styles.endedMessage}>
              <Text style={styles.endedText}>
                This auction has ended on{" "}
                {formatDate(new Date(auctionQuery.data.auction.endTime))} at{" "}
                {formatTime(new Date(auctionQuery.data.auction.endTime))}
              </Text>
            </View>
          )}

          {isUpcoming && (
            <View style={styles.upcomingMessage}>
              <Text style={styles.upcomingText}>
                This auction will start on{" "}
                {formatDate(new Date(auctionQuery.data.auction.startTime))} at{" "}
                {formatTime(new Date(auctionQuery.data.auction.startTime))}
              </Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {auctionQuery.data.auction.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bid History</Text>

            {bids.length > 0 ? (
              <View style={styles.bidsContainer}>
                {bids.map((bid) => (
                  <BidItem
                    key={bid.id}
                    bid={bid}
                    isCurrentUserBid={bid.userId === "1"} // Assuming current user ID is '1'
                  />
                ))}
              </View>
            ) : (
              <View style={styles.noBids}>
                <Text style={styles.noBidsText}>
                  No bids have been placed yet
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  headerActions: {
    flexDirection: "row",
    gap: 16,
    marginRight: 8,
  },
  headerButton: {
    padding: 4,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: App.colors.borderLight,
  },
  imageNavButton: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  prevButton: {
    left: 16,
  },
  nextButton: {
    right: 16,
  },
  imagePagination: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paginationText: {
    color: App.colors.card,
    fontSize: 12,
    fontWeight: "500",
  },
  statusBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  statusText: {
    color: App.colors.card,
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },
  category: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: App.colors.text,
    marginBottom: 12,
  },
  bankInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  bankName: {
    fontSize: 14,
    color: App.colors.textSecondary,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 6,
  },
  location: {
    fontSize: 14,
    color: App.colors.textSecondary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    padding: 12,
    backgroundColor: App.colors.card,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 12,
    color: App.colors.textSecondary,
  },
  priceContainer: {
    padding: 16,
    backgroundColor: App.colors.card,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: App.colors.primary,
    marginBottom: 4,
  },
  basePrice: {
    fontSize: 14,
    color: App.colors.textTertiary,
  },
  bidActions: {
    marginBottom: 24,
  },
  bidButtons: {
    flexDirection: "row",
    gap: 12,
  },
  bidForm: {
    padding: 16,
    backgroundColor: App.colors.card,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bidFormTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 4,
  },
  bidFormSubtitle: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginBottom: 16,
  },
  bidInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: App.colors.border,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 18,
    color: App.colors.textSecondary,
    marginRight: 8,
  },
  bidInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 12,
    color: App.colors.text,
  },
  bidFormButtons: {
    flexDirection: "row",
    gap: 12,
  },
  endedMessage: {
    padding: 16,
    backgroundColor: "rgba(142, 142, 147, 0.1)",
    borderRadius: 8,
    marginBottom: 24,
  },
  endedText: {
    fontSize: 14,
    color: App.colors.textSecondary,
    textAlign: "center",
  },
  upcomingMessage: {
    padding: 16,
    backgroundColor: "rgba(255, 149, 0, 0.1)",
    borderRadius: 8,
    marginBottom: 24,
  },
  upcomingText: {
    fontSize: 14,
    color: App.colors.warning,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: App.colors.textSecondary,
  },
  bidsContainer: {
    backgroundColor: App.colors.card,
    borderRadius: 8,
    overflow: "hidden",
  },
  noBids: {
    padding: 24,
    backgroundColor: App.colors.card,
    borderRadius: 8,
    alignItems: "center",
  },
  noBidsText: {
    fontSize: 14,
    color: App.colors.textSecondary,
  },
});
