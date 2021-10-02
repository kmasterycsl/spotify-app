import { usePlayerStore } from "@/store/player.store";
import { milisToMinAndSec } from "@/utils/convert";
import { HStack, Text } from "native-base";
import React from "react";

export default function PlayerTimeline() {
    const soundControllerStatus = usePlayerStore(state => state.soundControllerStatus);

    return (
        <HStack justifyContent="space-between">
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
