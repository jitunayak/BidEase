import Link from "@/src/components/Link";
import { Colors } from "@/src/Constant";
import Octicons from "@expo/vector-icons/Octicons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="app" options={{ headerShown: false }} />

      <Stack.Screen
        name="edit-profile"
        options={{
          presentation: "modal",
          headerTitle: "Edit Profile",
          // headerRight: () => {
          //   return <Link value="Save" />;
          // },
          headerLeft: () => {
            return <Link value="Cancel" onPress={() => router.back()} />;
          },
        }}
      />

      <Stack.Screen
        name="notification-preference"
        options={{
          presentation: "modal",
          headerBackTitle: "back",
          headerTitle: "Notification Preferences",
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Octicons name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="preference"
        options={{
          presentation: "modal",
          headerTitle: "Auction Preferences",
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Octicons name="chevron-left" size={20} color={Colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
