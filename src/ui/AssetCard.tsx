import { useAuctionStore } from "@/src/store/auction-store";
import { Asset } from "@/src/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatCurrency, formatTimeLeft } from "../lib/format";

interface AssetCardProps {
  asset: Asset;
  size?: "small" | "medium" | "large";
}

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  size = "medium",
}) => {
  const router = useRouter();
  const { shortlistedAssets, toggleShortlist } = useAuctionStore();

  const isShortlisted = shortlistedAssets.includes(asset.id);

  const handlePress = () => {
    router.push(`/asset/${asset.id}`);
  };

  const handleShortlistToggle = (e: any) => {
    e.stopPropagation();
    toggleShortlist(asset.id);
  };

  const getStatusColor = (status: Asset["status"]) => {
    switch (status) {
      case "live":
      case "upcoming":
      case "ended":
      default:
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

  return (
    <TouchableOpacity
      style={[styles.card, getCardSize()]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: asset.images[0] }}
          style={[styles.image, getImageSize()]}
          contentFit="cover"
          transition={200}
        />

        <TouchableOpacity
          style={styles.heartButton}
          onPress={handleShortlistToggle}
        >
          <Heart size={20} />
        </TouchableOpacity>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(asset.status) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(asset.status)}</Text>
        </View>
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
            <Text style={styles.footerText}>{getTimeLeft()}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statText}>{asset.viewCount}</Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statText}>{asset.bidCount}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  smallCard: {
    width: width / 2 - 24,
  },
  mediumCard: {
    width: width - 32,
  },
  largeCard: {
    width: width - 32,
  },
  imageContainer: {
    position: "relative",
  },
  image: {},
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
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    padding: 12,
  },
  category: {
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
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
  },
});
