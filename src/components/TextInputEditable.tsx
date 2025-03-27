import Octicons from "@expo/vector-icons/Octicons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../Constant";
import { Button, HStack } from "../ui";
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
        disabled={!showActions || props.disabled}
        {...props}
      />

      <Animated.View style={actionGroupAnimatedStyle}>
        {showActions && (
          <HStack>
            <Button
              variant="light"
              title="Update"
              onPress={() => {
                setShowActions(false);
                props.onUpdatePressed && props.onUpdatePressed();
              }}
            />
            <Button
              variant="secondary"
              title="Cancel"
              onPress={() => {
                setShowActions(false);
              }}
            />
          </HStack>
        )}
      </Animated.View>
    </View>
  );
};
