import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { App } from "../Constant";
import { Button } from "./Button";

const { width } = Dimensions.get("window");

export interface OnboardingPage {
  title: string;
  description: string;
  image: ImageSourcePropType;
  backgroundColor?: string;
  textColor?: string;
}

interface OnboardingScreenProps {
  pages: OnboardingPage[];
  onComplete: () => void;
  showSkip?: boolean;
  skipLabel?: string;
  nextLabel?: string;
  prevLabel?: string;
  doneLabel?: string;
  dotColor?: string;
  activeDotColor?: string;
  style?: any;
}

export function OnboardingScreen({
  pages,
  onComplete,
  showSkip = true,
  skipLabel = "Skip",
  nextLabel = "Next",
  prevLabel = "Back",
  doneLabel = "Get Started",
  dotColor = App.colors.border,
  activeDotColor = App.colors.primary,
  style,
}: OnboardingScreenProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width * (currentPage + 1),
        animated: true,
      });
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      scrollViewRef.current?.scrollTo({
        x: width * (currentPage - 1),
        animated: true,
      });
      setCurrentPage(currentPage - 1);
    }
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / width);
    setCurrentPage(page);
  };

  return (
    <SafeAreaView style={[styles.container, style]}>
      {showSkip && currentPage < pages.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={onComplete}>
          <Text style={styles.skipText}>{skipLabel}</Text>
        </TouchableOpacity>
      )}

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {pages.map((page, index) => (
          <View
            key={index}
            style={[
              styles.page,
              {
                backgroundColor: page.backgroundColor || App.colors.background,
              },
            ]}
          >
            <View style={styles.imageContainer}>
              <Image
                source={page.image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.title,
                  { color: page.textColor || App.colors.text },
                ]}
              >
                {page.title}
              </Text>
              <Text
                style={[
                  styles.description,
                  {
                    color: page.textColor
                      ? `${page.textColor}99`
                      : App.colors.textSecondary,
                  },
                ]}
              >
                {page.description}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor:
                    index === currentPage ? activeDotColor : dotColor,
                  width: index === currentPage ? 20 : 8,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          {currentPage > 0 && (
            <Button
              title={prevLabel}
              variant="text"
              onPress={handlePrev}
              icon={<ChevronLeft size={18} color={App.colors.primary} />}
              iconPosition="left"
              style={styles.prevButton}
            />
          )}

          <Button
            title={currentPage === pages.length - 1 ? doneLabel : nextLabel}
            onPress={handleNext}
            icon={
              currentPage === pages.length - 1 ? undefined : (
                <ChevronRight size={18} color="white" />
              )
            }
            iconPosition="right"
            style={styles.nextButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.colors.background,
  },
  skipButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    color: App.colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40,
  },
  image: {
    width: "100%",
    height: "80%",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 40,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prevButton: {
    flex: 1,
    marginRight: 8,
  },
  nextButton: {
    flex: 2,
  },
});
