import React from "react";
import { usePlayerStore } from "../store/player.store";
import { milisToMinAndSec } from "../utils/convert";
import { HStack, Text } from "native-base";

export default function PlayerTimeline() {
  const soundControllerStatus = usePlayerStore(
    (state) => state.soundControllerStatus
  );

  return (
    <HStack justifyContent="space-between">
      <Text fontSize="xs">
        {soundControllerStatus?.isLoaded
          ? milisToMinAndSec(soundControllerStatus.positionMillis)
          : "-"}
      </Text>
      <Text fontSize="xs">
        {soundControllerStatus?.isLoaded
          ? soundControllerStatus.durationMillis
            ? milisToMinAndSec(soundControllerStatus.durationMillis)
            : "-"
          : "-"}
      </Text>
    </HStack>
  );
}
