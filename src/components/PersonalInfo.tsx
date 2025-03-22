import Octicons from "@expo/vector-icons/Octicons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { App, Colors } from "../Constant";
import { useStore } from "../hooks/useStorage";
import { EText } from "../ui";

export const PersonalInfo = () => {
  const { user } = useStore();

  const [currentHour, setCurrentHour] = React.useState(new Date().getHours());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: 8,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 180,
            backgroundColor: Colors.primary,
            paddingTop: 2 * App.ui.padding.xl,
            paddingBottom: App.ui.padding.lg,
            paddingHorizontal: App.ui.padding.lg,
          }}
        >
          <EText
            variant="title"
            style={{ color: Colors.background, marginTop: 8 }}
          >
            {currentHour < 12
              ? "Good Morning"
              : currentHour < 17
              ? "Good Afternoon"
              : currentHour < 20
              ? "Good Evening"
              : "Good Night"}
            !
          </EText>
          <EText variant="subtitle" style={{ color: Colors.background }}>
            {user?.name}
          </EText>

          <Link
            style={{ paddingTop: App.ui.padding.lg }}
            href={{
              pathname: "/(modals)/edit-profile",
              params: { navigateTo: "dismiss", userId: user?.id ?? "" },
            }}
          >
            <Text style={{ color: Colors.background, fontSize: 14 }}>
              Edit Profile
            </Text>
          </Link>
        </View>
        <View
          style={{
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 50,
            padding: 2,
            position: "absolute",
            right: 10,
            top: 80,
          }}
        >
          <Image
            source={
              user?.image
                ? { uri: user?.image }
                : require("../../assets/images/profile.png")
            }
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
              display: "flex",
              alignSelf: "center",
            }}
          />
        </View>
      </View>
      <Text
        style={{
          color: Colors.text,
          fontSize: 20,
          fontWeight: "500",
          paddingLeft: 8,
          marginTop: App.ui.padding.xl,
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
              borderRadius: App.ui.borderRadius.sm,
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
    </View>
  );
};
