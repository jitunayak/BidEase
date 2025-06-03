import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { App } from "../Constant";
import { RNUtils } from "../lib/rn-utils";
import { uiStyles } from "../Theme";

type SwitchProps = {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  color?: string;
};
export const Switch = (props: SwitchProps) => {
  const [toggle, setToggle] = useState(props.value ?? false);

  useEffect(() => {
    props.onValueChange && props.onValueChange(toggle);
  }, [toggle]);

  const toggleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(toggle ? 16 : 0),
        },
      ],
    };
  });

  const handleToggle = () => {
    RNUtils.giveHapticFeedback();
    setToggle(!toggle);
  };
  return (
    <Pressable
      onPress={() => handleToggle()}
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 60,
        minWidth: 40,
        backgroundColor: toggle
          ? props.color || App.colors.success
          : App.colors.border,
      }}
    >
      <Animated.View
        style={[
          {
            width: 16,
            height: 16,
            borderRadius: 60,
            backgroundColor: App.colors.background,
            margin: 4,
            ...uiStyles.shadowLight,
          },
          toggleAnimatedStyle,
        ]}
      />
    </Pressable>
  );
};
