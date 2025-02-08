import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/(auth)/login");
  });

  return (
    // <Stack>
    //   <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    //   <Stack.Screen name="(app)" options={{ headerShown: false }} />
    // </Stack>
    <Slot />
  );
}
