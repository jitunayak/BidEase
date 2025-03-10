import { IUser } from "@/src/hooks/user-store-slice";
import { useStore } from "@/src/hooks/useStorage";
import { Button, EText } from "@/src/ui";
import { ETextInput } from "@/src/ui/TextInput";
import Octicons from "@expo/vector-icons/Octicons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfile() {
  const router = useRouter();
  const { user, setUser } = useStore();
  const [data, setData] = useState<IUser>({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    image: user?.image || "",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    

    if (!result.canceled) {
      setUser({ ...user, image: result.assets[0].uri ?? user?.image ?? "" });
    }
  };

  const onSubmit = () => {
    setUser({
      ...user,
      id: data.id || "",
      email: data.email || "",
      name: data.name || "",
      phoneNumber: data.phoneNumber || "",
    });
    router.dismiss();
  };

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: 8,
        flex: 1,
      }}
    >
      <Image
        source={
          user?.image
            ? { uri: user.image }
            : require("../../assets/images/profile.png")
        }
        style={styles.thumbnail}
      />
      <TouchableOpacity
        onPress={pickImage}
        style={{
          gap: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Octicons name="device-camera" size={20} color="black" />
        <EText>Upload picture</EText>
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, width: "100%", gap: 8 }}
      >
        <ETextInput
          placeholder="Name"
          value={data.name}
          onChangeText={(e) => setData((prev) => ({ ...prev, name: e }))}
        />
        <ETextInput
          placeholder="Phone number"
          value={data.phoneNumber}
          onChangeText={(e) => setData((prev) => ({ ...prev, phoneNumber: e }))}
        />
        <ETextInput
          placeholder="Email"
          value={data.email}
          onChangeText={(e) => setData((prev) => ({ ...prev, email: e }))}
        />
        <Button
          style={{ marginTop: 8 }}
          title="Save"
          onPress={onSubmit}
          variant="primary"
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
  },
});
