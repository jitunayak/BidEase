import { EText } from "@/src/ui";
import { ETextInput } from "@/src/ui/TextInput";
import Octicons from "@expo/vector-icons/Octicons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type IProps = {
  name: string;
  email: string;
  phoneNumber: string;
};
export default function EditProfile() {
  const [image, setImage] = useState<string>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
          image ? { uri: image } : require("../../assets/images/profile.png")
        }
        style={styles.thumbnail}
      />
      <TouchableOpacity
        onPress={pickImage}
        style={{ gap: 8, flexDirection: "row", alignItems: "center" }}
      >
        <Octicons name="device-camera" size={20} color="black" />
        <EText>Upload picture</EText>
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, width: "100%", gap: 8 }}
      >
        <ETextInput placeholder="Name" value="John Doe" />
        <ETextInput placeholder="Phone number" value="+91 9876543210" />
        <ETextInput placeholder="Email" value="H3ePZ@example.com" />
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
