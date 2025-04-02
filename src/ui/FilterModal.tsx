import { Check, ChevronDown, ChevronUp, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { App } from "../Constant";
import { AssetCategory } from "../types";
import { Button } from "./Button";
import { Input } from "./Input";

const { height } = Dimensions.get("window");

// Indian states list
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
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
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

// Indian banks list
const INDIAN_BANKS = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Bank of Baroda",
  "Punjab National Bank",
  "Canara Bank",
  "Union Bank of India",
  "Bank of India",
  "Indian Bank",
  "Central Bank of India",
  "IndusInd Bank",
  "Yes Bank",
  "IDBI Bank",
  "Federal Bank",
  "RBL Bank",
  "South Indian Bank",
  "Karnataka Bank",
  "Bandhan Bank",
  "IDFC First Bank",
  "Bank of Maharashtra",
  "UCO Bank",
  "Indian Overseas Bank",
  "Punjab & Sind Bank",
];

export interface FilterOptions {
  categories?: AssetCategory[];
  status?: ("live" | "upcoming" | "ended")[];
  featured?: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
  states?: string[];
  banks?: string[];
  assetAge?: {
    min: number;
    max: number;
  };
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

interface DropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onSelect: (option: string) => void;
  multiSelect?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOptions,
  onSelect,
  multiSelect = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotateAnimation = useSharedValue(0);
  const heightAnimation = useSharedValue(0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    rotateAnimation.value = withTiming(isOpen ? 0 : 1, { duration: 300 });
    heightAnimation.value = withTiming(isOpen ? 0 : 1, { duration: 300 });
  };

  const rotateStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      rotateAnimation.value,
      [0, 1],
      [0, 180],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const heightStyle = useAnimatedStyle(() => {
    const maxHeight = options.length * 44; // Approximate height per item
    return {
      height: interpolate(
        heightAnimation.value,
        [0, 1],
        [0, maxHeight],
        Extrapolate.CLAMP
      ),
      opacity: heightAnimation.value,
      overflow: "hidden",
    };
  });

  const handleSelect = (option: string) => {
    onSelect(option);
    if (!multiSelect) {
      setIsOpen(false);
      rotateAnimation.value = withTiming(0, { duration: 300 });
      heightAnimation.value = withTiming(0, { duration: 300 });
    }
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownLabel}>{label}</Text>
        <View style={styles.dropdownSelectedContainer}>
          {selectedOptions.length > 0 && (
            <Text style={styles.dropdownSelectedText} numberOfLines={1}>
              {selectedOptions.length === 1
                ? selectedOptions[0]
                : `${selectedOptions.length} selected`}
            </Text>
          )}
          <Animated.View style={rotateStyle}>
            {isOpen ? (
              <ChevronUp size={20} color={App.colors.text} />
            ) : (
              <ChevronDown size={20} color={App.colors.text} />
            )}
          </Animated.View>
        </View>
      </TouchableOpacity>

