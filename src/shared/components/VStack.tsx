import React from "react";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { View } from "react-native";

export default function VStack({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[{ flexDirection: "column" }, style]}>{children}</View>;
}
