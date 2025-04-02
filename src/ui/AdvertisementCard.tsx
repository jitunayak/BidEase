import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ExternalLink } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { App } from "../Constant";

const { width } = Dimensions.get("window");

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  actionUrl: string;
  sponsor: string;
}

interface AdvertisementCardProps {
  ad: Advertisement;
  index?: number;
}

export const AdvertisementCard: React.FC<AdvertisementCardProps> = ({
  ad,
  index = 0,
}) => {
  const router = useRouter();
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    opacity.value = withDelay(
      index * 100,
      withSpring(1, { damping: 20, stiffness: 90 })
    );
    scale.value = withDelay(
      index * 100,
      withSpring(1, { damping: 20, stiffness: 90 })
    );
  }, [opacity, scale, index]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    // For external URLs, we would use Linking.openURL
    // For internal routes, we use router.push
    if (ad.actionUrl.startsWith("http")) {
      // In a real app, we would use Linking.openURL(ad.actionUrl)
      console.log("Opening external URL:", ad.actionUrl);
    } else {
      router.push(ad.actionUrl);
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: ad.imageUrl }}
            style={styles.image}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.sponsorBadge}>
            <Text style={styles.sponsorText}>Ad • {ad.sponsor}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {ad.title}
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            {ad.description}
          </Text>

          <TouchableOpacity style={styles.actionButton} onPress={handlePress}>
            <Text style={styles.actionText}>Learn More</Text>
            <ExternalLink size={16} color={App.colors.primary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    marginRight: 16,
  },
  card: {
    backgroundColor: App.colors.card,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 140,
    backgroundColor: App.colors.borderLight,
  },
  sponsorBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sponsorText: {
    color: App.colors.card,
    fontSize: 10,
    fontWeight: "500",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: App.colors.primary,
    marginRight: 4,
  },
});
