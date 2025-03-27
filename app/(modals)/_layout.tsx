import { CsStack } from "@/src/components/CsStack";
import Octicons from "@expo/vector-icons/Octicons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  return (
    <>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <CsStack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="edit-profile"
          options={
            {
              // headerTitle: "Edit Profile",
              // headerShown: false,
              // headerRight: () => {
              //   return <Link value="Save" />;
              // },
              // headerLeft: () => {
              //   return <Link value="Cancel" onPress={() => router.back()} />;
              // },
            }
          }
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
            headerTitle: "Auction Preferences",
            // headerLeft: () => (
            //   <TouchableOpacity
            //     onPress={() => {
            //       router.back();
            //     }}
            //   >
            //     <Octicons name="chevron-left" size={20} color={Colors.text} />
            //   </TouchableOpacity>
            // ),
          }}
        />
        <Stack.Screen name="aadhar" />
        <Stack.Screen name="bid-payment" />
        <Stack.Screen name="auction-filter" />
      </CsStack>
    </>
  );
}
