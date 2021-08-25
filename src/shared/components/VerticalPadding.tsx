import { Box } from "native-base";
import React from "react";
import { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export default function VerticalPadding(
  { multiple }: { multiple?: number } = { multiple: 1 }
) {
  return <Box my={((multiple || 1) * DEFAULT_HORIZONTAL_PADDING) / 2}></Box>;
}
