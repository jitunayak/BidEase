import Octicons from "@expo/vector-icons/Octicons";
import { Stack, useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="notifications"
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
    </Stack>
  );
}
