import { router, Stack } from "expo-router";

function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerTitle: "Your, Wishlists",
          headerTitleAlign: "left",
          headerBlurEffect: "light",
          headerTransparent: true,
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
