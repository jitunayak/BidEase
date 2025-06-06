import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { EText } from ".";
import { App } from "../Constant";

type PhoneNumberInputProps = {
  phoneNumber: string;
  onChangePhoneNumber: (e: string) => void;
  countryCode: string;
  label?: string;
} & TextInputProps;

export const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  return (
    <View style={styles.phoneNumberInput}>
      <EText style={{ fontSize: 12, color: App.colors.text }}>
        Phone Number
      </EText>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 8,
        }}
      >
        <EText
          style={{
            fontSize: 18,
            letterSpacing: 1,
            color: App.colors.text,
          }}
        >
          {props.countryCode}
          {"   "}
        </EText>
        <TextInput
          testID="phone-input"
          placeholder="Enter phone number"
          placeholderTextColor={App.colors.textSecondary}
          style={{
            fontSize: 22,
            letterSpacing: 0.6,
            color: App.colors.text,
            width: "90%",
          }}
          keyboardType="number-pad"
          value={props.phoneNumber}
          onChangeText={(e) => {
            props.onChangePhoneNumber(e);
          }}
          autoFocus={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  phoneNumberInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: App.ui.borderRadius.sm,
    padding: 10,
    margin: 10,
    display: "flex",
    width: "auto",
    fontSize: 18,
  },
});
