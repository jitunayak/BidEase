import { TextInputEditable } from "@/src/components";
import { App, Colors } from "@/src/Constant";
import { useUpdateUserBasicInfoMutation } from "@/src/gql/generated";
import { storage } from "@/src/hooks/storage";
import { useStore } from "@/src/hooks/useStorage";
import { Button, EText } from "@/src/ui";
import { Header } from "@/src/ui/Header";
import { ETextInput } from "@/src/ui/TextInput";
import Octicons from "@expo/vector-icons/Octicons";
import * as FileSystem from "expo-file-system";
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
  const { navigateTo, phoneNumber, userId } = useLocalSearchParams<{
    navigateTo: any;
    phoneNumber: string;
    userId: string;
  }>();

  const [updateBasicInfo, { loading, error }] =
    useUpdateUserBasicInfoMutation();

  const [data, setData] = useState({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: phoneNumber || user?.phoneNumber || "",
    image: user?.image || "",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      if (user) {
        const token = storage.get("user.token");

        const response = await FileSystem.uploadAsync(
          `${App.api.baseUrl}/api/users/${user.id}/image`,
          result.assets[0].uri,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: "file", // Replace with the field name expected by your server
          }
        );

        if (response.status === 200) {
          console.log("Image uploaded successfully");
          const imageUri = result.assets[0].uri ?? user?.image ?? "";
          setUser({ ...user, image: imageUri });
        } else {
          console.error("Failed to upload image", response);
        }
      }
    }
  };

  const onSubmit = async () => {
    console.log(data);
    updateBasicInfo({
      variables: {
        id: userId,
        name: data.name || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
      },
    })
      .then((result) => {
        console.log(result);
        if (result.data)
          setUser({
            ...result.data?.updateUser,
          });

        if (navigateTo === "dismiss") router.back();
        else {
          router.navigate(`/(modals)/${navigateTo}` as any);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", "Something went wrong");
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header closeButton={navigateTo === "dismiss"} />
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          padding: 8,
          flex: 1,
          backgroundColor: Colors.background,
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
          <TextInputEditable
            label="Name"
            value={data.name}
            onChangeText={(e) => setData({ ...data, name: e })}
            editOption={navigateTo === "dismiss"}
          />
          <ETextInput
            label="Phone number"
            value={data.phoneNumber}
            disabled
            onChangeText={(e) => setData({ ...data, phoneNumber: e })}
          />
          <TextInputEditable
            label="Email"
            value={data.email}
            onChangeText={(e) => setData({ ...data, email: e })}
            editOption={navigateTo === "dismiss"}
            onUpdatePressed={() => {}}
          />

          <Button
            title="Save"
            style={{ marginTop: 8 }}
            onPress={onSubmit}
            variant="primary"
            isLoading={loading}
            disabled={
              data.email && data.name && data.phoneNumber ? false : true
            }
          />
        </KeyboardAvoidingView>
      </View>
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
