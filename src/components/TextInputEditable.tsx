import Octicons from "@expo/vector-icons/Octicons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../Constant";
import { Button } from "../ui";
import { ETextInput, IETextInputProps } from "../ui/TextInput";

type IProps = {
  label: string;
  value: string;
  onChangeText: (e: string) => void;
  disabled?: boolean;
  editOption?: boolean;
  onUpdatePressed?: () => void;
} & Partial<IETextInputProps>;

export const TextInputEditable = (props: IProps) => {
  const [showActions, setShowActions] = useState(false);

  const actionGroupAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(showActions ? 0 : -10, { duration: 200 }),
        },
      ],
    };
  });

  return (
    <View style={{ gap: 8 }}>
      <ETextInput
        rightSection={
          props.editOption && (
            <Pressable onPress={() => setShowActions(() => !showActions)}>
              <Octicons
                name="pencil"
                size={20}
                color={Colors.primary}
                style={{ marginRight: 8 }}
              />
            </Pressable>
          )
        }
        onPressRightSection={() => {}}
        disabled={
          props.disabled ? true : props.editOption ? !showActions : false
        }
        {...props}
      />

      <Animated.View style={actionGroupAnimatedStyle}>
        {showActions && (
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              justifyContent: "center",
            }}
          >
            <Button
              variant="outline"
              style={{ flex: 1 }}
              title="Update"
              onPress={() => {
                setShowActions(false);
                props.onUpdatePressed && props.onUpdatePressed();
              }}
            />
            <Button
              variant="secondary"
              style={{ flex: 1 }}
              title="Cancel"
              onPress={() => {
                setShowActions(false);
              }}
            />
          </View>
        )}
      </Animated.View>
    </View>
  );
};
