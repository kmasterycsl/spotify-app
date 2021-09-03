import { Ionicons } from "@expo/vector-icons";
import {
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
  useTheme,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { usePlayerStore } from "../../store/player.store";
import { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";
import { Slider } from "native-base";
import Player from "./Player";

export default function PlayerBar() {
  const { colors } = useTheme();
  const actionPause = usePlayerStore((store) => store.actionPause);
  const actionResume = usePlayerStore((store) => store.actionResume);
  const actionUpdatePosition = usePlayerStore((store) => store.actionUpdatePosition);
  const playingTrack = usePlayerStore((state) => state.playingTrack);
  const soundControllerStatus = usePlayerStore(
    (state) => state.soundControllerStatus
  );
  const [modalVisible, setModalVisible] = useState(false);

  const onPause = () => {
    actionPause();
  };
  const onResume = () => {
    actionResume();
  };

  if (!playingTrack) return null;

  const progess =
    soundControllerStatus && soundControllerStatus.isLoaded
      ? soundControllerStatus.positionMillis
      : 0;

  const onProgressChange = (progress: number) => {
    actionUpdatePosition(progress);
  };

  return (
    <>
      <Player visible={modalVisible} setVisible={setModalVisible} />

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <HStack alignItems="center" space={DEFAULT_HORIZONTAL_PADDING}>
          <Image
            style={{
              width: 50,
              height: 50,
            }}
            source={{
              uri: `https://picsum.photos/id/${playingTrack.id}/${50}/${50}`,
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
          {soundControllerStatus?.isLoaded &&
            soundControllerStatus.isPlaying && (
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
            <IconButton
              variant="ghost"
              size="lg"
              icon={<Spinner size="sm" />}
            />
          )}
        </HStack>
      </TouchableOpacity>
      <Slider
        value={progess}
        onChangeEnd={onProgressChange}
        minValue={0}
        maxValue={
          soundControllerStatus?.isLoaded
            ? soundControllerStatus?.durationMillis || 0
            : 0
        }
        size="xs"
      >
        <Slider.FilledTrack />
        <Slider.Thumb width="0" height="0" />
      </Slider>
    </>
  );
}
