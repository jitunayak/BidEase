import { Colors } from "@/src/Constant";
import { cleanedInput } from "@/src/lib/format";
import { Button, EText } from "@/src/ui";
import { ETextInput } from "@/src/ui/TextInput";
import { useState } from "react";
import { Image, KeyboardAvoidingView } from "react-native";

export default function Aadhar() {
  const [aadharNumber, setAadharNumber] = useState("");

  const handleAadharNumberChange = (text: string) => {
    const cleanedNumber = cleanedInput(text, 12); // Aadhar number should be 12 digits
    if (cleanedNumber.length > 12) return;
    const formattedNumber = () => {
      if (cleanedNumber.length === 12) {
        return `${cleanedNumber.slice(0, 4)} ${cleanedNumber.slice(
          4,
          8
        )} ${cleanedNumber.slice(8, 12)}`;
      } else if (cleanedNumber.length > 8) {
        return `${cleanedNumber.slice(0, 4)} ${cleanedNumber.slice(
          4,
          8
        )} ${cleanedNumber.slice(8, 12)}`;
      } else if (cleanedNumber.length > 4) {
        return `${cleanedNumber.slice(0, 4)} ${cleanedNumber.slice(4, 8)}`;
      } else return cleanedNumber;
    };
    setAadharNumber(formattedNumber());
  };

  return (
    <KeyboardAvoidingView
      style={{
        paddingHorizontal: 16,
        gap: 16,
        paddingTop: 40,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.background,
        flex: 1,
      }}
    >
      <EText variant="title" style={{}}>
        Aadhar Verification
      </EText>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/800px-Aadhaar_Logo.svg.png",
        }}
        style={{ height: 100, width: 120, resizeMode: "contain" }}
      />
      <ETextInput
        label="Aadhar Number"
        value={aadharNumber}
        onChangeText={handleAadharNumberChange}
        keyboardType="numeric"
        autoFocus={false}
      />

      <Button
        variant="primary"
        onPress={() => {
          console.log(aadharNumber);
        }}
        style={{ width: "100%" }}
        title="Verify"

        // disabled={cleanedInput(aadharNumber, 12).length !== 12}
      >
        VERIFY
      </Button>
    </KeyboardAvoidingView>
  );
}
