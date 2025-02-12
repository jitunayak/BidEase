import { View, ViewProps, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  gap?: number;
  style?: ViewStyle;
};
export const HStack = (props: Props & ViewProps) => {
  const {
    children,
    alignItems = "center",
    justifyContent = "space-between",
    gap = 8,
    style,
    ...rest
  } = props;
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems,
        justifyContent,
        gap,
        ...(style || {}),
      }}
      {...rest}
    >
      {children}
    </View>
  );
};
