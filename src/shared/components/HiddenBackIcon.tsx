import React from "react";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, ViewStyle } from "react-native";
import { HStack, Icon, Text } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { _DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

const HEADER_HEIGHT = 50;

export default function HiddenBackIcon({ style }: { style?: ViewStyle | ViewStyle[] }) {
    const nav = useNavigation();
    const insets = useSafeAreaInsets();

    const goBack = () => {
        nav.goBack();
    };

    return (
        <Animated.View style={[styles.backIconInner, { height: insets.top + HEADER_HEIGHT }]}>
            <Animated.View style={[{ marginTop: insets.top }, styles.backIcon, style]}>
                <Icon
                    onPress={goBack}
                    size={5}
                    color="gray.100"
                    name="chevron-thin-left"
                    as={Entypo}
                ></Icon>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    backIconInner: {
        position: "absolute",
        left: _DEFAULT_HORIZONTAL_PADDING,
        zIndex: 3,
        justifyContent: "center",
    },
    backIcon: {
        backgroundColor: "gray",
        borderRadius: 100,
        padding: 5,
    },
});
