import { Stack } from "expo-router";

function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerTitle: "Wishlists",
          title: "Wishlist",
          headerTitleAlign: "left",
          headerBlurEffect: "light",
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}

export default RootLayout;
