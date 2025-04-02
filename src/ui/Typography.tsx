import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { App } from "../Constant";

interface TextProps {
  children: React.ReactNode;
  variant?:
    | "largeTitle"
    | "title1"
    | "title2"
    | "title3"
    | "headline"
    | "body"
    | "callout"
    | "subhead"
    | "footnote"
    | "caption1"
    | "caption2";
  color?: string;
  align?: "auto" | "left" | "right" | "center" | "justify";
  weight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  style?: any;
}

export function Text({
  children,
  variant = "body",
  color = App.colors.text,
  align = "left",
  weight = "normal",
  style,
}: TextProps) {
  return (
    <RNText
      style={[
        styles[variant],
        { color, textAlign: align, fontWeight: weight },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  largeTitle: {
    fontSize: App.typography.largeTitle,
    lineHeight: App.typography.largeTitle * 1.2,
  },
  title1: {
    fontSize: App.typography.title1,
    lineHeight: App.typography.title1 * 1.2,
  },
  title2: {
    fontSize: App.typography.title2,
    lineHeight: App.typography.title2 * 1.2,
  },
  title3: {
    fontSize: App.typography.title3,
    lineHeight: App.typography.title3 * 1.2,
  },
  headline: {
    fontSize: App.typography.headline,
    lineHeight: App.typography.headline * 1.2,
    fontWeight: "600",
  },
  body: {
    fontSize: App.typography.body,
    lineHeight: App.typography.body * 1.4,
  },
  callout: {
    fontSize: App.typography.callout,
    lineHeight: App.typography.callout * 1.4,
  },
  subhead: {
    fontSize: App.typography.subhead,
    lineHeight: App.typography.subhead * 1.4,
  },
  footnote: {
    fontSize: App.typography.footnote,
    lineHeight: App.typography.footnote * 1.4,
  },
  caption1: {
    fontSize: App.typography.caption1,
    lineHeight: App.typography.caption1 * 1.4,
  },
  caption2: {
    fontSize: App.typography.caption2,
    lineHeight: App.typography.caption2 * 1.4,
  },
});
