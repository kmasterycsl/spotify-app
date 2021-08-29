import { Box, useColorModeValue } from "native-base";
import React from "react";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export const DEFAULT_HORIZONTAL_PADDING = 3; // native base unit
export const _DEFAULT_HORIZONTAL_PADDING = 12; // default unit

export default function HorizontalPadding({
  children,
  style,
}: {
  children: ReactNode,
  style?: ViewStyle,
}) {
  const bgColor = useColorModeValue('white', 'black');

  return <Box px={DEFAULT_HORIZONTAL_PADDING} bgColor={bgColor} style={style}>{children}</Box>;
}
