import { systemGray } from "@bacons/apple-colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { EText } from "../ui";

type IProps = {
  title?: string;
  closeButton?: boolean;
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
        paddingHorizontal: 8,
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
            color={systemGray}
          />
        </Pressable>
      )}
    </View>
  );
};
