import { usePlayerStore } from "@/store/player.store";
import { milisToMinAndSec } from "@/utils/convert";
import { HStack, Text } from "native-base";
import React from "react";
import { ViewStyle } from "react-native";

export default function PlayerTimeline(props: { style?: ViewStyle }) {
    const soundControllerStatus = usePlayerStore(state => state.soundControllerStatus);

    return (
        <HStack justifyContent="space-between" style={props.style}>
            <Text fontSize="xs">
                {soundControllerStatus?.isLoaded
                    ? milisToMinAndSec(soundControllerStatus.positionMillis)
                    : "0:00"}
            </Text>
            <Text fontSize="xs">
                {soundControllerStatus?.isLoaded
                    ? soundControllerStatus.durationMillis
                        ? milisToMinAndSec(soundControllerStatus.durationMillis)
                        : "-"
                    : "0:00"}
            </Text>
        </HStack>
    );
}
