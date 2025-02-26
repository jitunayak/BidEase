import { Colors } from "@/src/Constant";
import { storage } from "@/src/hooks/storage";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

const NotificationItem = ({
  icon,
  title,
  description,
  value,
  onValueChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => (
  <View style={styles.item}>
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{ flexDirection: "row", justifyContent: "flex-start", gap: 8 }}
        >
          {icon}
          <Text style={{ fontWeight: "500", fontSize: 16 }}>{title}</Text>
        </View>
        <Switch value={value} onValueChange={onValueChange} />
      </View>
      <Text style={{ color: Colors.secondary }}>{description}</Text>
    </View>
  </View>
);

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

  const handleToggle = (key: string, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <NotificationItem
        icon={<Octicons name="bell" size={20} color="black" />}
        title="App Notification"
        description="Control how you receive notifications"
        value={preferences.app}
        onValueChange={(value) => handleToggle("app", value)}
      />
      <NotificationItem
        icon={<Octicons name="mail" size={20} color="black" />}
        title="Email Notification"
        description="Control how you receive emails"
        value={preferences.email}
        onValueChange={(value) => handleToggle("email", value)}
      />
      <NotificationItem
        icon={<Octicons name="comment" size={20} color="black" />}
        title="SMS Notification"
        description="Receives text messages"
        value={preferences.sms}
        onValueChange={(value) => handleToggle("sms", value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    gap: 16,
    borderRadius: 8,
  },
  item: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
