import { CsStack } from "@/src/components/CsStack";
import { useInitialization } from "@/src/hooks/componentHooks/useInitialization";
import client from "@/src/lib/GraphQlClient";
import { ApolloProvider } from "@apollo/client";
import { LDProvider } from "@launchdarkly/react-native-client-sdk";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  const { ldClient, queryClient } = useInitialization();

  return (
    <LDProvider client={ldClient}>
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
    </LDProvider>
  );
}
