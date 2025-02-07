import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        backgroundColor: "white",
      }}
    >
      <Text>Secure banking auctions at your fingertips</Text>
      <Button
        title="Login"
        onPress={() => {
          router.navigate("/login");
        }}
      />
      <Button
        title="Home"
        onPress={() => {
          router.navigate("/(tabs)");
        }}
      />
    </View>
  );
}
