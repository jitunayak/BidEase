import { Check } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { App } from "../Constant";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
  error?: string;
  style?: any;
}

export function Checkbox({
  label,
  checked,
  onChange,
  description,
  disabled = false,
  error,
  style,
}: CheckboxProps) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.checkboxContainer, disabled && styles.disabled]}
        onPress={() => !disabled && onChange(!checked)}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <View
          style={[
            styles.checkbox,
            checked && styles.checkboxChecked,
            error && styles.checkboxError,
            disabled && styles.checkboxDisabled,
          ]}
        >
          {checked && <Check size={16} color="white" />}
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: App.colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: App.colors.primary,
    borderColor: App.colors.primary,
  },
  checkboxError: {
    borderColor: App.colors.error,
  },
  checkboxDisabled: {
    backgroundColor: App.colors.border,
    borderColor: App.colors.border,
    opacity: 0.5,
  },
  labelContainer: {
    flex: 1,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    color: App.colors.text,
  },
  description: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginTop: 2,
  },
  disabled: {
    opacity: 0.7,
  },
  errorText: {
    color: App.colors.error,
    fontSize: 14,
    marginTop: 4,
    marginLeft: 32,
  },
});
