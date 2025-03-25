import { App, Colors } from "@/src/Constant";
import { useUpdateUserInterestsMutation } from "@/src/gql/generated";
import { useStore } from "@/src/hooks/useStorage";
import { Radio } from "@/src/ui";
import { Header } from "@/src/ui/Header";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
        marginVertical: 4,
        borderRadius: App.ui.borderRadius.sm,
        // borderColor: Colors.border,
        borderColor: isSelected ? Colors.primary : App.colors.border,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {React.cloneElement(icon as React.ReactElement, {
          color: isSelected ? Colors.primary : Colors.border,
        })}
        <Text
          style={{
            marginLeft: 16,
            fontSize: 16,
            color: isSelected ? Colors.primary : Colors.secondary,
          }}
        >
          {title}
        </Text>
      </View>
      <Radio isDefaultOn={isSelected} onToggle={onPress} isOn={isSelected} />
    </TouchableOpacity>
  );
};

export default function NotificationPreference() {
  const router = useRouter();
  const { setUser, user } = useStore();

  console.log(user);
  // console.log(user);
  const [preferences, setPreferences] = useState(
    user?.preferences.interests.length === 0
      ? {
          vehicles: true,
          lands: true,
          gold: true,
          property: true,
        }
      : {
          vehicles: !!user?.preferences.interests.includes("vehicles"),
          lands: !!user?.preferences.interests.includes("lands"),
          gold: !!user?.preferences.interests.includes("gold"),
          property: !!user?.preferences.interests.includes("property"),
        }
  );

  console.log({ preferences });
  const [updatePreference, { loading }] = useUpdateUserInterestsMutation({
    // refetchQueries: [GET_USER_QUERY],
  });

  const handleSubmit = async () => {
    updatePreference({
      variables: {
        id: user?.id!,
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
        router.replace("/(tabs)/home");
        Alert.alert("Preferences updated successfully");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Something went wrong");
      });
  };

  const handleSelect = (input: typeof preferences) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPreferences(input);
  };
  return (
    <View style={{ padding: 16, backgroundColor: "white", flex: 1 }}>
      <Header title="Auction Preferences" closeButton />
      <Item
        title="Vehicles"
        icon={<FontAwesome name="car" size={22} color={Colors.primary} />}
        onPress={() => {
          handleSelect({ ...preferences, vehicles: !preferences.vehicles });
        }}
        isSelected={!!preferences.vehicles}
      />
      <Item
        title="Lands"
        icon={
          <MaterialIcons name="landscape" size={26} color={Colors.primary} />
        }
        onPress={() => {
          handleSelect({ ...preferences, lands: !preferences.lands });
        }}
        isSelected={preferences.lands}
      />
      <Item
        title="Property"
        icon={<FontAwesome name="home" size={24} color={Colors.primary} />}
        onPress={() => {
          handleSelect({ ...preferences, property: !preferences.property });
        }}
        isSelected={preferences.property}
      />
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
          handleSelect({ ...preferences, gold: !preferences.gold });
        }}
        isSelected={preferences.gold}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          marginTop: 32,
          padding: 16,
          borderRadius: App.ui.borderRadius.sm,
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
