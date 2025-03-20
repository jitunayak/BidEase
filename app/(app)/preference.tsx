import { Colors } from "@/src/Constant";
import { useUpdateUserInterestsMutation } from "@/src/gql/generated";
import { useStore } from "@/src/hooks/useStorage";
import { EText, Radio } from "@/src/ui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Item = ({
  title,
  icon,
  onPress,
  isSelected,
}: {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  isSelected: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 32,
        borderWidth: 1,
        marginVertical: 8,
        borderRadius: 8,
        borderColor: isSelected ? Colors.primary : Colors.border,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon}
        <EText style={{ marginLeft: 16, fontSize: 16 }}>{title}</EText>
      </View>
      <Radio isDefaultOn={isSelected} onToggle={onPress} isOn={isSelected} />
    </TouchableOpacity>
  );
};

export default function NotificationPreference() {
  const router = useRouter();
  const { setUser, user } = useStore();

  // console.log(user);
  const [preferences, setPreferences] = useState({
    vehicles: !!user?.preferences.interests.includes("vehicles"),
    lands: !!user?.preferences.interests.includes("lands"),
    gold: !!user?.preferences.interests.includes("gold"),
    property: !!user?.preferences.interests.includes("property"),
  });

  const [updatePreference, { loading }] = useUpdateUserInterestsMutation({
    // refetchQueries: [GET_USER_QUERY],
  });

  const handleSubmit = async () => {
    updatePreference({
      variables: {
        id: "4",
        interests: Object.keys(preferences).filter(
          (key) => preferences[key as keyof typeof preferences] === true
        ),
      },
    })
      .then((res) => {
        if (res.data) {
          setUser(res.data?.updateUserInterests);
        }
        router.dismissAll();
        router.replace("/(app)/(tabs)");
        Alert.alert("Preferences updated successfully");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Something went wrong");
      });
  };

  return (
    <View style={{ padding: 16, backgroundColor: "white", flex: 1 }}>
      <SafeAreaView />
      preferences.vehicles &&{" "}
      <Item
        title="Vehicles"
        icon={<FontAwesome name="car" size={22} color={Colors.primary} />}
        onPress={() => {
          setPreferences({ ...preferences, vehicles: !preferences.vehicles });
        }}
        isSelected={preferences.vehicles}
      />
      , preferences.parking &&{" "}
      <Item
        title="Lands"
        icon={
          <MaterialIcons name="landscape" size={26} color={Colors.primary} />
        }
        onPress={() => {
          setPreferences({ ...preferences, lands: !preferences.lands });
        }}
        isSelected={preferences.lands}
      />
      , preferences.traffic &&{" "}
      <Item
        title="Property"
        icon={<FontAwesome name="home" size={24} color={Colors.primary} />}
        onPress={() => {
          setPreferences({ ...preferences, property: !preferences.property });
        }}
        isSelected={preferences.property}
      />
      , preferences.weather &&{" "}
      <Item
        title="Gold"
        icon={
          <MaterialCommunityIcons
            name="gold"
            size={26}
            color={Colors.primary}
          />
        }
        onPress={() => {
          setPreferences({ ...preferences, gold: !preferences.gold });
        }}
        isSelected={preferences.gold}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          marginTop: 32,
          padding: 16,
          borderRadius: 8,
          width: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 8,
          backgroundColor: Colors.primary,
        }}
      >
        {loading && <ActivityIndicator color="white" />}
        <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}
