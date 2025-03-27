import { App } from "@/src/Constant";
import indianStates from "@/src/data/in_states.json";
import { Button, Header } from "@/src/ui";
import { DropDown } from "@/src/ui/DropDown";
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
          data={indianStates}
        />
        <Button>Show 156 Results</Button>
        <Button variant="light">Reset Filter</Button>
      </View>
    </View>
  );
}
