import { formatPhoneNumber, sanitizePhoneNumber } from "@/src/lib/format";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useLoginScreen = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.navigate(`/otp-screen?phoneNumber=${phoneNumber}`);
  };

  const onChangePhoneNumber = (number: string) => {
    const cleanedPhoneNumber = sanitizePhoneNumber(number);
    setPhoneNumber(formatPhoneNumber(cleanedPhoneNumber));
  };

  return {
    handleLogin,
    onChangePhoneNumber,
    phoneNumber,
  };
};
