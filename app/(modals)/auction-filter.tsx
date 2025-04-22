import { App } from "@/src/Constant";
import indianStates from "@/src/data/in_states.json";
import { Button, Header, HStack } from "@/src/ui";
import { Checkbox } from "@/src/ui/Checkbox";
import { Dropdown } from "@/src/ui/DropDown";
import { PriceRangeSlider } from "@/src/ui/PriceRangeSlider";
import { MultiCardSelect } from "@/src/ui/Selectablecard";
import { ETextInput } from "@/src/ui/TextInput";
import { Text } from "@/src/ui/Typography";
import { router } from "expo-router";
import {
  CombineIcon,
  FactoryIcon,
  FrameIcon,
  HomeIcon,
} from "lucide-react-native";
import React from "react";
import { ScrollView, View } from "react-native";

export default function AuctionFilter() {
  const [state, setState] = React.useState<string>("");
  const [propertyTypes, setPropertyTypes] = React.useState<string[]>([]);
  return (
    <>
      <Header backButton showCloseText style={{ backgroundColor:App.colors.background }} />
      <ScrollView style={{ flex: 1, backgroundColor: App.colors.background }}>
        <View style={{ flex: 1, padding: App.ui.padding.lg, gap: 8 }}>
          <View>
            <PriceRangeSlider
              minValue={0}
              maxValue={1000000}
              initialLowValue={20000}
              step={1000}
            />

            <HStack style={{ marginBottom: App.ui.padding.sm }}>
              <ETextInput
                style={{ flex: 1 }}
                label="Minimum Price"
                value={"1000"}
                onChangeText={(text) => console.log(text)}
              />
              <ETextInput
                style={{ flex: 1 }}
                label="Maximum Price"
                value={"100000"}
                onChangeText={(text) => console.log(text)}
              />
            </HStack>

            <Text variant="subhead" style={{ marginVertical: 16 }}>
              Property Type
            </Text>
            <MultiCardSelect
              onChange={(data) => setPropertyTypes(data)}
              selectedIds={propertyTypes}
              layout="grid"
              options={[
                {
                  id: "residential",
                  title: "Residential",
                  icon: <HomeIcon />,
                  subtitle: "Residential Property",
                },
                {
                  id: "commercial",
                  title: "Commercial",
                  icon: <CombineIcon />,
                  subtitle: "Commercial Property",
                },
                {
                  id: "industrial",
                  title: "Industrial",
                  icon: <FactoryIcon />,
                  subtitle: "Industrial Property",
                },
                {
                  id: "agricultural",
                  title: "Agricultural",
                  icon: <FrameIcon />,
                  subtitle: "Agricultural Property",
                },
              ]}
            />
            {/* <Text variant="subhead" style={{ marginBottom: 8 }}>
            Property Type
          </Text>
          <SelectableCard
            title="Residential"
            selected={false}
            onSelect={() => {}}
          />
          <SelectableCard
            title="Commercial"
            selected={true}
            onSelect={() => {}}
          />

          <SelectableCard
            title="Industrial"
            selected={false}
            onSelect={() => {}}
          />

          <SelectableCard
            title="Agricultural"
            selected={false}
            onSelect={() => {}}
          /> */}
          </View>
          <Dropdown
            label="Select State"
            placeholder="Select State"
            value={state}
            onChange={setState}
            options={indianStates}
          />
          <View>
            <Text variant="subhead" style={{ marginBottom: 8 }}>
              Filter by banks
            </Text>
            <Checkbox label="ICICI Bank" checked={true} onChange={() => {}} />
            <Checkbox label="HDFC Bank" checked={false} onChange={() => {}} />
            <Checkbox label="Axis Bank" checked={false} onChange={() => {}} />
            <Checkbox label="SBI Bank" checked={false} onChange={() => {}} />
          </View>
          <Button
            title="Show 156 Results"
            onPress={() => {
              router.dismiss();
            }}
          >
            Show 156 Results
          </Button>
          <Button title="Reset Filter" variant="secondary">
            Reset Filter
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
