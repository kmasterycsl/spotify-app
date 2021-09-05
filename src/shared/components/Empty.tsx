import React from "react";
import { HStack, Text } from "native-base";

export default function Empty({ text }: { text?: string }) {
  return (
    <HStack justifyContent="center">
      <Text>{text || "Empty content"}</Text>
    </HStack>
  );
}
