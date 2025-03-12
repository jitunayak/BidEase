import { GET_AUCTION } from "@/graphql/auctions.query";
import { Colors } from "@/src/Constant";
import { Button, EText, HStack, VStack } from "@/src/ui";
import { useQuery } from "@apollo/client";
import Octicons from "@expo/vector-icons/Octicons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

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

export const AuctionDetails = (props: {
  name?: string;
  description: string;
}) => {
  return (
    <Container>
      <EText variant="title">{props.name}</EText>

      <EText variant="label">{props.description}</EText>
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
          <EText variant="label">1.2K Views</EText>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 4,
          }}
        >
          <Octicons name="person" size={16} color={Colors.secondary} />
          <EText variant="label">12 active bidders</EText>
        </View>
      </View>
    </Container>
  );
};

export const AuctionQuickBidOptions = (props: { bid: number }) => {
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
        style={{
          width: "100%",
          marginTop: 8,
          paddingHorizontal: 16,
          flex: 1,
          gap: 4,
        }}
      >
        <Text style={{ color: Colors.secondary }}>Current Bid</Text>
        <Text
          style={{
            color: Colors.primary,
            fontWeight: "700",
            fontSize: 28,
          }}
        >
          ₹{props.bid.toLocaleString()}
        </Text>

        <View
          style={{
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
          marginTop: 16,
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
            marginTop: 8,
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
          <EText variant="body">{props.name}</EText>
          <EText variant="label">{props.time}</EText>
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
  const { data, loading, error } = useQuery(GET_AUCTION, {
    variables: {
      id,
    },
  });

  console.log(data);
  if (loading) {
    return <ActivityIndicator size="small" color={Colors.primary} />;
  }
  if (error) {
    return <Text>Error</Text>;
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, marginBottom: 24 }}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: data.auction.images[0] }}
          style={{
            width: "100%",
            height: 260,
          }}
        />

        <TimeLeft />
        <AuctionDetails
          name={data.auction.title}
          description={data.auction.description}
        />
        <AuctionQuickBidOptions bid={data.auction.bid} />
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
