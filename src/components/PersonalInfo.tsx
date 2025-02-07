import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../Constanst";

export default function PersonalInfo() {
  return (
    <>
      <View
        style={{
          padding: 8,
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: 8,
        }}
      >
        <Image
          source={require("../../assets/images/profile.png")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            display: "flex",
            alignSelf: "center",
          }}
        />
        <TouchableOpacity>
          <Text style={{ color: Colors.primary, fontSize: 14 }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: Colors.text,
          fontSize: 20,
          fontWeight: "500",
          paddingLeft: 8,
        }}
      >
        Personal Details
      </Text>
      <View
        style={{
          padding: 8,
          flex: 1,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            gap: 14,
            padding: 14,
            borderWidth: 0.5,
            borderColor: Colors.border,
            borderRadius: 8,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Octicons name="person" size={20} color={Colors.primary} />
            <Text
              style={{
                color: Colors.text,
                fontSize: 14,
              }}
            >
              Jitu Nayak
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Octicons name="device-mobile" size={20} color={Colors.primary} />
            <Text
              style={{
                color: Colors.text,
                fontSize: 14,
              }}
            >
              093 123 4567
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Octicons name="mail" size={20} color={Colors.primary} />
            <Text
              style={{
                color: Colors.text,
                fontSize: 14,
              }}
            >
              jitu.nayak@ahouse.in
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
