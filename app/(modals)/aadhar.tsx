import { cleanedInput } from "@/src/lib/format";
import { Button, EText } from "@/src/ui";
import { ETextInput } from "@/src/ui/TextInput";
import { useState } from "react";
import { Image, View } from "react-native";

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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <Header title="Aadhar verification" closeButton /> */}

      <View
        style={{
          padding: 16,
          gap: 16,

          marginTop: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <EText variant="title" style={{ marginTop: 16 }}>
          Enter Aadhar Number
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
        />
        <Button
          title="VERIFY"
          onPress={() => {}}
          isLoading={false}
          style={{ width: "100%" }}
          disabled={cleanedInput(aadharNumber, 12).length !== 12}
        />
      </View>
    </View>
  );
}
