import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, IconButton } from "native-base";
import React from "react";
import { usePlayerStore } from "../../store/player.store";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
} from "./HorizontalPadding";

export default function PlayerControls() {
  console.log("PlayerControls");
  const tracksQueue = usePlayerStore((state) => state.tracksQueue);
  const playingIndex = usePlayerStore((state) => state.playingIndex);
  const actionResume = usePlayerStore((state) => state.actionResume);
  const actionPause = usePlayerStore((state) => state.actionPause);
  const actionNext = usePlayerStore((state) => state.actionNext);
  const actionPrev = usePlayerStore((state) => state.actionPrev);
  const soundControllerStatusIsLoaded = usePlayerStore(
    (state) => state.soundControllerStatus?.isLoaded
  );
  const soundControllerStatusIsPlaying = usePlayerStore(
    (state) =>
      state.soundControllerStatus?.isLoaded &&
      state.soundControllerStatus?.isPlaying
  );

  return (
    <HorizontalPadding
      style={{ flexGrow: 1 }}
      multiple={(1.5 + 4) / DEFAULT_HORIZONTAL_PADDING}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <IconButton
          icon={<Icon size="sm" as={<Ionicons name="shuffle-outline" />} />}
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
