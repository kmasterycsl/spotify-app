import { useColorModeValue } from "native-base";
import React from "react";
import {
  NativeSafeAreaViewProps,
  SafeAreaView as BaseSafeAreaView,
} from "react-native-safe-area-context";

export default function SafeAreaView({
  style,
  ...rest
}: NativeSafeAreaViewProps) {
  const bg = useColorModeValue("white", "black");
  return (
    <BaseSafeAreaView
      style={[
        style,
        {
          backgroundColor: bg,
        },
      ]}
      {...rest}
    />
  );
}
