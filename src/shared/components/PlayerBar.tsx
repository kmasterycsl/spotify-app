import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, IconButton, Spinner, Text, VStack } from "native-base";
import React from "react";
import { Image } from "react-native";
import { useStore } from "../../store/store";
import { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";
import Slider from "@react-native-community/slider";

export default function PlayerBar() {
  const actionPause = useStore((store) => store.actionPause);
  const actionResume = useStore((store) => store.actionResume);
  const actionUpdatePositionPercentage = useStore(
    (store) => store.actionUpdatePositionPercentage
  );
  const playingTrack = useStore((state) => state.playingTrack);
  const soundControllerStatus = useStore(
    (state) => state.soundControllerStatus
  );

  const onPause = () => {
    actionPause();
  };
  const onResume = () => {
    actionResume();
  };

  if (!playingTrack) return null;

  const progess =
    soundControllerStatus && soundControllerStatus.isLoaded
      ? soundControllerStatus.positionMillis /
        (soundControllerStatus.durationMillis || 1)
      : 0;

  const onProgressChange = (progress: number) => {
    actionUpdatePositionPercentage(progress);
  };

  return (
    <>
      <Slider value={progess} onSlidingComplete={onProgressChange} />
      <HStack alignItems="center" space={DEFAULT_HORIZONTAL_PADDING}>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={{
            uri: `https://picsum.photos/${50}/${50}?random=${playingTrack.id}`,
          }}
        ></Image>
        <VStack justifyContent="space-between" flexGrow={1}>
          <Text bold>{playingTrack.name}</Text>
          <Text fontSize="sm" pt={1}>
            {+playingTrack.id * 10000}
          </Text>
        </VStack>
        {soundControllerStatus?.isLoaded &&
          !soundControllerStatus.isPlaying && (
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
        {soundControllerStatus?.isLoaded && soundControllerStatus.isPlaying && (
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
        {!soundControllerStatus?.isLoaded && (
          <IconButton variant="ghost" size="lg" icon={<Spinner size="sm" />} />
        )}
      </HStack>
    </>
  );
}
