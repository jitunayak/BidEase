import client from "@/src/GraphQlClient";
import { useStore } from "@/src/hooks/useStorage";
import { ApolloProvider } from "@apollo/client";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const { user } = useStore();

  useEffect(() => {
    if (user?.phoneNumber != null) {
      router.replace("/(app)/(tabs)");
      return;
    } else {
      router.replace("/(auth)/login");
    }
  }, []);

  return (
    // <Stack>
    //   <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    //   <Stack.Screen name="(app)" options={{ headerShown: false }} />
    // </Stack>
    <ApolloProvider client={client}>
      <Slot />
    </ApolloProvider>
  );
}
