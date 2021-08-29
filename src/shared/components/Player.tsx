import { HStack, Icon, Text, VStack } from "native-base";
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
import Slider from "@react-native-community/slider";
import { milisToMinAndSec } from "../../utils/convert";

export default function Player({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const insets = useSafeAreaInsets();
  const playingTrack = useStore((state) => state.playingTrack);
  const actionResume = useStore((state) => state.actionResume);
  const actionPause = useStore((state) => state.actionPause);
  const soundControllerStatus = useStore(
    (state) => state.soundControllerStatus
  );

  if (!playingTrack) return null;

  const progess =
    soundControllerStatus && soundControllerStatus.isLoaded
      ? soundControllerStatus.positionMillis /
        (soundControllerStatus.durationMillis || 1)
      : 0;

  //   console.log({ progess });

  return (
    <Modal
      animationType="slide"
      presentationStyle="fullScreen"
      visible={visible}
    >
      <VStack>
        {/* Top btns */}
        <VStack
          style={{ marginTop: insets.top, backgroundColor: "transparent" }}
          flexGrow={1}
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

        {/* Song progress bar */}
        <Slider value={progess} />
        <HStack justifyContent="space-between">
          {soundControllerStatus?.isLoaded && (
            <>
              <Text fontSize="xs">
                {milisToMinAndSec(soundControllerStatus.positionMillis)}
              </Text>
              <Text fontSize="xs">
                {soundControllerStatus.durationMillis
                  ? milisToMinAndSec(soundControllerStatus.durationMillis)
                  : "-"}
              </Text>
            </>
          )}
        </HStack>

        <HStack justifyContent="space-between">
          {soundControllerStatus?.isLoaded && (
            <>
              <Icon size="md" as={<Ionicons name="shuffle-outline" />}></Icon>
              <Icon
                size="md"
                as={<Ionicons name="play-skip-back-outline" />}
              ></Icon>
              {soundControllerStatus.isPlaying && (
                <Icon
                  size="md"
                  onPress={actionPause}
                  as={<Ionicons name="pause-outline" />}
                ></Icon>
              )}
              {!soundControllerStatus.isPlaying && (
                <Icon
                  size="md"
                  onPress={actionResume}
                  as={<Ionicons name="play-outline" />}
                ></Icon>
              )}
              <Icon
                size="md"
                as={<Ionicons name="play-skip-forward-outline" />}
              ></Icon>
              <Icon size="md" as={<Ionicons name="repeat-outline" />}></Icon>
            </>
          )}
        </HStack>
      </VStack>
    </Modal>
  );
}
