import * as Haptics from "expo-haptics";
import React from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { Colors } from "../Constant";
import { HStack } from "./HStack";

export type TabValue = string;

export type TabProps = {
  value: TabValue;
  children: React.ReactNode;
};

const Tab = ({ value, children }: TabProps) => {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
};

export const Tabs = ({
  defaultValue,
  children,
  value: selectedTab,
  onChange: setSelectedTab,
  activeColor,
  inactiveColor,
  style,
}: {
  defaultValue: TabValue;
  children: React.ReactNode;
  value: TabValue;
  activeColor?: string;
  inactiveColor?: string;
  onChange: (value: TabValue) => void;
  style?: ViewStyle;
}) => {
  const item = ({
    value,
    children,
  }: {
    value: TabValue;
    children: React.ReactNode;
  }) => {
    return (
      <TouchableOpacity
        key={value}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setSelectedTab(value);
        }}
        style={{
          paddingHorizontal: 4,
          paddingVertical: 8,
          borderBottomWidth: selectedTab === value ? 2 : 0,
          borderBottomColor: activeColor || Colors.primary,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color:
              selectedTab === value
                ? activeColor || Colors.primary
                : inactiveColor || Colors.secondary,
          }}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <HStack gap={16} justifyContent="flex-start" style={style}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return item(child.props);
        }
        return null;
      })}
    </HStack>
  );
};

Tabs.Item = Tab;
