import React from "react";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, ViewStyle } from "react-native";
import { HStack, Text } from "native-base";

const HEADER_HEIGHT = 50;

export default function HiddenHeader({
    style,
    title,
}: {
    style?: ViewStyle | ViewStyle[];
    title: string;
}) {
    const insets = useSafeAreaInsets();
    return (
        <Animated.View
            style={[
                {
                    height: insets.top + HEADER_HEIGHT,
                },
                styles.hiddenHeaderContainer,
                style,
            ]}
        >
            <HStack style={[{ paddingTop: insets.top }, styles.hiddenHeader]}>
                <Text>{title}</Text>
            </HStack>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    hiddenHeaderContainer: {
        position: "absolute",
        width: "100%",
        opacity: 0,
        zIndex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    hiddenHeader: {
        justifyContent: "center",
    },
});
