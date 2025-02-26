import Link from "@/src/components/Link";
import { Stack } from "expo-router";

export default function RootLayout() {
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
          headerRight: () => {
            return <Link value="Save" />;
          },
          headerLeft: () => {
            return <Link value="Cancel" />;
          },
        }}
      />
    </Stack>
  );
}
