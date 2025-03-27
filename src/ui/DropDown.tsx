import Octicons from "@expo/vector-icons/Octicons";
import { useEffect, useState } from "react";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
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
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        editable={false}
        onPress={() => setIsModalVisible(true)}
        rightSection={
          <TouchableOpacity
            onPress={() => setSelectedState(null)}
            style={{ marginRight: App.ui.padding.md }}
          >
            <Octicons name="chevron-down" size={18} color={App.colors.text} />
          </TouchableOpacity>
        }
      />

      <Modal
        visible={isModalVisible}
        presentationStyle="formSheet"
        statusBarTranslucent
        animationType="slide"
      >
        <FlatList
          data={props.data}
          style={{ flex: 1, marginBottom: 120 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedState(item.value);
                setIsModalVisible(false);
              }}
              style={{
                padding: App.ui.padding.md,
                borderRadius: App.ui.borderRadius.sm,
                backgroundColor: App.colors.secondaryBackground,
                marginTop: App.ui.padding.sm,
                marginHorizontal: App.ui.padding.sm,
              }}
            >
              <EText variant="body">{item.label}</EText>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.value}
        />
      </Modal>
    </View>
  );
}
