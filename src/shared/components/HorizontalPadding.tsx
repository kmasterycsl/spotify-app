import { Box } from "native-base";
import React from "react";
import { ReactNode } from "react";

export const DEFAULT_HORIZONTAL_PADDING = 3;

export default function HorizontalPadding({
  children,
}: {
  children: ReactNode;
}) {
  return <Box px={DEFAULT_HORIZONTAL_PADDING}>{children}</Box>;
}
