import { UPDATE_USER_NOTIFICATIONS_PREFERENCE } from "@/graphql/users.query";
import { Header } from "@/src/components/Header";
import { Colors } from "@/src/Constant";
import { storage } from "@/src/hooks/storage";
import { useStore } from "@/src/hooks/useStorage";
import { EText } from "@/src/ui";
import { useMutation } from "@apollo/client";
import * as AppleColors from "@bacons/apple-colors";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";

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
          <EText variant="body">{title}</EText>
        </View>
        <Switch value={value} onValueChange={onValueChange} />
      </View>
      <EText variant="label">{description}</EText>
    </View>
  </View>
);

export default function NotificationPreference() {
  const { set, getBoolean } = storage;
  const { user } = useStore();
  const [updateNotificationPreference, { loading }] = useMutation(
    UPDATE_USER_NOTIFICATIONS_PREFERENCE
  );

  const [preferences, setPreferences] = React.useState({
    // app: !!getBoolean("notification.app"),
    // email: !!getBoolean("notification.email"),
    // sms: !!getBoolean("notification.sms"),
    app: !!user?.preferences.notifications.pushNotifications,
    email: !!user?.preferences.notifications.emailNotifications,
    sms: !!user?.preferences.notifications.smsNotifications,
  });

  React.useEffect(() => {
    // set("notification.app", !!preferences.app);
    // set("notification.email", !!preferences.email);
    // set("notification.sms", !!preferences.sms);

    updateNotificationPreference({
      variables: {
        id: "4",
        pushNotifications: preferences.app,
        emailNotifications: preferences.email,
        smsNotifications: preferences.sms,
      },
    });
  }, [preferences]);

  const handleToggle = (key: string, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppleColors.systemGroupedBackground,
        padding: 8,
      }}
    >
      <Header title="Notification Preferences" closeButton />

      <EText variant="label" style={{ paddingLeft: 16, paddingTop: 16 }}>
        GET NOTIFICATIONS
      </EText>
      <View style={styles.container}>
        <NotificationItem
          icon={<Octicons name="bell" size={18} color="black" />}
          title="App Notification"
          description="Control how you receive notifications"
          value={preferences.app}
          onValueChange={(value) => handleToggle("app", value)}
        />
        <NotificationItem
          icon={<Octicons name="mail" size={18} color="black" />}
          title="Email Notification"
          description="Control how you receive emails"
          value={preferences.email}
          onValueChange={(value) => handleToggle("email", value)}
        />
        <NotificationItem
          icon={<Octicons name="comment" size={18} color="black" />}
          title="SMS Notification"
          description="Receives text messages"
          value={preferences.sms}
          onValueChange={(value) => handleToggle("sms", value)}
        />
      </View>
      <EText variant="label" style={{ paddingLeft: 16, paddingTop: 16 }}>
        OFFERS AND UPDATES
      </EText>
      <View style={styles.container}>
        <NotificationItem
          icon={<Octicons name="bell" size={18} color="black" />}
          title="Latest deals and offers"
          description="Get updated with our latest deals"
          value={preferences.app}
          onValueChange={(value) => handleToggle("app", value)}
        />
        <NotificationItem
          icon={<Octicons name="bell" size={18} color="black" />}
          title="Auction bidding"
          description="Know if somebody outbids you"
          value={preferences.app}
          onValueChange={(value) => handleToggle("app", value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    gap: 16,
    margin: 8,
    borderRadius: 8,
    padding: 8,
  },
  item: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    margin: 8,
    borderRadius: 8,
  },
});
