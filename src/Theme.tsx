import { StyleSheet } from "react-native";
import { App } from "./Constant";

export const uiStyles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  shadowLight: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
  },
  outlineContainer: {
    backgroundColor: App.colors.secondaryBackground,
    borderWidth: 1,
    borderColor: App.colors.border,
    padding: 16,
    borderRadius: App.ui.borderRadius.sm,
  },
  container: {
    flex: 1,
    backgroundColor: App.colors.background,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: App.colors.borderLight,
    justifyContent: "center",
    alignItems: "center",
  },
});
