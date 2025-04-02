import { App } from "@/src/Constant";
import { usePaymentStore } from "@/src/store/payment-store";
import { Button } from "@/src/ui";
import { Input } from "@/src/ui/Input";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Building, Check, CreditCard, Wallet } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type PaymentType = "card" | "bank" | "wallet";

export default function AddPaymentMethodScreen() {
  const router = useRouter();
  const { addPaymentMethod, isLoading } = usePaymentStore();

  const [paymentType, setPaymentType] = useState<PaymentType>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [walletName, setWalletName] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const [errors, setErrors] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    walletName: "",
  });

  const validateCardForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!cardNumber) {
      newErrors.cardNumber = "Card number is required";
      isValid = false;
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Invalid card number";
      isValid = false;
    }

    if (!cardName) {
      newErrors.cardName = "Name on card is required";
      isValid = false;
    }

    if (!expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
      isValid = false;
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = "Invalid format (MM/YY)";
      isValid = false;
    }

    if (!cvv) {
      newErrors.cvv = "CVV is required";
      isValid = false;
    } else if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "Invalid CVV";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateBankForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!bankName) {
      newErrors.bankName = "Bank name is required";
      isValid = false;
    }

    if (!accountNumber) {
      newErrors.accountNumber = "Account number is required";
      isValid = false;
    }

    if (!routingNumber) {
      newErrors.routingNumber = "Routing number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateWalletForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!walletName) {
      newErrors.walletName = "Wallet name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    let isValid = false;

    switch (paymentType) {
      case "card":
        isValid = validateCardForm();
        break;
      case "bank":
        isValid = validateBankForm();
        break;
      case "wallet":
        isValid = validateWalletForm();
        break;
    }

    if (!isValid) return;

    try {
      let name = "";
      let last4 = "";

      if (paymentType === "card") {
        name = `${cardName}'s Card ending in ${cardNumber.slice(-4)}`;
        last4 = cardNumber.slice(-4);
      } else if (paymentType === "bank") {
        name = `${bankName} Account ending in ${accountNumber.slice(-4)}`;
        last4 = accountNumber.slice(-4);
      } else {
        name = walletName;
      }

      await addPaymentMethod({
        type: paymentType,
        name,
        last4: paymentType !== "wallet" ? last4 : undefined,
        expiryDate: paymentType === "card" ? expiryDate : undefined,
        isDefault,
      });

      Alert.alert("Success", "Payment method added successfully", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to add payment method");
    }
  };

  const renderCardForm = () => (
    <View style={styles.formContainer}>
      <Input
        label="Card Number"
        placeholder="1234 5678 9012 3456"
        keyboardType="number-pad"
        value={cardNumber}
        onChangeText={setCardNumber}
        error={errors.cardNumber}
        leftIcon={<CreditCard size={20} color={App.colors.textSecondary} />}
      />

      <Input
        label="Name on Card"
        placeholder="John Doe"
        value={cardName}
        onChangeText={setCardName}
        error={errors.cardName}
      />

      <View style={styles.row}>
        <Input
          label="Expiry Date"
          placeholder="MM/YY"
          value={expiryDate}
          onChangeText={setExpiryDate}
          error={errors.expiryDate}
          containerStyle={{ flex: 1, marginRight: 12 }}
        />

        <Input
          label="CVV"
          placeholder="123"
          keyboardType="number-pad"
          value={cvv}
          onChangeText={setCvv}
          error={errors.cvv}
          containerStyle={{ flex: 1 }}
          secureTextEntry
        />
      </View>
    </View>
  );

  const renderBankForm = () => (
    <View style={styles.formContainer}>
      <Input
        label="Bank Name"
        placeholder="Enter bank name"
        value={bankName}
        onChangeText={setBankName}
        error={errors.bankName}
        leftIcon={<Building size={20} color={App.colors.textSecondary} />}
      />

      <Input
        label="Account Number"
        placeholder="Enter account number"
        keyboardType="number-pad"
        value={accountNumber}
        onChangeText={setAccountNumber}
        error={errors.accountNumber}
      />

      <Input
        label="Routing Number"
        placeholder="Enter routing number"
        keyboardType="number-pad"
        value={routingNumber}
        onChangeText={setRoutingNumber}
        error={errors.routingNumber}
      />
    </View>
  );

  const renderWalletForm = () => (
    <View style={styles.formContainer}>
      <Input
        label="Wallet Name"
        placeholder="Enter wallet name"
        value={walletName}
        onChangeText={setWalletName}
        error={errors.walletName}
        leftIcon={<Wallet size={20} color={App.colors.textSecondary} />}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Stack.Screen
        options={{
          title: "Add Payment Method",
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.paymentTypeContainer}>
            <TouchableOpacity
              style={[
                styles.paymentTypeButton,
                paymentType === "card" && styles.activePaymentType,
              ]}
              onPress={() => setPaymentType("card")}
            >
              <CreditCard
                size={24}
                color={
                  paymentType === "card"
                    ? App.colors.card
                    : App.colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.paymentTypeText,
                  paymentType === "card" && styles.activePaymentTypeText,
                ]}
              >
                Card
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentTypeButton,
                paymentType === "bank" && styles.activePaymentType,
              ]}
              onPress={() => setPaymentType("bank")}
            >
              <Building
                size={24}
                color={
                  paymentType === "bank"
                    ? App.colors.card
                    : App.colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.paymentTypeText,
                  paymentType === "bank" && styles.activePaymentTypeText,
                ]}
              >
                Bank
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentTypeButton,
                paymentType === "wallet" && styles.activePaymentType,
              ]}
              onPress={() => setPaymentType("wallet")}
            >
              <Wallet
                size={24}
                color={
                  paymentType === "wallet"
                    ? App.colors.card
                    : App.colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.paymentTypeText,
                  paymentType === "wallet" && styles.activePaymentTypeText,
                ]}
              >
                Wallet
              </Text>
            </TouchableOpacity>
          </View>

          {paymentType === "card" && renderCardForm()}
          {paymentType === "bank" && renderBankForm()}
          {paymentType === "wallet" && renderWalletForm()}

          <TouchableOpacity
            style={styles.defaultContainer}
            onPress={() => setIsDefault(!isDefault)}
          >
            <View
              style={[styles.checkbox, isDefault && styles.checkboxChecked]}
            >
              {isDefault && <Check size={16} color={App.colors.card} />}
            </View>
            <Text style={styles.defaultText}>
              Set as default payment method
            </Text>
          </TouchableOpacity>

          <Button
            title="Save Payment Method"
            size="lg"
            fullWidth
            onPress={handleSave}
            isLoading={isLoading}
            style={styles.saveButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  paymentTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  paymentTypeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: App.colors.borderLight,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activePaymentType: {
    backgroundColor: App.colors.primary,
  },
  paymentTypeText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
    color: App.colors.textSecondary,
  },
  activePaymentTypeText: {
    color: App.colors.card,
  },
  formContainer: {
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
  },
  defaultContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: App.colors.border,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: App.colors.primary,
    borderColor: App.colors.primary,
  },
  defaultText: {
    fontSize: 16,
    color: App.colors.text,
  },
  saveButton: {
    marginBottom: 24,
  },
});
