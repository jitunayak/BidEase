import { Eye, EyeOff, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { App } from "../Constant";

interface TextFieldWithClearProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  disabled?: boolean;
  maxLength?: number;
  leftIcon?: React.ReactNode;
  style?: any;
  clearButtonMode?: "never" | "while-editing" | "unless-editing" | "always";
}

export function TextFieldWithClear({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = "default",
  autoCapitalize = "none",
  disabled = false,
  maxLength,
  leftIcon,
  style,
  clearButtonMode = "while-editing",
}: TextFieldWithClearProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const handleClear = () => onChangeText("");

  const shouldShowClearButton = () => {
    if (value.length === 0) return false;
    if (clearButtonMode === "never") return false;
    if (clearButtonMode === "always") return true;
    if (clearButtonMode === "while-editing" && isFocused) return true;
    if (clearButtonMode === "unless-editing" && !isFocused) return true;
    return false;
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          error && styles.error,
          disabled && styles.disabled,
          multiline && styles.multiline,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (shouldShowClearButton() || secureTextEntry) &&
              styles.inputWithRightIcon,
            multiline && styles.multilineInput,
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={App.colors.textSecondary}
        />

        {shouldShowClearButton() && !secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={handleClear}
            activeOpacity={0.7}
          >
            <X size={20} color={App.colors.textSecondary} />
          </TouchableOpacity>
        )}

        {secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            {isPasswordVisible ? (
              <Eye size={20} color={App.colors.textSecondary} />
            ) : (
              <EyeOff size={20} color={App.colors.textSecondary} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: App.colors.text,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: App.colors.border,
    borderRadius: 10,
    backgroundColor: App.colors.card,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
      web: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
      },
    }),
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 16,
    color: App.colors.text,
  },
  multilineInput: {
    height: "auto",
    minHeight: 44,
    paddingTop: 12,
    paddingBottom: 12,
    textAlignVertical: "top",
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  leftIcon: {
    paddingLeft: 12,
  },
  rightIcon: {
    paddingRight: 12,
  },
  focused: {
    borderColor: App.colors.primary,
    borderWidth: 2,
  },
  error: {
    borderColor: App.colors.error,
  },
  disabled: {
    backgroundColor: App.colors.background,
    opacity: 0.7,
  },
  multiline: {
    minHeight: 100,
  },
  errorText: {
    color: App.colors.error,
    fontSize: 14,
    marginTop: 4,
  },
});
