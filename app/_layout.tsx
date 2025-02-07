import { Colors } from "@/src/Constant";
import { Stack } from "expo-router";
import { TextInput } from "react-native";

export default function RootLayout() {
  return (
    <Stack screenOptions={{}}>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="otp-screen"
        options={{
          title: "Enter OTP",
          headerBackTitle: "Re-enter",
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          headerBackTitle: "Home",
          title: "Notifications",
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerBackTitle: "",
          title: "",
          headerRight: () => (
            <TextInput
              placeholder="Search"
              clearButtonMode="always"
              style={{
                borderWidth: 1,
                borderColor: Colors.border,
                borderRadius: 8,
                padding: 8,
                width: "106%",
                marginRight: 16,
              }}
            />
          ),
        }}
      />
    </Stack>
  );
}
