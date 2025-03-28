import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { EText } from ".";
import { App, Colors } from "../Constant";

type IProps = {
  title?: string;
  closeButton?: boolean;
  showCloseText?: boolean;
  showCancelText?: boolean;
  backButton?: boolean;
};
export const Header = (props: IProps) => {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 32,
        paddingTop: App.isIOS ? 16 : App.ui.padding.xl,
        paddingHorizontal: App.ui.padding.lg,
        alignItems: "center",
        backgroundColor: App.colors.background,
      }}
    >
      {props.backButton && (
        <Pressable onPress={() => router.back()}>
          <View
            style={{
              gap: 8,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={App.colors.text}
            />
            <EText variant="medium">Back</EText>
          </View>
        </Pressable>
      )}
      <EText variant="title" style={{}}>
        {props.title}
      </EText>

      {App.isIOS && props.closeButton && (
        <Pressable onPress={() => router.dismiss()}>
          <MaterialCommunityIcons
            name="close-circle"
            size={26}
            color={Colors.border}
          />
        </Pressable>
      )}

      {props.showCancelText ||
        (props.showCloseText && (
          <Pressable
            onPress={() => router.dismiss()}
            style={{
              paddingRight: App.ui.padding.md,
            }}
          >
            {props.showCancelText && <EText variant="medium">Cancel</EText>}
            {props.showCloseText && <EText variant="medium">Close</EText>}
          </Pressable>
        ))}
    </View>
  );
};
