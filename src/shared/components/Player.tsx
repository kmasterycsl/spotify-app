import { HStack, Icon, IconButton, Text, VStack, Slider } from "native-base";
import React from "react";
import { Modal, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStore } from "../../store/store";
import FullWidthSquareImage from "./FullWidthSquareImage";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
  _DEFAULT_HORIZONTAL_PADDING,
} from "./HorizontalPadding";
import { Ionicons } from "@expo/vector-icons";
import { milisToMinAndSec } from "../../utils/convert";
import VerticalPadding from "./VerticalPadding";

export default function Player({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const insets = useSafeAreaInsets();
  const playingTrack = useStore((state) => state.playingTrack);
  const tracksQueue = useStore((state) => state.tracksQueue);
  const playingIndex = useStore((state) => state.playingIndex);
  const actionResume = useStore((state) => state.actionResume);
  const actionPause = useStore((state) => state.actionPause);
  const actionNext = useStore((state) => state.actionNext);
  const actionPrev = useStore((state) => state.actionPrev);
  const actionUpdatePosition = useStore((state) => state.actionUpdatePosition);
  const soundControllerStatus = useStore(
    (state) => state.soundControllerStatus
  );

  if (!playingTrack) return null;

  const progess =
    soundControllerStatus && soundControllerStatus.isLoaded
      ? soundControllerStatus.positionMillis
      : 0;

  const onProgressChange = (progress: number) => {
    actionUpdatePosition(progress);
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="fullScreen"
      visible={visible}
    >
      <VStack flexGrow={1}>
        {/* Top btns */}
        <VStack
          style={{ marginTop: insets.top, backgroundColor: "transparent" }}
          justifyContent="space-between"
        >
          <HorizontalPadding style={{ backgroundColor: "transparent" }}>
            <Icon
              onPress={() => setVisible(false)}
              size="md"
              as={<Ionicons name="chevron-down-outline" />}
            ></Icon>
          </HorizontalPadding>
        </VStack>

        {/* Image */}
        <HStack justifyContent="center">
          <FullWidthSquareImage
            padding={_DEFAULT_HORIZONTAL_PADDING}
            url={`https://picsum.photos/${350}/${350}?random=${
              playingTrack.id
            }`}
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
          <Slider
            value={progess}
            onChangeEnd={onProgressChange}
            minValue={0}
            maxValue={
              soundControllerStatus?.isLoaded
                ? soundControllerStatus?.durationMillis || 0
                : 0
            }
            bg="black"
            size="sm"
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb width="3" height="3" />
          </Slider>
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
        <HorizontalPadding>
          <HStack justifyContent="space-between" alignItems="center">
            <IconButton
              icon={<Icon size="sm" as={<Ionicons name="shuffle-outline" />} />}
            ></IconButton>
            <IconButton
              onPress={actionPrev}
              disabled={playingIndex === undefined ? true : playingIndex < 1}
              icon={<Icon size="sm" as={<Ionicons name="play-skip-back" />} />}
            ></IconButton>
            {soundControllerStatus?.isLoaded ? (
              <>
                {soundControllerStatus.isPlaying && (
                  <IconButton
                    onPress={actionPause}
                    icon={
                      <Icon size="2xl" as={<Ionicons name="pause-circle" />} />
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
                icon={<Icon size="2xl" as={<Ionicons name="pause-circle" />} />}
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
              icon={<Icon size="sm" as={<Ionicons name="repeat-outline" />} />}
            ></IconButton>
          </HStack>
        </HorizontalPadding>
      </VStack>
    </Modal>
  );
}
