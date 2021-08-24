import React from "react";
import { ReactNode } from "react";
import { View } from "react-native";

export const DEFAULT_VERTICAL_PADDING = 12;

export default function VerticalPadding({ children }: { children: ReactNode }) {
  return (
    <View style={{ paddingHorizontal: DEFAULT_VERTICAL_PADDING }}>
      {children}
    </View>
  );
}
