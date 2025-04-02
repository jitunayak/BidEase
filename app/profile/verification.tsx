import { App } from "@/src/Constant";
import { useAuthStore } from "@/src/store/auth-store";
import { Button } from "@/src/ui";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AlertCircle, CheckCircle, Upload } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function VerificationScreen() {
  const router = useRouter();
  const { user, updateProfile, isLoading } = useAuthStore();

  const [idFrontImage, setIdFrontImage] = useState<string | null>(null);
  const [idBackImage, setIdBackImage] = useState<string | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);

  const isVerified = user?.kycVerified;
  const isComplete = idFrontImage && idBackImage && selfieImage;

  const pickImage = async (
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "You need to grant permission to access your photos"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setter(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleSubmit = async () => {
    if (!isComplete) {
      Alert.alert("Incomplete", "Please upload all required documents");
      return;
    }

    try {
      // In a real app, this would upload the images to a server
      // and initiate the verification process

      // For demo purposes, we'll just update the user's verification status
      await updateProfile({
        kycVerified: true,
      });

      Alert.alert(
        "Verification Submitted",
        "Your verification documents have been submitted successfully. We will review them shortly.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to submit verification documents");
    }
  };

  const renderVerificationStatus = () => {
    if (isVerified) {
      return (
        <View style={styles.statusContainer}>
          <CheckCircle size={24} color={App.colors.verified} />
          <Text style={[styles.statusText, { color: App.colors.verified }]}>
            Your account is verified
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.statusContainer}>
        <AlertCircle size={24} color={App.colors.warning} />
        <Text style={[styles.statusText, { color: App.colors.warning }]}>
          Verification required
        </Text>
      </View>
    );
  };

  const renderDocumentUploader = (
    title: string,
    description: string,
    image: string | null,
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => (
    <View style={styles.uploaderContainer}>
      <Text style={styles.uploaderTitle}>{title}</Text>
      <Text style={styles.uploaderDescription}>{description}</Text>

      {image ? (
        <View style={styles.imagePreviewContainer}>
          <Image
            source={{ uri: image }}
            style={styles.imagePreview}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => pickImage(setter)}
          >
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => pickImage(setter)}
        >
          <Upload size={24} color={App.colors.primary} />
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (isVerified) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <Stack.Screen
          options={{
            title: "Account Verification",
          }}
        />

        <View style={styles.verifiedContainer}>
          <View style={styles.verifiedIconContainer}>
            <CheckCircle size={80} color={App.colors.verified} />
          </View>

          <Text style={styles.verifiedTitle}>Account Verified</Text>
          <Text style={styles.verifiedText}>
            Your account has been successfully verified. You now have full
            access to all features.
          </Text>

          <Button
            title="Go Back"
            size="lg"
            onPress={() => router.back()}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Stack.Screen
        options={{
          title: "Account Verification",
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderVerificationStatus()}

        <Text style={styles.infoText}>
          To verify your account, please upload clear photos of the following
          documents:
        </Text>

        {renderDocumentUploader(
          "ID Card (Front)",
          "Upload the front side of your government-issued ID card",
          idFrontImage,
          setIdFrontImage
        )}

        {renderDocumentUploader(
          "ID Card (Back)",
          "Upload the back side of your government-issued ID card",
          idBackImage,
          setIdBackImage
        )}

        {renderDocumentUploader(
          "Selfie with ID",
          "Upload a photo of yourself holding your ID card",
          selfieImage,
          setSelfieImage
        )}

        <Button
          title="Submit for Verification"
          size="lg"
          fullWidth
          onPress={handleSubmit}
          isLoading={isLoading}
          disabled={!isComplete || isLoading}
          style={styles.submitButton}
        />

        <Text style={styles.disclaimerText}>
          Your documents will be securely stored and used only for verification
          purposes. Verification usually takes 1-2 business days.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: App.colors.card,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  uploaderContainer: {
    backgroundColor: App.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  uploaderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.text,
    marginBottom: 4,
  },
  uploaderDescription: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "rgba(0, 102, 204, 0.1)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: App.colors.primary,
    borderStyle: "dashed",
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: App.colors.primary,
  },
  imagePreviewContainer: {
    position: "relative",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  changeButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  changeButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: App.colors.card,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  disclaimerText: {
    fontSize: 12,
    color: App.colors.textTertiary,
    textAlign: "center",
    marginBottom: 24,
  },
  verifiedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  verifiedIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(90, 200, 250, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  verifiedTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: App.colors.text,
    marginBottom: 16,
  },
  verifiedText: {
    fontSize: 16,
    color: App.colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  backButton: {
    width: "50%",
  },
});
