import {
  AutoEnvAttributes,
  ReactNativeLDClient,
} from "@launchdarkly/react-native-client-sdk";
import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { startNetworkLogging } from "react-native-network-logger";
import { storage } from "../storage";
import { Env } from "../useEnv";
import { useStore } from "../useStorage";

export const useInitialization = () => {
  const router = useRouter();
  const { user } = useStore();
  const route = storage.get("user.route");
  const queryClient = new QueryClient();

  const context = {
    kind: "user",
    key: user?.phoneNumber ?? "",
    name: user?.name ?? "",
    email: user?.email ?? "",
  };

  console.log({ Env });
  const ldClient = new ReactNativeLDClient(
    Env.LAUNCH_DARKLY_MOBILE_SDK_KEY,
    AutoEnvAttributes.Enabled,
    {}
  );

  // console.log(user);
  useEffect(() => {
    startNetworkLogging({
      maxRequests: 100,
    });
    if (user?.phoneNumber !== null && route !== "auth/otp-verify") {
      router.replace("/");
      return;
    } else {
      router.replace("/(auth)/login");
    }
  }, []);

  useEffect(() => {
    ldClient.identify(context).catch((e: any) => console.log(e));
  }, []);

  // useEffect(() => {
  //   const allKeys = store.getAllKeys();
  //   const newData = {};

  //   allKeys.forEach((key) => {
  //     newData[key] =
  //       store.getString(key) ?? (store.getNumber(key) || store.getBoolean(key));
  //   });

  //   setData(newData);
  // }, []);

  return {
    ldClient: ldClient,
    queryClient: queryClient,
    route: router,
  };
};
