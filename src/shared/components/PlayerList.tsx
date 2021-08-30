import { HStack, Icon, IconButton, Text, VStack } from "native-base";
import React from "react";
import { Modal, Image } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useStore } from "../../store/store";
import FullWidthSquareImage from "./FullWidthSquareImage";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
  _DEFAULT_HORIZONTAL_PADDING,
} from "./HorizontalPadding";
import { Ionicons } from "@expo/vector-icons";
import { milisToMinAndSec } from "../../utils/convert";
import VerticalPadding from "./VerticalPadding";
import TracksListItem from "./TracksListItem";

export default function PlayerList({
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
      animationType="fade"
      presentationStyle="fullScreen"
      visible={visible}
    >
      <SafeAreaView
        style={{ flexGrow: 1, backgroundColor: "black" }}
        mode="padding"
      >
        <VStack flexGrow={1} alignItems="flex-start">
          {/* Top btns */}

          <IconButton
            onPress={() => setVisible(false)}
            icon={<Icon as={<Ionicons name="close-outline" />}></Icon>}
          />

          <VerticalPadding />

          <VStack alignSelf="stretch">
            {tracksQueue.map((track, index) => (
              <TracksListItem key={track.id} track={track} index={index} />
            ))}
          </VStack>
        </VStack>
      </SafeAreaView>
    </Modal>
  );
}
