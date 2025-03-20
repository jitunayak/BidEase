import { useGetUserLazyQuery, useVerifyOtpMutation } from "@/src/gql/generated";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { storage } from "../storage";
import { useStore } from "../useStorage";

export const useOTPScreen = () => {
  const router = useRouter();
  const { setUser } = useStore();
  const queryParams = useLocalSearchParams<{
    phoneNumber: string;
  }>();
  const [otp, setOtp] = useState("");
  const [getUser, { data, loading, error }] = useGetUserLazyQuery();
  const [verifyOtp] = useVerifyOtpMutation();

  const handleOtpVerification = async () => {
    console.log("inputs", { phoneNumber: queryParams?.phoneNumber, otp });
    verifyOtp({
      variables: {
        phoneNumber: queryParams?.phoneNumber,
        otp,
      },
    })
      .catch((err) => {
        Alert.alert("Error", "Something went wrong");
        console.log(err);
      })
      .then(async (res) => {
        if (!res) return;
        storage.set("user.token", res.data?.verifyOtp.token ?? "");
        if (!res.data?.verifyOtp.user) {
          console.log("new user registering");
          router.push({
            pathname: "/(app)/edit-profile",
            params: {
              navigateTo: "preference",
              phoneNumber: queryParams?.phoneNumber,
            },
          });
        }
        getUser({
          variables: {
            id: res.data?.verifyOtp.user.id ?? "",
          },
        }).then((res) => {
          console.log(res.data);
          if (!res) return;
          if (res.data?.user) {
            setUser(res.data?.user);
            router.push("/(app)/(tabs)/home");
          }
        });
      });
  };

  return {
    handleOtpVerification,
    setOtp,
    otp,
    loading,
    error,
    data,
    phoneNumber: queryParams?.phoneNumber,
  };
};
