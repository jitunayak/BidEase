import { App } from "@/src/Constant";
import { router, Stack } from "expo-router";

function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: App.platform.isIOS,
          headerTitle: "Your, Wishlists",
          headerTitleAlign: "left",
          headerBlurEffect: "light",
          headerTransparent: App.platform.isIOS,
          headerSearchBarOptions: {
            placeholder: "Search for assets",
            shouldShowHintSearchIcon: true,
            onChangeText: (e) => {
              router.setParams({
                search: e.nativeEvent.text,
              });
            },
          },
        }}
      />
    </Stack>
  );
}

export default RootLayout;
