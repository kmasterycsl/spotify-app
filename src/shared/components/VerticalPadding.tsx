import { Box } from "native-base";
import React from "react";
import { ReactNode } from "react";
import { View } from "react-native";
import { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export default function VerticalPadding() {
  return <Box my={DEFAULT_HORIZONTAL_PADDING / 2}></Box>;
}
