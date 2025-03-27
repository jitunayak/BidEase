import { App } from "@/src/Constant";
import { Button, Header } from "@/src/ui";
import { DropDown } from "@/src/ui/DropDown";
// import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View } from "react-native";

export default function AuctionFilter() {
  const [city, setCity] = React.useState<string>("");
  return (
    <View style={{ flex: 1, backgroundColor: App.colors.background }}>
      <Header showCloseText />

      <View style={{ flex: 1, padding: App.ui.padding.lg, gap: 8 }}>
        <DropDown
          label="Select State"
          placeholder="Select State"
          value={city}
          onChangeText={setCity}
          data={[{ label: "Banglore", value: "Banglore" }]}
        />
        <Button>Apply</Button>
      </View>
    </View>
  );
}
