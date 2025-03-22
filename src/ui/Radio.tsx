import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Colors } from "../Constant";

type IProps = {
  isDefaultOn?: boolean;
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

export const Radio: React.FC<IProps> = (props) => {
  const [isOn, setIsOn] = useState(props.isDefaultOn ?? false);

  const handleToggle = () => {
    setIsOn(!isOn);
    props.onToggle();
  };

  useEffect(() => {
    setIsOn(props.isOn);
  }, [props.isOn]);

  return (
    <Pressable onPress={handleToggle}>
      {isOn ? (
        <FontAwesome6
          name="circle-check"
          size={22}
          color={props.disabled ? Colors.secondary : Colors.primary}
        />
      ) : (
        <FontAwesome6
          name="circle"
          size={22}
          color={props.disabled ? Colors.secondary : Colors.border}
        />
      )}
    </Pressable>
  );
};
