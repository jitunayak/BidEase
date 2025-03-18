import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Text, View } from "react-native";
import { Colors } from "../Constant";
import FilledRoundIcon from "./FilledRoundIcon";

export const AssetCategory = () => {
  return (
    <View style={{ backgroundColor: Colors.background, paddingVertical: 16 }}>
      <Text
        style={{
          marginLeft: 8,
          marginBottom: 32,
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        Categories
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 32,
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 32,
        }}
      >
        <FilledRoundIcon
          title="Vehicles"
          icon={<FontAwesome name="car" size={22} color={Colors.primary} />}
        />
        <FilledRoundIcon
          title="Lands"
          icon={
            <MaterialIcons name="landscape" size={26} color={Colors.primary} />
          }
        />
        <FilledRoundIcon
          title="Property"
          icon={<FontAwesome name="home" size={24} color={Colors.primary} />}
        />
        <FilledRoundIcon
          title="Gold"
          icon={
            <MaterialCommunityIcons
              name="gold"
              size={26}
              color={Colors.primary}
            />
          }
        />
      </View>
    </View>
  );
};
