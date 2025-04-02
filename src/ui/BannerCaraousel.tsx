import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { App } from "../Constant";

const { width } = Dimensions.get("window");

export interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  actionText: string;
  actionUrl: string;
  backgroundColor: string;
  textColor: string;
}

interface BannerCarouselProps {
  banners: Banner[];
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  banners,
  autoScroll = true,
  autoScrollInterval = 5000,
}) => {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (autoScroll && banners.length > 1) {
      intervalId = setInterval(() => {
        if (flatListRef.current) {
          const nextIndex = (currentIndex + 1) % banners.length;
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
      }, autoScrollInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentIndex, banners.length, autoScroll, autoScrollInterval]);

  const handleBannerPress = (actionUrl: string) => {
    router.push(actionUrl as any);
  };

  const renderItem = ({ item }: { item: Banner }) => {
    return (
      <Pressable
        style={[
          styles.bannerContainer,
          { backgroundColor: item.backgroundColor || App.colors.primary },
        ]}
        onPress={() => handleBannerPress(item.actionUrl)}
      >
        <View style={styles.bannerContent}>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                { color: item.textColor || App.colors.card },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: item.textColor || App.colors.card },
              ]}
            >
              {item.subtitle}
            </Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleBannerPress(item.actionUrl)}
            >
              <Text style={styles.actionText}>{item.actionText}</Text>
              <ArrowRight size={16} color={App.colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              contentFit="contain"
              transition={300}
            />
          </View>
        </View>
      </Pressable>
    );
  };

  const renderDotIndicator = () => {
    return (
      <View style={styles.paginationContainer}>
        {banners.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[
                styles.dot,
                { width: dotWidth, opacity },
                currentIndex === index && styles.activeDot,
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      {banners.length > 1 && renderDotIndicator()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: "100%",
    marginBottom: 8,
  },
  bannerContainer: {
    width: width - 30,
    height: 160,
    // marginHorizontal: 2,
    marginLeft: 4,
    marginRight: 8,
    borderRadius: App.ui.borderRadius.sm,
    overflow: "hidden",
  },
  bannerContent: {
    flexDirection: "row",
    height: "100%",
    padding: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.9,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: App.colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: App.colors.primary,
    marginRight: 4,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: App.colors.primary,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: App.colors.primary,
  },
});
