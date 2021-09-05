import { Ionicons } from "@expo/vector-icons";
import { Icon, IconButton, VStack } from "native-base";
import React from "react";
import { Modal } from "react-native";
import { usePlayerStore } from "../../store/player.store";
import Empty from "./Empty";
import SafeAreaView from "./SafeAreaView";
import TracksListItem from "./TracksListItem";
import VerticalPadding from "./VerticalPadding";

export default function PlayerList({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const tracksQueue = usePlayerStore((state) => state.tracksQueue);

  return (
    <Modal
      animationType="fade"
      presentationStyle="fullScreen"
      visible={visible}
    >
      <SafeAreaView style={{ flexGrow: 1 }} mode="padding">
        <VStack flexGrow={1} alignItems="flex-start">
          {/* Top btns */}

          <IconButton
            onPress={() => setVisible(false)}
            icon={<Icon as={<Ionicons name="close-outline" />}></Icon>}
          />

          <VerticalPadding />

          <VStack alignSelf="stretch">
            {tracksQueue.length === 0 && <Empty text="Empty tracks queue" />}

            {tracksQueue.map((track, index) => (
              <TracksListItem key={track.id} track={track} index={index} />
            ))}
          </VStack>
        </VStack>
      </SafeAreaView>
    </Modal>
  );
}
