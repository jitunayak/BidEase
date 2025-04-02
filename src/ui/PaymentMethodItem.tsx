import { PaymentMethod } from "@/src/types";
import {
  Building,
  Check,
  CreditCard,
  Trash,
  Wallet,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { App } from "../Constant";

interface PaymentMethodItemProps {
  method: PaymentMethod;
  onSelect?: () => void;
  onDelete?: () => void;
  onSetDefault?: () => void;
  selectable?: boolean;
  selected?: boolean;
}

export const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({
  method,
  onSelect,
  onDelete,
  onSetDefault,
  selectable = false,
  selected = false,
}) => {
  const renderIcon = () => {
    const iconProps = { size: 24, color: App.colors.primary };

    switch (method.type) {
      case "card":
        return <CreditCard {...iconProps} />;
      case "bank":
        return <Building {...iconProps} />;
      case "wallet":
        return <Wallet {...iconProps} />;
      default:
        return <CreditCard {...iconProps} />;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onSelect}
      disabled={!onSelect}
      activeOpacity={onSelect ? 0.7 : 1}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>{renderIcon()}</View>

        <View style={styles.details}>
          <Text style={styles.name}>{method.name}</Text>
          {method.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        {!method.isDefault && onSetDefault && (
          <TouchableOpacity style={styles.actionButton} onPress={onSetDefault}>
            <Check size={20} color={App.colors.success} />
          </TouchableOpacity>
        )}

        {onDelete && (
          <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
            <Trash size={20} color={App.colors.danger} />
          </TouchableOpacity>
        )}

        {selectable && (
          <View
            style={[styles.radioButton, selected && styles.radioButtonSelected]}
          >
            {selected && <View style={styles.radioButtonInner} />}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: App.colors.card,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selected: {
    borderWidth: 2,
    borderColor: App.colors.primary,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 102, 204, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.text,
  },
  defaultBadge: {
    backgroundColor: "rgba(52, 199, 89, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 12,
    color: App.colors.success,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: App.colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  radioButtonSelected: {
    borderColor: App.colors.primary,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: App.colors.primary,
  },
});
