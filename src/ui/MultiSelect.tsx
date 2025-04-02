import { Check, ChevronDown, X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { App } from "../Constant";

export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  disabled?: boolean;
  style?: any;
}

export function MultiSelect({
  label,
  placeholder = "Select options",
  options,
  value,
  onChange,
  error,
  disabled = false,
  style,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );

  const openMultiSelect = () => {
    if (disabled) return;
    setIsOpen(true);
    setModalVisible(true);
  };

  const closeMultiSelect = () => {
    if (Platform.OS === "web") {
      setIsOpen(false);
      return;
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: Dimensions.get("window").height,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      setIsOpen(false);
    });
  };

  const toggleOption = (option: MultiSelectOption) => {
    const newValue = [...value];
    const index = newValue.indexOf(option.value);

    if (index > -1) {
      newValue.splice(index, 1);
    } else {
      newValue.push(option.value);
    }

    onChange(newValue);
  };

  const removeOption = (optionValue: string) => {
    const newValue = value.filter((v) => v !== optionValue);
    onChange(newValue);
  };

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, fadeAnim, slideAnim]);

  // Web implementation
  if (Platform.OS === "web") {
    return (
      <View style={[styles.container, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.multiSelectContainer,
            isOpen && styles.focused,
            error && styles.error,
            disabled && styles.disabled,
          ]}
        >
          <TouchableOpacity
            style={styles.multiSelectButton}
            onPress={openMultiSelect}
            disabled={disabled}
            activeOpacity={0.7}
          >
            {selectedOptions.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.selectedOptionsScroll}
              >
                <View style={styles.selectedOptionsContainer}>
                  {selectedOptions.map((option) => (
                    <View key={option.value} style={styles.selectedOption}>
                      <Text style={styles.selectedOptionText}>
                        {option.label}
                      </Text>
                      <TouchableOpacity
                        onPress={() => removeOption(option.value)}
                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                      >
                        <X size={14} color={App.colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <Text style={styles.placeholderText}>{placeholder}</Text>
            )}
            <ChevronDown
              size={20}
              color={App.colors.textSecondary}
              style={[styles.icon, isOpen && styles.iconRotated]}
            />
          </TouchableOpacity>
        </View>
        {isOpen && (
          <View style={styles.webDropdownMenu}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.webDropdownItem,
                  value.includes(option.value) &&
                    styles.webDropdownItemSelected,
                ]}
                onPress={() => toggleOption(option)}
              >
                <Text
                  style={[
                    styles.webDropdownItemText,
                    value.includes(option.value) &&
                      styles.webDropdownItemTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {value.includes(option.value) && (
                  <Check size={18} color={App.colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

  // Native implementation
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[
          styles.multiSelectContainer,
          error && styles.error,
          disabled && styles.disabled,
        ]}
        onPress={openMultiSelect}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {selectedOptions.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.selectedOptionsScroll}
          >
            <View style={styles.selectedOptionsContainer}>
              {selectedOptions.map((option) => (
                <View key={option.value} style={styles.selectedOption}>
                  <Text style={styles.selectedOptionText}>{option.label}</Text>
                  <TouchableOpacity
                    onPress={() => removeOption(option.value)}
                    hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                  >
                    <X size={14} color={App.colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <Text style={styles.placeholderText}>{placeholder}</Text>
        )}
        <ChevronDown size={20} color={App.colors.textSecondary} />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={closeMultiSelect}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeMultiSelect}
        >
          <Animated.View
            style={[styles.modalBackground, { opacity: fadeAnim }]}
          />
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <SafeAreaView style={styles.modalContentInner}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {label || "Select options"}
                </Text>
                <TouchableOpacity onPress={closeMultiSelect}>
                  <Text style={styles.modalDoneButton}>Done</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => toggleOption(item)}
                  >
                    <Text style={styles.optionText}>{item.label}</Text>
                    {value.includes(item.value) && (
                      <Check size={20} color={App.colors.primary} />
                    )}
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </SafeAreaView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
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
  multiSelectContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: App.colors.border,
    borderRadius: 10,
    backgroundColor: App.colors.card,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 6,
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
  multiSelectButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedOptionsScroll: {
    flex: 1,
    marginRight: 8,
  },
  selectedOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  selectedOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: App.colors.highlight,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginVertical: 2,
  },
  selectedOptionText: {
    fontSize: 14,
    color: App.colors.primary,
    marginRight: 4,
  },
  placeholderText: {
    fontSize: 16,
    color: App.colors.textSecondary,
    flex: 1,
  },
  icon: {
    transition: "0.3s",
  },
  iconRotated: {
    transform: [{ rotate: "180deg" }],
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
  errorText: {
    color: App.colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: App.colors.card,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
  },
  modalContentInner: {
    paddingBottom: Platform.OS === "ios" ? 0 : 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: App.colors.border,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: App.colors.text,
  },
  modalDoneButton: {
    fontSize: 17,
    fontWeight: "600",
    color: App.colors.primary,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  optionText: {
    fontSize: 17,
    color: App.colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: App.colors.border,
    marginLeft: 16,
  },
  webDropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: App.colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: App.colors.border,
    zIndex: 1000,
    maxHeight: 200,
    overflow: "scroll",
    ...Platform.select({
      web: {
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  webDropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  webDropdownItemSelected: {
    backgroundColor: App.colors.highlight,
  },
  webDropdownItemText: {
    fontSize: 16,
    color: App.colors.text,
  },
  webDropdownItemTextSelected: {
    color: App.colors.primary,
    fontWeight: "500",
  },
});
