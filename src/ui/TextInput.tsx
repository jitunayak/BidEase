import * as AppleColors from "@bacons/apple-colors";
import React from "react";
import { TextInput, View } from "react-native";
import { Colors } from "../Constant";
import { EText } from "./EText";

type IProps = {
  placeholder: string;
  placeholderTextColor?: string;
  style?: any;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
};
export const ETextInput = (props: IProps) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        borderWidth: 0.6,
        borderColor: Colors.border,
        borderRadius: 4,
        padding: 8,
        backgroundColor: AppleColors.systemGray6,
        width: "100%",
        gap: 8,
        ...props.style,
      }}
    >
      <EText variant="label">{props.placeholder}</EText>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor || Colors.border}
        style={{
          fontSize: 16,
          color: AppleColors.darkText,
          width: "100%",
          ...props.style,
        }}
        keyboardType={props.keyboardType || "default"}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
      />
    </View>
  );
};
