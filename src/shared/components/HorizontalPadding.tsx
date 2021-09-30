import { Box, useColorModeValue } from "native-base";
import React, { ReactNode } from "react";
import { ViewStyle } from "react-native";

export const DEFAULT_HORIZONTAL_PADDING = 4;
const NATIVE_BASE_TO_DEFAULT_UNIT_RATIO = 4;
export const _DEFAULT_HORIZONTAL_PADDING =
    DEFAULT_HORIZONTAL_PADDING * NATIVE_BASE_TO_DEFAULT_UNIT_RATIO;

export default function HorizontalPadding({
    children,
    style,
    multiple,
}: {
    children: ReactNode;
    style?: ViewStyle;
    multiple?: number;
}) {
    const bgColor = useColorModeValue("white", "black");

    return (
        <Box px={(multiple || 1) * DEFAULT_HORIZONTAL_PADDING} bgColor={bgColor} style={style}>
            {children}
        </Box>
    );
}
