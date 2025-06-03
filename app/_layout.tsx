import { CsStack } from "@/src/components/CsStack";
import { storage } from "@/src/hooks/storage";
import { useStore } from "@/src/hooks/useStorage";
import client from "@/src/lib/GraphQlClient";
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { startNetworkLogging } from "react-native-network-logger";

export default function RootLayout() {
  const router = useRouter();
  const { user } = useStore();
  const route = storage.get("user.route");
  const queryClient = new QueryClient();
  // console.log(user);
  useEffect(() => {
    startNetworkLogging({
      maxRequests: 100,
    });
    if (user?.phoneNumber !== null && route !== "auth/otp-verify") {
      router.replace("/");
      return;
    } else {
      router.replace("/(auth)/login");
    }
  }, []);

  // useEffect(() => {
  //   const allKeys = store.getAllKeys();
  //   const newData = {};

  //   allKeys.forEach((key) => {
  //     newData[key] =
  //       store.getString(key) ?? (store.getNumber(key) || store.getBoolean(key));
  //   });

  //   setData(newData);
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
          <Stack.Screen
            name="profile/verification"
            options={{
              title: "Account verification",
            }}
          />
          <Stack.Screen
            name="notifications"
            options={{
              title: "Notifications",
            }}
          />
          <Slot />
        </CsStack>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
