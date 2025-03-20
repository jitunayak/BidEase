import { useUpdateUserBasicInfoMutation } from "@/src/gql/generated";
import { IUser } from "@/src/hooks/user-store-slice";
import { useStore } from "@/src/hooks/useStorage";
import { Button, EText } from "@/src/ui";
import { ETextInput } from "@/src/ui/TextInput";
import Octicons from "@expo/vector-icons/Octicons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
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
  const { navigateTo } = useLocalSearchParams<{ navigateTo: any }>();

  const [updateBasicInfo, { loading, error }] =
    useUpdateUserBasicInfoMutation();

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
      if (user)
        setUser({ ...user, image: result.assets[0].uri ?? user?.image ?? "" });
    }
  };

  const onSubmit = async () => {
    await updateBasicInfo({
      variables: {
        id: data.id || "",
        name: data.name || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
      },
    });
    if (user)
      setUser({
        ...user,
        id: data.id || "",
        email: data.email || "",
        name: data.name || "",
        phoneNumber: data.phoneNumber || "",
      });

    if (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
      return;
    } else {
      if (loading) return;
      if (navigateTo === "dismiss") router.dismiss();
      else {
        router.navigate(`/(app)/${navigateTo}` as any);
      }
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
          label="Name"
          value={data.name}
          onChangeText={(e) => setData({ ...data, name: e })}
        />
        <ETextInput
          label="Phone number"
          value={data.phoneNumber}
          disabled
          onChangeText={(e) => setData({ ...data, phoneNumber: e })}
        />
        <ETextInput
          label="Email"
          value={data.email}
          onChangeText={(e) => setData({ ...data, email: e })}
        />
        <Button
          style={{ marginTop: 8 }}
          title="Save"
          onPress={onSubmit}
          variant="primary"
          isLoading={loading}
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
