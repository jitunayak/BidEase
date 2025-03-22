import Octicons from "@expo/vector-icons/Octicons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { Colors } from "../Constant";
import { useStore } from "../hooks/useStorage";

export const PersonalInfo = () => {
  const { user } = useStore();
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
          source={
            user?.image
              ? { uri: user?.image }
              : require("../../assets/images/profile.png")
          }
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            display: "flex",
            alignSelf: "center",
          }}
        />
        <Link
          href={{
            pathname: "/(modals)/edit-profile",
            params: { navigateTo: "dismiss", userId: user?.id ?? "" },
          }}
        >
          <Text style={{ color: Colors.primary, fontSize: 14 }}>
            Edit Profile
          </Text>
        </Link>
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
          shadowColor: "#000",
          backgroundColor: Colors.background,
        }}
      >
        <View
          style={[
            {
              gap: 14,
              padding: 14,
              borderWidth: 0.5,
              borderColor: Colors.border,
              backgroundColor: Colors.background,
              borderRadius: 8,
              width: "100%",
            },
          ]}
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
              {user?.name}
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
              {user?.phoneNumber}
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
              {user?.email}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};
