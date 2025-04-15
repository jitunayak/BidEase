import { App } from "@/src/Constant";
import { Button, EText } from "@/src/ui";
import { ETextInput } from "@/src/ui/TextInput";
import { LucideSendHorizonal } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

export default function Support() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue !== "") {
      setMessages((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };

  return (
    <>
      <SafeAreaView />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.container}>
          <View style={styles.chatContainer}>
            {messages.map((message, index) => (
              <View key={index} style={styles.chatBubble}>
                <EText style={styles.message}>{message}</EText>
              </View>
            ))}
          </View>
          <View style={styles.inputContainer}>
            <ETextInput
              label="Message"
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Type a message..."
              style={styles.input}
            />
            <Button
              title="Send"
              onPress={handleSend}
              style={styles.sendButton}
              leftIcon={
                <LucideSendHorizonal size={18} color={App.colors.background} />
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 100,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  chatBubble: {
    backgroundColor: App.colors.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: App.colors.border,
  },
  message: {
    color: App.colors.text,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  input: {
    flex: 1,
    marginRight: 6,
  },
  sendButton: {
    borderRadius: 50,
  },
});
