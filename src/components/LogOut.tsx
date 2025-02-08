import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Colors } from "../Constant";
import { storage } from "../hooks/storage";

export default function LogOut() {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        paddingTop: 8,
        paddingBottom: 16,
      }}
      onPress={() => {
        storage.remove("user.phone_number");
        router.navigate("/login");
      }}
    >
      <MaterialIcons name="logout" size={20} color={Colors.error} />
      <Text style={{ color: Colors.error, fontSize: 16 }}>Logout</Text>
    </TouchableOpacity>
  );
}
