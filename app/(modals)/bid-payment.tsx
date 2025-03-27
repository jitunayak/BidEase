import { App } from "@/src/Constant";
import { uiStyles } from "@/src/Theme";
import { Button, EText, HStack, Radio, VStack } from "@/src/ui";
import { Header } from "@/src/ui/Header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, View } from "react-native";

type IProps = {
  title?: string;
  bid: string;
  id: string;
  image: string;
};
export default function BidPayment() {
  const { title, bid, id, image } = useLocalSearchParams<IProps>();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const isButtonDisabled = selectedPayment === null;

  return (
    <>
      <Header closeButton />
      <View style={[uiStyles.container]}>
        <View
          style={{
            padding: App.ui.padding.md,
            gap: 16,
            flex: 1,
            marginBottom: 30,
          }}
        >
          <HStack alignItems="flex-start">
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 8,
              }}
            />
            <VStack alignItems="flex-start">
              <EText variant="title">{title}</EText>
              <EText variant="label">Auction ID: {id}</EText>
              <EText variant="label">Winning bid</EText>
            </VStack>
          </HStack>

          <VStack alignItems="flex-start" justifyContent="flex-start">
            <EText variant="label">Bid Amount: ₹{bid}</EText>
            <EText variant="label">Service fee : 5%</EText>
            <EText variant="title">
              ₹{(Number(bid) + Number(bid) * 0.05).toLocaleString()}
            </EText>

            <View
              style={{
                gap: 16,
                marginVertical: 16,
                padding: App.ui.padding.lg,
                borderRadius: App.ui.borderRadius.sm,
                backgroundColor: App.colors.secondaryBackground,
              }}
            >
              <EText variant="subtitle">Payment Methods</EText>
              <HStack gap={8}>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <MaterialCommunityIcons name="credit-card" size={24} />
                  <EText variant="label">Credit Card</EText>
                </View>
                <Radio
                  isOn={selectedPayment === "credit-card"}
                  onToggle={() =>
                    selectedPayment !== "credit-card"
                      ? setSelectedPayment("credit-card")
                      : setSelectedPayment(null)
                  }
                />
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <MaterialCommunityIcons name="bank" size={24} />
                  <EText variant="label">Netbanking</EText>
                </View>
                <Radio
                  isOn={selectedPayment === "netbanking"}
                  onToggle={() =>
                    selectedPayment !== "netbanking"
                      ? setSelectedPayment("netbanking")
                      : setSelectedPayment(null)
                  }
                />
              </HStack>
            </View>
          </VStack>

          <Button
            disabled={isButtonDisabled}
            onPress={() => {
              router.dismiss();
              router.push({
                pathname: "/(modals)/bid-confirmation",
                params: { id, title, bid },
              });
            }}
          >
            CONFIRM PAYMENT
          </Button>
        </View>
      </View>
    </>
  );
}
