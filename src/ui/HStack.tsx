import { View, ViewProps } from "react-native";

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
};
export const HStack = (props: Props & ViewProps) => {
  const {
    children,
    alignItems = "center",
    justifyContent = "space-between",
    gap = 8,
    ...rest
  } = props;
  return (
    <View
      style={{ flexDirection: "row", alignItems, justifyContent, gap }}
      {...rest}
    >
      {children}
    </View>
  );
};
