import { GET_USER_QUERY } from "@/graphql/users.query,";
import {
  CreditLimit,
  IndividualKYC,
  LogOut,
  PersonalInfo,
} from "@/src/components";
import { Colors } from "@/src/Constant";
import { User } from "@/src/gql/graphql";
import { useStore } from "@/src/hooks/useStorage";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

export default function profile() {
  const { setUser } = useStore();
  const { data, error, loading, refetch } = useQuery<{ user: User }>(
    GET_USER_QUERY,
    {
      variables: {
        id: 4,
      },
    }
  );
  useEffect(() => {
    // setUser(null);
    if (error) {
      alert(error.message);
    } else if (data) {
      setUser(data.user);
    }
  }, [loading]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: Colors.background }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
      }
    >
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          padding: 8,
          backgroundColor: Colors.background,
          gap: 8,
        }}
      >
        {loading ? (
          <>
            <ShimmerPlaceholder
              style={{
                width: 120,
                height: 120,
                borderRadius: 100,
                alignSelf: "center",
              }}
            />
            <ShimmerPlaceholder style={{ marginTop: 16 }} />
            <ShimmerPlaceholder style={{ width: "100%", height: 120 }} />
            <ShimmerPlaceholder style={{ width: "100%", height: 120 }} />
            <ShimmerPlaceholder />
            <ShimmerPlaceholder style={{ width: "100%", height: 120 }} />
            <ShimmerPlaceholder style={{ width: "100%", height: 120 }} />
          </>
        ) : (
          <>
            <PersonalInfo />
            <IndividualKYC />
            <CreditLimit />
            <LogOut />
          </>
        )}
      </View>
    </ScrollView>
  );
}
