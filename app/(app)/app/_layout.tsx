import { Colors } from "@/src/Constant";
import Octicons from "@expo/vector-icons/Octicons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

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
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Octicons name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                router.navigate("/(app)/app/notification-preference")
              }
            >
              <Octicons name="gear" size={20} color={Colors.text} />
            </TouchableOpacity>
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
        name="notification-preference"
        options={{
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
        name="[id]"
        options={{
          headerBackTitle: "back",
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity>
              <Octicons name="share" size={20} color={Colors.text} />
            </TouchableOpacity>
          ),
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
