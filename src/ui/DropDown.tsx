import Octicons from "@expo/vector-icons/Octicons";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { App } from "../Constant";
import { EText } from "./EText";
import { ETextInput } from "./TextInput";

type IProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  data: { label: string; value: string }[];
};
export function DropDown(props: IProps) {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(props.value ?? "");

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
  ];

  const filteredStates = indianStates.filter((state) =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedState) {
      props.onChangeText(selectedState);
      setSearchTerm(selectedState);
    } else {
      setSearchTerm("");
    }
  }, [selectedState]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSelectedState(null);
    }
  }, [searchTerm]);

  return (
    <View>
      <ETextInput
        label={props.label}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        rightSection={
          <TouchableOpacity
            onPress={() => setSelectedState(null)}
            style={{ marginRight: App.ui.padding.md }}
          >
            <Octicons name="chevron-down" size={18} color={App.colors.text} />
          </TouchableOpacity>
        }
      />

      {!selectedState && (
        <FlatList
          data={filteredStates}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedState(item)}
              style={{
                padding: App.ui.padding.md,
                borderRadius: App.ui.borderRadius.sm,
                backgroundColor: App.colors.background,
              }}
            >
              <EText>{item}</EText>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );
}
