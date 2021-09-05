import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, IconButton } from "native-base";
import React from "react";
import shallow from "zustand/shallow";
import { usePlayerStore } from "../../store/player.store";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
} from "./HorizontalPadding";

export default function PlayerControls() {
  const [
    shuffle,
    tracksQueue,
    playingIndex,
    soundControllerStatusIsLoaded,
    soundControllerStatusIsPlaying,
    actionToggleShuffleMode,
    actionResume,
    actionPause,
    actionNext,
    actionPrev,
  ] = usePlayerStore(
    (state) => [
      state.shuffle,
      state.tracksQueue,
      state.playingIndex,
      state.soundControllerStatus?.isLoaded,
      state.soundControllerStatus?.isLoaded &&
        state.soundControllerStatus?.isPlaying,
      state.actionToggleShuffleMode,
      state.actionResume,
      state.actionPause,
      state.actionNext,
      state.actionPrev,
    ],
    shallow
  );

  return (
    <HorizontalPadding
      style={{ flexGrow: 1 }}
      multiple={(1.5 + 4) / DEFAULT_HORIZONTAL_PADDING}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <IconButton
          onPress={actionToggleShuffleMode}
          icon={
            <Icon
              size="sm"
              color={shuffle ? "primary.500" : undefined}
              as={<Ionicons name="shuffle-outline" />}
            />
          }
        ></IconButton>
        <IconButton
          onPress={actionPrev}
          disabled={playingIndex === undefined ? true : playingIndex < 1}
          icon={<Icon size="sm" as={<Ionicons name="play-skip-back" />} />}
        ></IconButton>
        {soundControllerStatusIsLoaded ? (
          <>
            {soundControllerStatusIsPlaying && (
              <IconButton
                onPress={actionPause}
                icon={<Icon size="2xl" as={<Ionicons name="pause-circle" />} />}
              ></IconButton>
            )}
            {!soundControllerStatusIsPlaying && (
              <IconButton
                onPress={actionResume}
                icon={<Icon size="2xl" as={<Ionicons name="play-circle" />} />}
              ></IconButton>
            )}
          </>
        ) : (
          <IconButton
            disabled
            icon={<Icon size="2xl" as={<Ionicons name="play-circle" />} />}
          ></IconButton>
        )}

        <IconButton
          onPress={actionNext}
          disabled={
            playingIndex === undefined
              ? true
              : playingIndex >= tracksQueue.length - 1
          }
          icon={<Icon size="sm" as={<Ionicons name="play-skip-forward" />} />}
        ></IconButton>
        <IconButton
          icon={<Icon size="sm" as={<Ionicons name="repeat-outline" />} />}
        ></IconButton>
      </HStack>
    </HorizontalPadding>
  );
}