      <Animated.View style={[styles.dropdownContent, heightStyle]}>
        <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 200 }}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.dropdownItem,
                selectedOptions.includes(option) && styles.dropdownItemSelected,
              ]}
              onPress={() => handleSelect(option)}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  selectedOptions.includes(option) &&
                    styles.dropdownItemTextSelected,
                ]}
              >
                {option}
              </Text>
              {selectedOptions.includes(option) && (
                <Check size={16} color={App.colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

interface RangeSliderProps {
  label: string;
  minValue: number;
  maxValue: number;
  currentMin: number;
  currentMax: number;
  onValueChange: (min: number, max: number) => void;
  formatValue?: (value: number) => string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  minValue,
  maxValue,
  currentMin,
  currentMax,
  onValueChange,
  formatValue = (value) => value.toString(),
}) => {
  const [localMin, setLocalMin] = useState(currentMin.toString());
  const [localMax, setLocalMax] = useState(currentMax.toString());

  const handleMinChange = (text: string) => {
    setLocalMin(text);
    const numValue = parseInt(text) || minValue;
    if ((numValue >= minValue && numValue <= parseInt(localMax)) || !text) {
      onValueChange(numValue, parseInt(localMax) || maxValue);
    }
  };

  const handleMaxChange = (text: string) => {
    setLocalMax(text);
    const numValue = parseInt(text) || maxValue;
    if ((numValue <= maxValue && numValue >= parseInt(localMin)) || !text) {
      onValueChange(parseInt(localMin) || minValue, numValue);
    }
  };

  return (
    <View style={styles.rangeContainer}>
      <Text style={styles.rangeLabel}>{label}</Text>
      <View style={styles.rangeInputs}>
        <View style={styles.rangeInputContainer}>
          <Text style={styles.rangeInputLabel}>Min</Text>
          <Input
            value={localMin}
            onChangeText={handleMinChange}
            placeholder={minValue.toString()}
            keyboardType="numeric"
            style={styles.rangeInput}
          />
        </View>
        <Text style={styles.rangeSeparator}>to</Text>
        <View style={styles.rangeInputContainer}>
          <Text style={styles.rangeInputLabel}>Max</Text>
          <Input
            value={localMax}
            onChangeText={handleMaxChange}
            placeholder={maxValue.toString()}
            keyboardType="numeric"
            style={styles.rangeInput}
          />
        </View>
      </View>
      <View style={styles.rangeValues}>
        <Text style={styles.rangeValueText}>{formatValue(minValue)}</Text>
        <Text style={styles.rangeValueText}>{formatValue(maxValue)}</Text>
      </View>
    </View>
  );
};

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const modalAnimation = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      modalAnimation.value = withTiming(1, { duration: 300 });
    } else {
      modalAnimation.value = withTiming(0, { duration: 300 });
    }
  }, [visible, modalAnimation]);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters, visible]);

  const modalStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            modalAnimation.value,
            [0, 1],
            [height, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: modalAnimation.value,
    };
  });

  const handleCategorySelect = (category: string) => {
    const categoryValue = category.toLowerCase() as AssetCategory;
    setFilters((prev) => {
      const categories = prev.categories || [];
      if (categories.includes(categoryValue)) {
        return {
          ...prev,
          categories: categories.filter((c) => c !== categoryValue),
        };
      } else {
        return {
          ...prev,
          categories: [...categories, categoryValue],
        };
      }
    });
  };

  const handleStatusSelect = (status: string) => {
    const statusValue = status.toLowerCase() as "live" | "upcoming" | "ended";
    setFilters((prev) => {
      const statuses = prev.status || [];
      if (statuses.includes(statusValue)) {
        return {
          ...prev,
          status: statuses.filter((s) => s !== statusValue),
        };
      } else {
        return {
          ...prev,
          status: [...statuses, statusValue],
        };
      }
    });
  };

  const handleStateSelect = (state: string) => {
    setFilters((prev) => {
      const states = prev.states || [];
      if (states.includes(state)) {
        return {
          ...prev,
          states: states.filter((s) => s !== state),
        };
      } else {
        return {
          ...prev,
          states: [...states, state],
        };
      }
    });
  };

  const handleBankSelect = (bank: string) => {
    setFilters((prev) => {
      const banks = prev.banks || [];
      if (banks.includes(bank)) {
        return {
          ...prev,
          banks: banks.filter((b) => b !== bank),
        };
      } else {
        return {
          ...prev,
          banks: [...banks, bank],
        };
      }
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { min, max },
    }));
  };

  const handleAssetAgeChange = (min: number, max: number) => {
    setFilters((prev) => ({
      ...prev,
      assetAge: { min, max },
    }));
  };

  const handleFeaturedToggle = () => {
    setFilters((prev) => ({
      ...prev,
      featured: !prev.featured,
    }));
  };

  const handleReset = () => {
    setFilters({});
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (Platform.OS === "web") {
    // Simplified version for web to avoid reanimated issues
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Options</Text>
              <TouchableOpacity onPress={onClose}>
                <X size={24} color={App.colors.text} />
              </TouchableOpacity>
            </View>

            {/* Filter content here */}
            <ScrollView style={styles.modalBody}>
              {/* Rest of the filter content */}
            </ScrollView>

            <View style={styles.modalFooter}>
              <Button
                title="Reset"
                onPress={handleReset}
                variant="outline"
                style={styles.footerButton}
              />
              <Button
                title="Apply Filters"
                onPress={handleApply}
                style={styles.footerButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable style={styles.backdrop} onPress={onClose}>
          <Animated.View style={[styles.backdropContent, backdropStyle]} />
        </Pressable>

        <Animated.View style={[styles.modalContainer, modalStyle]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={App.colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {/* Categories */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Asset Categories</Text>
              <View style={styles.chipContainer}>
                {["Gold", "Vehicle", "House", "Apartment"].map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.chip,
                      filters.categories?.includes(
                        category.toLowerCase() as AssetCategory
                      ) && styles.chipSelected,
                    ]}
                    onPress={() => handleCategorySelect(category)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        filters.categories?.includes(
                          category.toLowerCase() as AssetCategory
                        ) && styles.chipTextSelected,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Status */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Auction Status</Text>
              <View style={styles.chipContainer}>
                {["Live", "Upcoming", "Ended"].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.chip,
                      filters.status?.includes(
                        status.toLowerCase() as "live" | "upcoming" | "ended"
                      ) && styles.chipSelected,
                    ]}
                    onPress={() => handleStatusSelect(status)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        filters.status?.includes(
                          status.toLowerCase() as "live" | "upcoming" | "ended"
                        ) && styles.chipTextSelected,
                      ]}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Featured */}
            <View style={styles.filterSection}>
              <View style={styles.featuredContainer}>
                <Text style={styles.sectionTitle}>Featured Auctions Only</Text>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    filters.featured && styles.checkboxSelected,
                  ]}
                  onPress={handleFeaturedToggle}
                >
                  {filters.featured && (
                    <Check size={16} color={App.colors.card} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Price Range */}
            <View style={styles.filterSection}>
              <RangeSlider
                label="Price Range (₹)"
                minValue={1000}
                maxValue={10000000}
                currentMin={filters.priceRange?.min || 1000}
                currentMax={filters.priceRange?.max || 10000000}
                onValueChange={handlePriceRangeChange}
                formatValue={(value) => `₹${value.toLocaleString()}`}
              />
            </View>

            {/* Asset Age */}
            <View style={styles.filterSection}>
              <RangeSlider
                label="Asset Age (Years)"
                minValue={0}
                maxValue={50}
                currentMin={filters.assetAge?.min || 0}
                currentMax={filters.assetAge?.max || 50}
                onValueChange={handleAssetAgeChange}
              />
            </View>

            {/* States */}
            <View style={styles.filterSection}>
              <Dropdown
                label="Select States"
                options={INDIAN_STATES}
                selectedOptions={filters.states || []}
                onSelect={handleStateSelect}
              />
            </View>

            {/* Banks */}
            <View style={styles.filterSection}>
              <Dropdown
                label="Select Banks"
                options={INDIAN_BANKS}
                selectedOptions={filters.banks || []}
                onSelect={handleBankSelect}
              />
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <Button
              title="Reset"
              onPress={handleReset}
              variant="outline"
              style={styles.footerButton}
            />
            <Button
              title="Apply Filters"
              onPress={handleApply}
              style={styles.footerButton}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropContent: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: App.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.9,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: App.colors.borderLight,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: App.colors.text,
  },
  modalBody: {
    padding: 16,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: App.colors.borderLight,
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: App.colors.borderLight,
  },
  chipSelected: {
    backgroundColor: App.colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: App.colors.textSecondary,
  },
  chipTextSelected: {
    color: App.colors.card,
    fontWeight: "500",
  },
  featuredContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: App.colors.borderLight,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: App.colors.primary,
    borderColor: App.colors.primary,
  },
  rangeContainer: {
    width: "100%",
  },
  rangeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 12,
  },
  rangeInputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rangeInputContainer: {
    flex: 1,
  },
  rangeInputLabel: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginBottom: 4,
  },
  rangeInput: {
    height: 40,
  },
  rangeSeparator: {
    marginHorizontal: 12,
    color: App.colors.textSecondary,
  },
  rangeValues: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  rangeValueText: {
    fontSize: 12,
    color: App.colors.textTertiary,
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 8,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: App.colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: App.colors.borderLight,
  },
  dropdownLabel: {
    fontSize: 16,
    color: App.colors.text,
  },
  dropdownSelectedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownSelectedText: {
    fontSize: 14,
    color: App.colors.primary,
    marginRight: 8,
    maxWidth: 150,
  },
  dropdownContent: {
    backgroundColor: App.colors.card,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: App.colors.borderLight,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: App.colors.borderLight,
  },
  dropdownItemSelected: {
    backgroundColor: App.colors.borderLight,
  },
  dropdownItemText: {
    fontSize: 14,
    color: App.colors.text,
  },
  dropdownItemTextSelected: {
    color: App.colors.primary,
    fontWeight: "500",
  },
  modalContent: {
    backgroundColor: App.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.9,
  },
});
