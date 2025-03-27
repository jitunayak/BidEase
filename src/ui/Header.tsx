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
};
export const Header = (props: IProps) => {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 32,
        paddingTop: 16,
        paddingHorizontal: App.ui.padding.md,
        alignItems: "center",
        backgroundColor: App.colors.background,
      }}
    >
      <EText variant="title" style={{}}>
        {props.title}
      </EText>

      {props.closeButton && (
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
            {props.showCancelText && <EText variant="link">Cancel</EText>}
            {props.showCloseText && <EText variant="link">Close</EText>}
          </Pressable>
        ))}
    </View>
  );
};
