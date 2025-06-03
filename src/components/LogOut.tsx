import { nativeApplicationVersion, nativeBuildVersion } from "expo-application";
import { useRouter } from "expo-router";
import { LogOutIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { App } from "../Constant";
import { useStore } from "../hooks/useStorage";
import { RNUtils } from "../lib/rn-utils";

export const LogOut = () => {
  const router = useRouter();
  const { setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
    RNUtils.giveHapticFeedback();
    router.replace("/(auth)/login");
  };
  return (
    <View
      style={{
        flex: 1,
        width: "90%",
        marginRight: 24,
        marginBottom: App.ui.padding.xl,
      }}
    >
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOutIcon size={20} color={App.colors.danger} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.versionText}>
        Version {nativeApplicationVersion} ({nativeBuildVersion})
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: App.colors.card,
    borderRadius: 12,
    gap: 8,
    width: "100%",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.danger,
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: App.colors.textTertiary,
    marginBottom: 104,
  },
});
