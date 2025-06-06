import { AssetCategory } from "@/src/types";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { App } from "../Constant";
import { HStack } from "./HStack";
import { VStack } from "./VStack";

interface CategoryCardProps {
  category: AssetCategory;
  count: number;
  style?: ViewStyle;
}
export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  count,
  style,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/category/${category}`);
  };

  const getCategoryName = (category: AssetCategory): string => {
    switch (category) {
      case "gold":
        return "Gold";
      case "vehicle":
        return "Vehicles";
      case "house":
        return "Houses";
      case "apartment":
        return "Apartment";
      default:
        return "";
    }
  };

  const getCategoryGradient = (category: AssetCategory): string[] => {
    switch (category) {
      case "gold":
        return App.colors.gradients.gold;
      case "car":
        return App.colors.gradients.vehicle;
      case "house":
        return App.colors.gradients.primary;
      case "apartment":
        return App.colors.gradients.property;
      default:
        return App.colors.gradients.primary;
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={[style]}>
      {/* <LinearGradient
        colors={[App.colors.card, App.colors.secondary]}
        // colors={getCategoryGradient(category)}]}
        // start={{ x: 0, y: 0 }}
        // end={{ x: 0, y: 0 }}
        style={styles.gradient}
      > */}
      <HStack style={styles.container}>
        <VStack justifyContent="flex-start" alignItems="flex-start">
          <Text style={styles.name}>{getCategoryName(category)}</Text>
          <Text style={styles.count}>{count} items</Text>
        </VStack>
        {category === "gold" && (
          <Image
            source={require(`@/assets/images/gold.png`)}
            style={{
              width: 60,
              height: 60,
            }}
          />
        )}
        {(category === "car" || category === "vehicle") && (
          <Image
            source={require(`@/assets/images/car.png`)}
            style={{
              width: 60,
              height: 60,
            }}
          />
        )}
        {category === "house" && (
          <Image
            source={require(`@/assets/images/house.png`)}
            style={{
              width: 70,
              height: 70,
            }}
          />
        )}
        {category === "apartment" && (
          <Image
            source={require(`@/assets/images/apartment.png`)}
            style={{
              width: 60,
              height: 60,
            }}
          />
        )}
      </HStack>
      {/* </LinearGradient> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: App.ui.borderRadius.md,
    overflow: "hidden",
    height: 100,
    minWidth: "48%",
    backgroundColor: App.colors.card,
    padding: 12,
    borderColor: App.colors.secondary,
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: App.colors.text,
  },
  count: {
    fontSize: 14,
    color: App.colors.textSecondary,
  },
});

