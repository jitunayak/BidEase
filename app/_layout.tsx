import { Stack } from "expo-router";

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
          headerBackTitle: "back",
          headerTitle: "Search for assets",
        }}
      />
    </Stack>
  );
}
