import {
  CreditLimit,
  IndividualKYC,
  LogOut,
  PersonalInfo,
} from "@/src/components";
import { Colors } from "@/src/Constant";
import { useGetUserLazyQuery } from "@/src/gql/generated";
import { useStore } from "@/src/hooks/useStorage";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

export default function Profile() {
  const { user, setUser } = useStore();
  const [, { error, data, loading, refetch }] = useGetUserLazyQuery({
    variables: {
      id: "4",
    },
  });

  useEffect(() => {
    // setUser(null);
    if (error) {
      alert(error.message);
    } else if (data?.user) {
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
        {loading && (
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
        )}

        {user && (
          <>
            {/* <EText>{JSON.stringify(data?.user?.preferences.interests)}</EText> */}
            <PersonalInfo />
            <Link
              href={"/(app)/preference"}
              push
              style={{
                color: Colors.primary,
                textAlign: "center",
                marginTop: 16,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Update Auction Preference
            </Link>
            <IndividualKYC user={user} />
            <CreditLimit />
            <LogOut />
          </>
        )}
      </View>
    </ScrollView>
  );
}
