import { CsStack } from "@/src/components/CsStack";
import { useStore } from "@/src/hooks/useStorage";
import client from "@/src/lib/GraphQlClient";
import { ApolloProvider } from "@apollo/client";
import { Slot, Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const { user } = useStore();

  console.log(user);
  useEffect(() => {
    if (user?.phoneNumber != null) {
      router.replace("/");
      return;
    } else {
      router.replace("/(auth)/login");
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      {/* <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack> */}
      <CsStack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(modals)"
          options={{
            gestureDirection: "vertical",
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Slot />
      </CsStack>
    </ApolloProvider>
  );
}
