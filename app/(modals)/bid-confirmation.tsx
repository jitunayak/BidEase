import { App } from "@/src/Constant";
import { Button, EText, VStack } from "@/src/ui";
import { Header } from "@/src/ui/Header";
import Octicons from "@expo/vector-icons/Octicons";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

type IProps = {
  title?: string;
  bid: string;
  id: string;
};

export default function BidPayment() {
  const { bid, id, title } = useLocalSearchParams<IProps>();
  return (
    <View style={{ flex: 1, backgroundColor: App.colors.background }}>
      <Header showCloseText />
      <VStack
        justifyContent="flex-start"
        style={{ paddingVertical: 32, flex: 1, width: "100%" }}
      >
        <Octicons name="check-circle-fill" size={100} color="green" />
        <EText variant="title">Congratulations!</EText>
        <EText>Bid placed successfully!</EText>
      </VStack>

      <View
        style={{
          flex: 1,
          paddingHorizontal: App.ui.padding.lg,
          gap: 8,
          marginBottom: 1,
          position: "absolute",
          bottom: 40,
          width: "100%",
        }}
      >
        <View
          style={{
            gap: 8,
            marginVertical: App.ui.padding.xl,
            backgroundColor: App.colors.secondaryBackground,
            padding: 16,
            borderRadius: App.ui.borderRadius.sm,
            borderWidth: 1,
            borderColor: App.colors.border,
          }}
        >
          <EText variant="subtitle">Transaction Details</EText>
          <EText variant="label">Auction ID: {id}</EText>
          <EText variant="label">
            Bid Amount: ₹{Number(bid).toLocaleString()}
          </EText>
          <EText variant="label">Service fee : 5%</EText>
          <EText variant="title">
            ₹{(Number(bid) + Number(bid) * 0.05).toLocaleString()}
          </EText>
        </View>
        <View style={{ gap: 8, marginVertical: App.ui.padding.xl }}>
          <EText variant="subtitle">What is next ?</EText>
          <EText>1. Complete your full payment in 24 hours</EText>
          <EText>2. Contact support if you need assistance</EText>
        </View>

        <Button
          onPress={() => {
            router.dismiss();
            router.navigate("/(tabs)/home");
          }}
        >
          Browse More
        </Button>
      </View>
    </View>
  );
}
