import React from "react";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { View } from "react-native";

export default function HStack({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[{ flexDirection: "row" }, style]}>{children}</View>;
}
