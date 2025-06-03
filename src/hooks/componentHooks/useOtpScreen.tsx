import { useGetUserLazyQuery, useVerifyOtpMutation } from "@/src/gql/generated";
import { sanitizePhoneNumber } from "@/src/lib/format";
import { CustomGraphQlError, getGraphQlError } from "@/src/lib/graphqlHelpers";
import { ApolloError } from "@apollo/client";
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
  const [error, setError] = useState<CustomGraphQlError>();
  const [getUser, { data }] = useGetUserLazyQuery();
  const [verifyOtp] = useVerifyOtpMutation();
  const [loading, setLoading] = useState(false);

  const phoneNumber = sanitizePhoneNumber(queryParams?.phoneNumber ?? "");

  const clearError = () => {
    setError(undefined);
  };

  const handleExistingUser = async (id: string) => {
    console.log("existing user");
    try {
      const userResponse = await getUser({
        variables: {
          id,
        },
      });
      console.log(userResponse);
      if (!userResponse) return;
      if (userResponse.data?.user) {
        setUser(userResponse.data?.user);
        router.replace("/(tabs)/home");
      }
    } catch (err) {
      console.log(err);
      const error = getGraphQlError(err as ApolloError);
      setError(error);
      Alert.alert(error.message);
    }
  };

  const handleNewUser = (userId: string) => {
    console.log("new user");
    setUser(null);
    router.replace({
      pathname: "/(modals)/edit-profile",
      params: {
        navigateTo: "preference",
        phoneNumber,
        userId,
      },
    });
  };

  const handleOtpVerification = async () => {
    setLoading(true);
    setError(undefined);
    storage.set("user.route", "auth/otp-verify");
    try {
      const res = await verifyOtp({
        variables: {
          phoneNumber,
          otp,
        },
      });
      if (!res) return;
      console.log(res.data?.verifyOtp.token);
      storage.set("user.token", res.data?.verifyOtp.token ?? "");
      const userId = res.data?.verifyOtp.id!;
      console.log(userId);
      if (!res.data?.verifyOtp.user) {
        handleNewUser(userId);
      } else {
        handleExistingUser(userId);
      }
    } catch (err) {
      const error = getGraphQlError(err as ApolloError);
      setError(error);
      Alert.alert(error.message);
    } finally {
      setLoading(false);
      storage.set("user.route", "");
    }
  };

  return {
    handleOtpVerification,
    setOtp,
    otp,
    loading,
    error,
    data,
    phoneNumber,
    clearError,
  };
};
