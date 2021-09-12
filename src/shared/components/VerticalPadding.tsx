import { Box, useColorModeValue } from "native-base";
import React from "react";
import { ViewStyle } from "react-native";
import { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export default function VerticalPadding(
    { multiple, style }: { multiple?: number; style?: ViewStyle } = {
        multiple: 1,
    }
) {
    const bgColor = useColorModeValue("white", "black");

    return (
        <Box
            py={((multiple || 1) * DEFAULT_HORIZONTAL_PADDING) / 2}
            bgColor={bgColor}
            style={style}
        ></Box>
    );
}
