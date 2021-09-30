import { Box, useColorModeValue } from "native-base";
import React from "react";
import { ViewStyle } from "react-native";
import { _DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export default function VerticalPadding(
    {
        multiple,
        style,
        children,
    }: { multiple?: number; style?: ViewStyle; children?: React.ReactElement } = {
        multiple: 1,
    }
) {
    const bgColor = useColorModeValue("white", "black");

    return (
        <Box
            bgColor={bgColor}
            style={[
                {
                    paddingVertical: ((multiple || 1) * _DEFAULT_HORIZONTAL_PADDING) / 2,
                },
                style,
            ]}
        >
            {children}
        </Box>
    );
}
