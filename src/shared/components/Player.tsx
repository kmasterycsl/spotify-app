import { Ionicons } from "@expo/vector-icons";
import {
  Box, HStack,
  Icon,
  IconButton,
  Text,
  VStack
} from "native-base";
import React, { useState } from "react";
import { Modal } from "react-native";
import { usePlayerStore } from "../../store/player.store";
import { milisToMinAndSec } from "../../utils/convert";
import FullWidthSquareImage from "./FullWidthSquareImage";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
  _DEFAULT_HORIZONTAL_PADDING
} from "./HorizontalPadding";
import PlayerBarProgress from "./PlayerBarProgress";
import PlayerList from "./PlayerList";
import SafeAreaView from "./SafeAreaView";
import VerticalPadding from "./VerticalPadding";

export default function Player({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const playingTrack = usePlayerStore((state) => state.playingTrack);
  const tracksQueue = usePlayerStore((state) => state.tracksQueue);
  const playingIndex = usePlayerStore((state) => state.playingIndex);
  const actionResume = usePlayerStore((state) => state.actionResume);
  const actionPause = usePlayerStore((state) => state.actionPause);
  const actionNext = usePlayerStore((state) => state.actionNext);
  const actionPrev = usePlayerStore((state) => state.actionPrev);
  const soundControllerStatus = usePlayerStore(
    (state) => state.soundControllerStatus
  );
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  if (!playingTrack) return null;

  const onShowPlaylist = () => {
    setIsPlaylistOpen(true);
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="fullScreen"
      visible={visible}
    >
      <SafeAreaView style={{ flexGrow: 1 }} mode="padding">
        <VStack flexGrow={1}>
          {/* Top btns */}
          <Box
            style={{ backgroundColor: "transparent", alignSelf: "flex-start" }}
          >
            <IconButton
              onPress={() => setVisible(false)}
              icon={<Icon as={<Ionicons name="chevron-down-outline" />}></Icon>}
            />
          </Box>

          <VerticalPadding />

          {/* Image */}
          <HStack justifyContent="center">
            <FullWidthSquareImage
              padding={_DEFAULT_HORIZONTAL_PADDING}
              url={`https://picsum.photos/id/${playingTrack.id}/${350}/${350}`}
            ></FullWidthSquareImage>
          </HStack>

          <VerticalPadding multiple={2} />

          {/* Song name */}
          <HStack>
            <HorizontalPadding>
              <VStack>
                <Text fontSize="2xl" fontWeight="600">
                  {playingTrack.name}
                </Text>
                <Text>{playingTrack.name}</Text>
              </VStack>
            </HorizontalPadding>
          </HStack>

          <VerticalPadding />

          {/* Song progress bar */}
          <HorizontalPadding>
            <PlayerBarProgress />
            {/* Song time */}
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
          </HorizontalPadding>

          <VerticalPadding />

          {/* Song controls */}
          <HorizontalPadding
            style={{ flexGrow: 1 }}
            multiple={(1.5 + 4) / DEFAULT_HORIZONTAL_PADDING}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <IconButton
                icon={
                  <Icon size="sm" as={<Ionicons name="shuffle-outline" />} />
                }
              ></IconButton>
              <IconButton
                onPress={actionPrev}
                disabled={playingIndex === undefined ? true : playingIndex < 1}
                icon={
                  <Icon size="sm" as={<Ionicons name="play-skip-back" />} />
                }
              ></IconButton>
              {soundControllerStatus?.isLoaded ? (
                <>
                  {soundControllerStatus.isPlaying && (
                    <IconButton
                      onPress={actionPause}
                      icon={
                        <Icon
                          size="2xl"
                          as={<Ionicons name="pause-circle" />}
                        />
                      }
                    ></IconButton>
                  )}
                  {!soundControllerStatus.isPlaying && (
                    <IconButton
                      onPress={actionResume}
                      icon={
                        <Icon size="2xl" as={<Ionicons name="play-circle" />} />
                      }
                    ></IconButton>
                  )}
                </>
              ) : (
                <IconButton
                  disabled
                  icon={
                    <Icon size="2xl" as={<Ionicons name="play-circle" />} />
                  }
                ></IconButton>
              )}

              <IconButton
                onPress={actionNext}
                disabled={
                  playingIndex === undefined
                    ? true
                    : playingIndex >= tracksQueue.length - 1
                }
                icon={
                  <Icon size="sm" as={<Ionicons name="play-skip-forward" />} />
                }
              ></IconButton>
              <IconButton
                icon={
                  <Icon size="sm" as={<Ionicons name="repeat-outline" />} />
                }
              ></IconButton>
            </HStack>
          </HorizontalPadding>

          {/* Bottom bar */}
          <HorizontalPadding multiple={(4 + 1.5) / DEFAULT_HORIZONTAL_PADDING}>
            <HStack justifyContent="flex-end">
              <IconButton
                onPress={onShowPlaylist}
                icon={<Icon size="sm" as={<Ionicons name="list-outline" />} />}
              ></IconButton>
            </HStack>
          </HorizontalPadding>
        </VStack>
      </SafeAreaView>

      <PlayerList visible={isPlaylistOpen} setVisible={setIsPlaylistOpen} />
    </Modal>
  );
}
