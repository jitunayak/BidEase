import { UPDATE_USER_PREFERENCE } from "@/graphql/users.query,";
import { Colors } from "@/src/Constant";
import { User } from "@/src/gql/graphql";
import { useStore } from "@/src/hooks/useStorage";
import { EText } from "@/src/ui";
import { useMutation } from "@apollo/client";
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
      {isSelected && (
        <FontAwesome name="check" size={22} color={Colors.primary} />
      )}
    </TouchableOpacity>
  );
};

export default function NotificationPreference() {
  const router = useRouter();
  const { setUser, user } = useStore();

  const [preferences, setPreferences] = useState({
    vehicles: !!user?.preferences.interests.includes("vehicles"),
    lands: !!user?.preferences.interests.includes("lands"),
    gold: !!user?.preferences.interests.includes("gold"),
    property: !!user?.preferences.interests.includes("property"),
  });

  const [updatePreference, { loading, data }] = useMutation<User>(
    UPDATE_USER_PREFERENCE
  );

  const handleSubmit = async () => {
    updatePreference({
      variables: {
        id: "4",
        interests: Object.keys(preferences).filter(
          (key) => preferences[key as keyof typeof preferences] === true
        ),
      },
    })
      .then(() => {
        if (data) setUser(data);
        router.navigate("/(app)/(tabs)");
        Alert.alert("Preferences updated successfully");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Something went wrong");
      });
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 16 }}>
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
    </SafeAreaView>
  );
}
