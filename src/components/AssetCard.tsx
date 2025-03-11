import { Colors } from "@/src/Constant";
import Octicons from "@expo/vector-icons/Octicons";
import { BlurView } from "expo-blur";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { uiStyles } from "../Theme";
type Props = {
  id: string;
  title: string;
  bid: number;
  time: string;
  image: string;
  onPress: () => void;
};

export default function AssetCard(props: Props) {
  return (
    <View>
      <BlurView
        intensity={100}
        style={{
          width: 300,
          height: 140,
          position: "absolute",
          bottom: 0,
          zIndex: 2,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          overflow: "hidden",
        }}
      >
        <View style={{ padding: 12, gap: 8, zIndex: 3 }}>
          <Text
            testID="title"
            style={{ color: Colors.text, fontSize: 16, zIndex: 3 }}
          >
            {props.title}
          </Text>
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
                style={{
                  color: Colors.primary,
                  fontWeight: "700",
                  fontSize: 20,
                }}
              >
                ₹{props.bid.toLocaleString()}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Octicons name="clock" size={16} color={Colors.error} />
              <Text style={{ color: Colors.error }}>{props.time}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={props.onPress}
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
      </BlurView>

      <Image
        source={{ uri: props.image }}
        style={{
          width: 300,
          height: 140,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          position: "absolute",
          bottom: 0,
          zIndex: 1,
          overflow: "hidden",
          opacity: 0.3,
        }}
      />

      <TouchableOpacity
        key={props.id}
        onPress={() => props.onPress()}
        style={{
          gap: 8,
          width: 300,
          height: 300,
          borderWidth: 0.6,
          borderColor: Colors.border,
          borderRadius: 16,
          marginRight: 16,
          backgroundColor: Colors.background,
          ...uiStyles.shadow,
        }}
      >
        <Image
          source={{ uri: props.image }}
          style={{
            width: 300,
            height: 160,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
