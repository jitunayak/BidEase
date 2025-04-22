import { View } from "react-native";
import NetworkLogger from "react-native-network-logger";

export default function Network() {
  return (
    <View style={{ flex: 1 }}>
      <NetworkLogger compact />
    </View>
  );
}
