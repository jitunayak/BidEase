import {
  CreditLimit,
  IndividualKYC,
  LogOut,
  PersonalInfo,
} from "@/src/components";
import { Colors } from "@/src/Constant";
import { useStore } from "@/src/hooks/useStorage";
import { Switch } from "@/src/ui/Switch";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

export default function Profile() {
  const { user, setUser } = useStore();
  // const { error, data, loading, refetch } = useGetUserQuery({
  //   variables: {
  //     id: user?.id ?? "",
  //   },
  // });
  // console.log({ user });

  // useEffect(() => {
  //   setUser(null);
  //   if (error) {
  //     alert(error.message);
  //   } else if (data?.user) {
  //     setUser(data.user);
  //   }
  // }, [loading]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: Colors.background }}
      // refreshControl={
      // <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
      // }
    >
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        {!user && (
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
            <Switch />
            <Link
              href={"/(modals)/preference"}
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
