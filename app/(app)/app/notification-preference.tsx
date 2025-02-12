import { Colors } from "@/src/Constant";
import { storage } from "@/src/hooks/storage";
import { VStack } from "@/src/ui/VStack";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function NotificationPreference() {
  const { set, getBoolean } = storage;
  const [preferences, setPreferences] = React.useState({
    app: !!getBoolean("notification.app"),
    email: !!getBoolean("notification.email"),
    sms: !!getBoolean("notification.sms"),
  });

  React.useEffect(() => {
    set("notification.app", !!preferences.app);
    set("notification.email", !!preferences.email);
    set("notification.sms", !!preferences.sms);
  }, [preferences]);

  return (
    <View>
      <View style={styles.group}>
        <View style={styles.item}>
          <Octicons name="bell" size={24} color="black" />
          <VStack alignItems="flex-start">
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              App Notification
            </Text>
            <Text style={{ color: Colors.secondary }}>
              Control how you receive notifications
            </Text>
          </VStack>
          <Switch
            value={preferences.app}
            onValueChange={(e) => setPreferences({ ...preferences, app: e })}
          />
        </View>
      </View>
      <View style={styles.group}>
        <View style={styles.item}>
          <Octicons name="mail" size={24} color="black" />
          <VStack alignItems="flex-start">
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              Email Notification
            </Text>
            <Text style={{ color: Colors.secondary }}>
              Control how you receive emails
            </Text>
          </VStack>
          <Switch
            value={preferences.email}
            onValueChange={(e) => setPreferences({ ...preferences, email: e })}
          />
        </View>
      </View>
      <View style={styles.group}>
        <View style={styles.item}>
          <Octicons name="comment" size={24} color="black" />
          <VStack alignItems="flex-start">
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              SMS Notification
            </Text>
            <Text style={{ color: Colors.secondary }}>
              Receives text messages
            </Text>
          </VStack>
          <Switch
            value={preferences.sms}
            onValueChange={(e) => setPreferences({ ...preferences, sms: e })}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  group: {
    padding: 8,
    fontSize: 18,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 4,
  },
});
