import { AssetCategory } from "@/src/types";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { App } from "../Constant";

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
        return "Apartments";
      default:
        return "";
    }
  };

  const getCategoryGradient = (category: AssetCategory): string[] => {
    switch (category) {
      case "gold":
        return App.colors.gradients.gold;
      case "vehicle":
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
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={[styles.container, style]}
    >
      <LinearGradient
        colors={getCategoryGradient(category)}
        // start={{ x: 0, y: 0 }}
        // end={{ x: 0, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.name}>{getCategoryName(category)}</Text>
        <Text style={styles.count}>{count} items</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    height: 100,
    minWidth: 160,
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: App.colors.card,
  },
  count: {
    fontSize: 14,
    fontWeight: "500",
    color: App.colors.card,
    opacity: 0.9,
  },
});
