import React from "react";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View, ViewStyle } from "react-native";
import { HStack, Text, Icon } from "native-base";
import { _DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";
import { Ionicons } from "@expo/vector-icons";

export const PLAY_BTN_HEIGHT = 50;

export default function FloatingPlayBtn({
    style,
    isPlaying,
    onPlay,
    onPause,
}: {
    style?: ViewStyle | ViewStyle[];
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
}) {
    return (
        <Animated.View style={[styles.playBtnWrapper, style]}>
            <View style={[styles.playBtnWrapperInner]}>
                {isPlaying ? (
                    <Icon
                        onPress={onPause}
                        size={12}
                        name="pause-circle"
                        color="primary.400"
                        as={Ionicons}
                    ></Icon>
                ) : (
                    <Icon
                        onPress={onPlay}
                        size={12}
                        name="play-circle"
                        color="primary.400"
                        as={Ionicons}
                    ></Icon>
                )}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    playBtnWrapper: {
        position: "absolute",
        right: _DEFAULT_HORIZONTAL_PADDING,
        zIndex: 3,
    },
    playBtnWrapperInner: {
        width: PLAY_BTN_HEIGHT,
        height: PLAY_BTN_HEIGHT,
        justifyContent: "center",
        alignItems: "flex-end",
    },
});
