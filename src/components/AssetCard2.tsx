import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Award, Clock, Eye, Heart, Users } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { App } from "../Constant";
import { formatCurrency, formatTimeLeft } from "../lib/format";
import { useAuctionStore } from "../store/auction-store";
import { Asset } from "../types";

// Conditionally use Animated components based on platform
const AnimatedView = Platform.OS !== "web" ? Animated.View : View;
const AnimatedTouchable =
  Platform.OS !== "web"
    ? Animated.createAnimatedComponent(TouchableOpacity)
    : TouchableOpacity;

interface AssetCardProps {
  asset: Asset;
  size?: "small" | "medium" | "large";
}

export const AssetCard2: React.FC<AssetCardProps> = ({
  asset,
  size = "medium",
}) => {
  const router = useRouter();
  const { shortlistedAssets, toggleShortlist } = useAuctionStore();

  const isShortlisted = shortlistedAssets.includes(asset.id);

  // Animation values
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);
  const heartScale = useSharedValue(1);
  const heartRotate = useSharedValue(0);
  const badgePulse = useSharedValue(1);

  useEffect(() => {
    // Initial animation
    opacity.value = withTiming(1, { duration: 400 });
    scale.value = withTiming(1, {
      duration: 400,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Pulse animation for live auctions
    if (asset.status === "live") {
      badgePulse.value = withSequence(
        withTiming(1.2, { duration: 800 }),
        withTiming(1, { duration: 800 })
      );

      const interval = setInterval(() => {
        badgePulse.value = withSequence(
          withTiming(1.2, { duration: 800 }),
          withTiming(1, { duration: 800 })
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [opacity, scale, badgePulse, asset.status]);

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 200 })
    );
    router.push(`/asset/${asset.id}`);
  };

  const handleShortlistToggle = (e: any) => {
    e.stopPropagation();

    // Heart animation
    heartScale.value = withSequence(
      withTiming(1.3, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );

    heartRotate.value = withSequence(
      withTiming(0.1, { duration: 100 }),
      withTiming(-0.1, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );

    toggleShortlist(asset.id);
  };

  const getStatusColor = (status: Asset["status"]) => {
    switch (status) {
      case "live":
        return App.colors.bidActive;
      case "upcoming":
        return App.colors.warning;
      case "ended":
        return App.colors.textTertiary;
      default:
        return App.colors.textTertiary;
    }
  };

  const getStatusText = (status: Asset["status"]) => {
    switch (status) {
      case "live":
        return "Live Now";
      case "upcoming":
        return "Upcoming";
      case "ended":
        return "Ended";
      default:
        return "";
    }
  };

  const getCardSize = () => {
    switch (size) {
      case "small":
        return styles.smallCard;
      case "large":
        return styles.largeCard;
      default:
        return styles.mediumCard;
    }
  };

  const getImageSize = () => {
    switch (size) {
      case "small":
        return styles.smallImage;
      case "large":
        return styles.largeImage;
      default:
        return styles.mediumImage;
    }
  };

  const getTimeLeft = () => {
    if (asset.status === "ended") return "Auction ended";
    if (asset.status === "upcoming") {
      return `Starts ${formatTimeLeft(new Date(asset.startTime))}`;
    }
    return `Ends ${formatTimeLeft(new Date(asset.endTime))}`;
  };

  const cardAnimStyle = useAnimatedStyle(() => {
    return {
      // opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const heartAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: heartScale.value },
        { rotate: `${heartRotate.value * 30}deg` },
      ],
    };
  });

  const badgeAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: badgePulse.value }],
    };
  });

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <AnimatedTouchable
      style={[styles.card, getCardSize(), cardAnimStyle]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: asset.images[0] }}
          style={[styles.image, getImageSize()]}
          contentFit="cover"
          transition={200}
          placeholder={{ blurhash }}
        />

        <AnimatedView style={[styles.heartButton, heartAnimStyle]}>
          <TouchableOpacity
            onPress={handleShortlistToggle}
            style={styles.heartTouchable}
          >
            <Heart
              size={20}
              color={isShortlisted ? App.colors.danger : App.colors.card}
              fill={isShortlisted ? App.colors.danger : "none"}
            />
          </TouchableOpacity>
        </AnimatedView>

        {asset.featured && (
          <View style={styles.featuredBadge}>
            <Award size={14} color={App.colors.card} />
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}

        <AnimatedView
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(asset.status) },
            asset.status === "live" && badgeAnimStyle,
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(asset.status)}</Text>
        </AnimatedView>
      </View>

      <View style={styles.content}>
        <Text style={styles.category} numberOfLines={1}>
          {asset.category.charAt(0).toUpperCase() + asset.category.slice(1)}
        </Text>

        <Text style={styles.title} numberOfLines={2}>
          {asset.title}
        </Text>

        <Text style={styles.price}>{formatCurrency(asset.currentBid)}</Text>

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Clock size={14} color={App.colors.textSecondary} />
            <Text style={styles.footerText}>{getTimeLeft()}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Eye size={14} color={App.colors.textSecondary} />
              <Text style={styles.statText}>{asset.viewCount}</Text>
            </View>

            <View style={styles.stat}>
              <Users size={14} color={App.colors.textSecondary} />
              <Text style={styles.statText}>{asset.bidCount}</Text>
            </View>
          </View>
        </View>
      </View>
    </AnimatedTouchable>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    backgroundColor: App.colors.card,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 300,
  },
  smallCard: {
    width: width / 2 - 24,
  },
  mediumCard: {
    width: width - 100,
  },
  largeCard: {
    width: width - 32,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    backgroundColor: App.colors.borderLight,
  },
  smallImage: {
    height: 120,
  },
  mediumImage: {
    height: 180,
  },
  largeImage: {
    height: 220,
  },
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
  heartTouchable: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    padding: 8,
  },
  statusBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: App.colors.card,
    fontSize: 12,
    fontWeight: "600",
  },
  featuredBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: App.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  featuredText: {
    color: App.colors.card,
    fontSize: 10,
    fontWeight: "600",
  },
  content: {
    padding: 12,
  },
  category: {
    fontSize: 12,
    color: App.colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: App.colors.primary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: App.colors.textSecondary,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: App.colors.textSecondary,
  },
});
