import { Stack, useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="otp-screen"
        options={{
          title: "Enter OTP",
          headerBackTitle: "Re-enter",
        }}
      />
    </Stack>
  );
}
