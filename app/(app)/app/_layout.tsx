import { Colors } from "@/src/Constant";
import Octicons from "@expo/vector-icons/Octicons";
import { Stack, useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="notification"
        options={{
          headerBackTitle: "Home",
          title: "Notifications",
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => (
            <Octicons
              name="chevron-left"
              size={24}
              color="black"
              onPress={() => {
                router.back();
              }}
            />
          ),
          headerRight: () => (
            <Octicons
              name="gear"
              size={20}
              color={Colors.text}
              onPress={() =>
                router.navigate("/(app)/app/notification-preference")
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerBackTitle: "back",
          headerTitle: "Search for assets",
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => (
            <Octicons
              name="chevron-left"
              size={24}
              color="black"
              onPress={() => {
                router.back();
              }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="notification-preference"
        options={{
          headerBackTitle: "back",
          headerTitle: "Notification Preferences",
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => (
            <Octicons
              name="chevron-left"
              size={24}
              color="black"
              onPress={() => {
                router.back();
              }}
            />
          ),
        }}
      />
    </Stack>
  );
}
