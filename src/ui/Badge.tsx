import React from "react";
import { Text, View } from "react-native";

type IProps = {
  count: number;
  children: React.ReactNode;
};
export function Badge(props: IProps) {
  return (
    <View>
      {props.children}
      {props.count > 0 && (
        <View
          style={{
            position: "absolute",
            right: -8,
            top: -10,
            backgroundColor: "red",
            borderRadius: 10,
            width: 20,
            justifyContent: "center",
            alignItems: "center",
            aspectRatio: 1,
          }}
        >
          <Text style={{ color: "white", fontSize: 14 }}>{props.count}</Text>
        </View>
      )}
    </View>
  );
}
