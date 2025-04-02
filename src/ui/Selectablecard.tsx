import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { App } from "../Constant";
import { RNUtils } from "../lib/rn-utils";

interface SelectableCardProps {
  title: string;
  subtitle?: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: any;
}

export function SelectableCard({
  title,
  subtitle,
  selected,
  onSelect,
  disabled = false,
  icon,
  children,
  style,
}: SelectableCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected && styles.cardSelected,
        disabled && styles.cardDisabled,
        style,
      ]}
      onPress={onSelect}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View style={styles.cardContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <View style={styles.textContainer}>
          <Text style={[styles.title, selected && styles.titleSelected]}>
            {title}
          </Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {children && <View style={styles.childrenContainer}>{children}</View>}
        </View>

        {/* {selected && (
          <View style={styles.checkContainer}>
            <Check size={20} color={App.colors.primary} />
          </View>
        )} */}
      </View>
    </TouchableOpacity>
  );
}

interface MultiCardSelectProps {
  options: Array<{
    id: string;
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    content?: React.ReactNode;
  }>;
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  maxSelections?: number;
  minSelections?: number;
  label?: string;
  error?: string;
  layout?: "grid" | "list";
  style?: any;
}

export function MultiCardSelect({
  options,
  selectedIds,
  onChange,
  maxSelections,
  minSelections = 0,
  label,
  error,
  layout = "list",
  style,
}: MultiCardSelectProps) {
  const handleSelect = (id: string) => {
    const isSelected = selectedIds.includes(id);
    let newSelectedIds: string[];

    if (isSelected) {
      // Don't allow deselection if it would go below minSelections
      if (selectedIds.length <= minSelections) {
        return;
      }
      newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
    } else {
      // Don't allow selection if it would exceed maxSelections
      if (maxSelections !== undefined && selectedIds.length >= maxSelections) {
        // Replace the last selected item
        newSelectedIds = [...selectedIds.slice(0, -1), id];
      } else {
        newSelectedIds = [...selectedIds, id];
      }
    }

    onChange(newSelectedIds);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[styles.cardsContainer, layout === "grid" && styles.gridLayout]}
      >
        {options.map((option) => (
          <SelectableCard
            key={option.id}
            title={option.title}
            subtitle={option.subtitle}
            selected={selectedIds.includes(option.id)}
            onSelect={() => handleSelect(option.id)}
            disabled={option.disabled}
            icon={option.icon}
            style={layout === "grid" ? styles.gridCard : styles.listCard}
          >
            {option.content}
          </SelectableCard>
        ))}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {maxSelections && (
        <Text style={styles.helperText}>
          {selectedIds.length} of {maxSelections} selected
        </Text>
      )}
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
  cardsContainer: {
    marginBottom: 4,
  },
  gridLayout: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: App.colors.card,
    borderRadius: App.ui.borderRadius.sm,
    borderWidth: 1,
    borderColor: App.colors.border,
    padding: 16,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      web: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  listCard: {
    width: "100%",
  },
  gridCard: {
    width: "48%",
    marginBottom: 12,
  },
  cardSelected: {
    borderColor: App.colors.primary,
    borderWidth: 1,
    backgroundColor: RNUtils.getLighterColor(App.colors.primary, 10),
  },
  cardDisabled: {
    opacity: 0.6,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: App.colors.text,
    marginBottom: 2,
  },
  titleSelected: {
    color: App.colors.primary,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: App.colors.textSecondary,
  },
  childrenContainer: {
    marginTop: 8,
  },
  checkContainer: {
    marginLeft: 12,
  },
  errorText: {
    color: App.colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    color: App.colors.textSecondary,
    marginTop: 4,
    textAlign: "right",
  },
});
