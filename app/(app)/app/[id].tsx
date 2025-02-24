import { Colors } from "@/src/Constant";
import { liveAuctionsLarge } from "@/src/data/auctions";
import { Button, HStack, VStack } from "@/src/ui";
import Octicons from "@expo/vector-icons/Octicons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const bidLiveData = [
  {
    id: "1",
    name: "John Doe",
    time: "5 minutes ago",
    amount: "1,00,000",
  },
  {
    id: "2",
    name: "Mark Smith",
    time: "12 minutes ago",
    amount: "90,000",
  },
  {
    id: "3",
    name: "Jane Johnson ",
    time: "18 minutes ago",
    amount: "70,000",
  },
];
export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={{
        padding: 16,
        marginVertical: 8,
        gap: 12,
        backgroundColor: Colors.background,
      }}
    >
      {children}
    </View>
  );
};

export const AuctionDetails = (props: { name?: string }) => {
  return (
    <Container>
      <Text style={{ color: Colors.text, fontSize: 20, fontWeight: "700" }}>
        {props.name || "Rare Vintage Rolex Daytona - 1960s"}
      </Text>

      <Text style={{ color: Colors.secondary, fontSize: 14 }}>
        Exceptional condition vintage Rolex Daytona from the 1960s. Original
        parts, recently serviced with full documentation. Features a pristine
        dial, original movement, and comes with box and papers.
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "100%",
          gap: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 4,
          }}
        >
          <Octicons name="eye" size={16} color={Colors.secondary} />
          <Text style={{ color: Colors.secondary, fontSize: 14 }}>
            1.2K Views
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 4,
          }}
        >
          <Octicons name="person" size={16} color={Colors.secondary} />
          <Text style={{ color: Colors.secondary, fontSize: 14 }}>
            12 active bidders
          </Text>
        </View>
      </View>
    </Container>
  );
};

export const AuctionQuickBidOptions = () => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: Colors.background,
        borderRadius: 8,
        // borderWidth: 1,
        // borderColor: Colors.border,
      }}
    >
      <View
        style={{ width: "100%", marginTop: 8, padding: 20, flex: 1, gap: 4 }}
      >
        <Text style={{ color: Colors.secondary }}>Current Bid</Text>
        <Text
          style={{
            color: Colors.primary,
            fontWeight: "700",
            fontSize: 28,
          }}
        >
          ₹90,000
        </Text>

        <View
          style={{
            gap: 8,
            width: "100%",
            backgroundColor: Colors.background,
            borderRadius: 8,
            marginTop: 8,
            // borderWidth: 1,
            // borderColor: Colors.border,
          }}
        ></View>
        <Text>Quick bid options</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            marginTop: 8,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.background,
              padding: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <Text style={{ color: Colors.text }}>₹1,00,000</Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.background,
              padding: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <Text style={{ color: Colors.text }}>₹2,00,000</Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.background,
              padding: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <Text style={{ color: Colors.text }}>₹3,00,000</Text>
          </View>
        </View>
      </View>
      <VStack
        style={{
          width: "100%",
          paddingBottom: 16,
          paddingHorizontal: 8,
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="primary" onPress={() => {}} title="Place bid" />
        <Text
          style={{
            color: Colors.secondary,
            fontSize: 12,
            textAlign: "center",
          }}
        >
          By placing a bid, you agree to our Terms of Service
        </Text>
      </VStack>
    </View>
  );
};

const AuctionHistoryItem = (props: {
  id: string;
  name: string;
  time: string;
  amount: string;
}) => {
  return (
    <View
      id={props.id}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 4,
      }}
    >
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Image
          source={require("@/assets/images/profile.png")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        />
        <View>
          <Text style={{ color: Colors.text, fontSize: 16 }}>{props.name}</Text>
          <Text style={{ color: Colors.secondary, fontSize: 14 }}>
            {props.time}
          </Text>
        </View>
      </View>

      <Text style={{ color: Colors.primary, fontSize: 16 }}>
        ₹{props.amount}
      </Text>
    </View>
  );
};
export const AuctionHistory = () => {
  return (
    <Container>
      <Text
        style={{
          color: Colors.text,
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        Bidding History
      </Text>
      {bidLiveData.map((item) => {
        return (
          <AuctionHistoryItem
            key={item.id}
            id={item.id}
            amount={item.amount}
            name={item.name}
            time={item.time}
          />
        );
      })}
    </Container>
  );
};

export const TimeLeft = () => {
  return (
    <HStack
      justifyContent="flex-start"
      style={{ marginTop: 8, paddingLeft: 12, gap: 8 }}
    >
      <Octicons name="stopwatch" size={18} color={Colors.error} />
      <Text
        style={{
          color: Colors.error,
          fontSize: 14,
        }}
      >
        2hr 30min left
      </Text>
    </HStack>
  );
};

export default function Detail() {
  const { id } = useLocalSearchParams();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, marginBottom: 24 }}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={liveAuctionsLarge.at(Number(id) - 1)?.image}
          style={{
            width: "100%",
            height: 260,
          }}
        />

        <TimeLeft />
        <AuctionDetails name={liveAuctionsLarge.at(Number(id) - 1)?.title} />
        <AuctionQuickBidOptions />
        <AuctionHistory />

        <Text
          style={{
            color: Colors.secondary,
            fontSize: 14,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          View auction terms and conditions
        </Text>
      </View>
    </ScrollView>
  );
}
