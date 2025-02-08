import { Colors } from "@/src/Constant";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  title: string;
  bid: number;
  time: string;
  image: ImageSourcePropType;
};

export default function AssetCard(props: Props) {
  return (
    <View
      style={{
        gap: 8,
        width: 300,
        borderWidth: 0.6,
        borderColor: Colors.border,
        borderRadius: 16,
        marginRight: 8,
        backgroundColor: Colors.background,
      }}
    >
      <Image
        source={props.image}
        style={{
          width: 300,
          height: 160,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />
      <View style={{ padding: 12, gap: 8 }}>
        <Text style={{ color: Colors.text, fontSize: 16 }}>{props.title}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: Colors.secondary }}>Current Bid</Text>
            <Text
              style={{ color: Colors.primary, fontWeight: "700", fontSize: 20 }}
            >
              ₹{props.bid.toLocaleString()}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Octicons name="clock" size={16} color={Colors.error} />
            <Text style={{ color: Colors.error }}>{props.time}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: Colors.background,
              fontSize: 16,
              alignSelf: "center",
            }}
          >
            Place Bid
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
