import { Colors } from "@/src/Constant";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Text, TextInput, View } from "react-native";

export default function search() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          borderWidth: 1,
          borderColor: Colors.border,
          borderRadius: 8,
          gap: 8,
          margin: 8,
          alignItems: "center",
        }}
      >
        <Octicons name="search" size={18} color={Colors.secondary} />
        <TextInput
          placeholder="Try searching for a name"
          clearButtonMode="always"
          autoFocus={true}
          style={{
            width: "auto",
            fontSize: 18,
            flex: 1,
          }}
          placeholderTextColor={Colors.secondary}
        />
      </View>

      <Text style={{ color: Colors.text, marginTop: 50 }}>
        No matching results found
      </Text>
    </View>
  );
}
