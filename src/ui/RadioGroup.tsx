import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { App } from "../Constant";

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  style?: any;
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
  error,
  disabled = false,
  style,
}: RadioGroupProps) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionContainer,
              index !== options.length - 1 && styles.optionWithBorder,
              disabled && styles.disabled,
            ]}
            onPress={() => !disabled && onChange(option.value)}
            activeOpacity={0.7}
            disabled={disabled}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionLabel}>{option.label}</Text>
                {option.description && (
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>
                )}
              </View>
              <View
                style={[
                  styles.radioOuter,
                  value === option.value && styles.radioOuterSelected,
                  disabled && styles.radioOuterDisabled,
                ]}
              >
                {value === option.value && <View style={styles.radioInner} />}
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  optionsContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: App.colors.border,
    backgroundColor: App.colors.card,
    overflow: "hidden",
  },
  optionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: App.colors.border,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 16,
    color: App.colors.text,
    fontWeight: "400",
  },
  optionDescription: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginTop: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: App.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: App.colors.primary,
  },
  radioOuterDisabled: {
    borderColor: App.colors.border,
    opacity: 0.5,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: App.colors.primary,
  },
  disabled: {
    opacity: 0.7,
  },
  errorText: {
    color: App.colors.error,
    fontSize: 14,
    marginTop: 4,
  },
});
