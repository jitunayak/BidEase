import React, { useRef, useState } from "react";
import { Pressable, TextInput, TextInputProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { App, Colors } from "../Constant";
import { EText } from "./EText";
import { HStack } from "./HStack";

export type IETextInputProps = {
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
  rightSection?: React.ReactNode;
  leftSection?: React.ReactNode;
  onPressRightSection?: () => void;
  onPressLeftSection?: () => void;
} & TextInputProps;

export const ETextInput = (props: IETextInputProps) => {
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
            ? props.disabled
              ? Colors.border
              : Colors.primary
            : Colors.border,
          borderRadius: App.ui.borderRadius.sm,
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: Colors.background,
          width: "100%",
          gap: 6,

          ...props.style,
        }}
      >
        <Animated.Text style={[animatedStyles]}>{props.label}</Animated.Text>

        <HStack>
          {props.leftSection && (
            <Pressable onPress={props.onPressLeftSection}>
              {props.leftSection}
            </Pressable>
          )}

          <TextInput
            ref={textInputRef}
            {...props}
            style={{
              fontSize: 16,
              color: props.disabled ? Colors.secondary : Colors.text,
              width: "90%",
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
            editable={!props.disabled && props.editable}
          />
          {props.rightSection && (
            <Pressable onPress={props.onPressRightSection}>
              {props.rightSection}
            </Pressable>
          )}
        </HStack>
      </Pressable>
      {props.error && <EText variant="error">{props.error}</EText>}
    </>
  );
};
