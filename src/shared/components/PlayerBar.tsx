import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, IconButton, Slider, Text, VStack } from "native-base";
import React from "react";
import { Image } from "react-native";
import { usePlayerNativeControllerStore } from "../../store/player-native-controller.store";
import { useStore } from "../../store/store";
import { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export default function PlayerBar() {
  const player = useStore((store) => store.player);
  const actionPause = useStore((store) => store.actionPause);
  const actionResume = useStore((store) => store.actionResume);
  const actionUpdatePosition = useStore((store) => store.actionUpdatePosition);
  const soundController = usePlayerNativeControllerStore(
    (state) => state.soundController
  );

  const currentTrack =
    player.playingIndex === undefined
      ? null
      : player.tracksQueue[player.playingIndex];
  const onPause = () => {
    actionPause();
  };
  const onResume = () => {
    actionResume();
  };

  if (!currentTrack) return null;

  const progess =
    (player.playingPosition * 100) / (player.playingTotalDuration || 1);

  const onProgressChange = (progress: number) => {
    if (soundController) {
      console.log({ progress });
      soundController.setPositionAsync(
        (progress * player.playingTotalDuration) / 100
      );
    }
  };

  return (
    <>
      <Slider
        value={progess}
        size="sm"
        colorScheme="cyan"
        onChangeEnd={onProgressChange}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
      <HStack alignItems="center" space={DEFAULT_HORIZONTAL_PADDING}>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={{
            uri: `https://picsum.photos/${50}/${50}?random=${currentTrack.id}`,
          }}
        ></Image>
        <VStack justifyContent="space-between" flexGrow={1}>
          <Text bold>{currentTrack.name}</Text>
          <Text fontSize="sm" pt={1}>
            {+currentTrack.id * 10000}
          </Text>
        </VStack>
        {player.playingState === "paused" && (
          <IconButton
            variant="ghost"
            size="lg"
            onPress={onResume}
            icon={
              <Icon
                size="sm"
                as={<Ionicons name="play-circle-outline" />}
              ></Icon>
            }
          />
        )}
        {player.playingState === "playing" && (
          <IconButton
            variant="ghost"
            size="lg"
            onPress={onPause}
            icon={
              <Icon
                size="sm"
                as={<Ionicons name="pause-circle-outline" />}
              ></Icon>
            }
          />
        )}
      </HStack>
    </>
  );
}
