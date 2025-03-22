import * as AppleColors from "@bacons/apple-colors";
import React, { useRef, useState } from "react";
import { Pressable, TextInput, TextInputProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../Constant";
import { EText } from "./EText";

type IProps = {
  label: string;
  placeholderTextColor?: string;
  style?: any;
  value?: string;
  disabled?: boolean;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  error?: string;
} & TextInputProps;

export const ETextInput = (props: IProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(isFocused || props.value ? -4 : 12),
        },
      ],
      fontSize: withTiming(isFocused || props.value ? 14 : 16),
      // color: withTiming(
      //   (props.value || isFocused) && !props.disabled
      //     ? Colors.primary
      //     : Colors.secondary
      // ),
      color: props.error ? Colors.error : Colors.secondary,
    };
  });

  const handleFocus = () => {
    if (!props.disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    if (!props.disabled) {
      setIsFocused(false);
    }
  };

  return (
    <>
      <Pressable
        onPress={() => {
          if (!props.disabled) {
            textInputRef.current?.focus();
          }
        }}
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          borderWidth: 1.6,
          borderColor: props.error
            ? Colors.error
            : isFocused
            ? Colors.primary
            : Colors.border,
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: Colors.background,
          width: "100%",
          gap: 6,
          ...props.style,
        }}
      >
        <Animated.Text style={[animatedStyles]}>{props.label}</Animated.Text>
        <TextInput
          ref={textInputRef}
          {...props}
          style={{
            fontSize: 18,
            color: props.disabled ? Colors.secondary : AppleColors.darkText,
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
          onBlur={handleBlur}
          onFocus={handleFocus}
          editable={!props.disabled}
        />
      </Pressable>
      {props.error && <EText variant="error">{props.error}</EText>}
    </>
  );
};
