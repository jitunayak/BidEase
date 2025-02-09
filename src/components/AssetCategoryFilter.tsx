import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { View } from "react-native";
import { Colors } from "../Constant";
import FilledRoundIcon from "./FilledRoundIcon";

type IProps = {
  active?: number;
  onChange: (index: number) => void;
};
export default function AssetCategoryFilter(props: IProps) {
  return (
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
        onPress={() => props.onChange(1)}
        title="Vehicles"
        color={props.active === 1 ? Colors.primary : Colors.secondary}
        icon={
          <FontAwesome
            name="car"
            size={22}
            color={props.active === 1 ? Colors.primary : Colors.border}
          />
        }
      />
      <FilledRoundIcon
        onPress={() => props.onChange(2)}
        title="Lands"
        color={props.active === 2 ? Colors.primary : Colors.secondary}
        icon={
          <MaterialIcons
            name="landscape"
            size={26}
            color={props.active === 2 ? Colors.primary : Colors.border}
          />
        }
      />
      <FilledRoundIcon
        onPress={() => props.onChange(3)}
        title="Property"
        color={props.active === 3 ? Colors.primary : Colors.secondary}
        icon={
          <FontAwesome
            name="home"
            size={24}
            color={props.active === 3 ? Colors.primary : Colors.border}
          />
        }
      />
      <FilledRoundIcon
        onPress={() => props.onChange(4)}
        title="Gold"
        color={props.active === 4 ? Colors.primary : Colors.secondary}
        icon={
          <MaterialCommunityIcons
            name="gold"
            size={26}
            color={props.active === 4 ? Colors.primary : Colors.border}
          />
        }
      />
    </View>
  );
}
