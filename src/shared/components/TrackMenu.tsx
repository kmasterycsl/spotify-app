import { Ionicons } from "@expo/vector-icons";
import { Button, HStack, Icon, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { Modal, TouchableOpacity, useWindowDimensions } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { usePlayerStore } from "../../store/player.store";
import { Track } from "../../types/graphql";
import FullWidthSquareImage from "./FullWidthSquareImage";
import { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";
import SafeAreaView from "./SafeAreaView";
import VerticalPadding from "./VerticalPadding";

interface TrackMenuProps {
  track: Track;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function TrackMenu({
  track,
  visible,
  setVisible,
}: TrackMenuProps) {
  const actionAddToQueue = usePlayerStore((state) => state.actionAddToQueue);
  const actionRemoveFromQueue = usePlayerStore((state) => state.actionRemoveFromQueue);
  const trackInQueue = usePlayerStore((state) =>
    state.tracksQueue.find((t) => t.id === track.id)
  );
  const dimessions = useWindowDimensions();

  const onAddToQueue = () => {
    actionAddToQueue(track);
    setVisible(false);
  };

  const onRemoveFromQueue = () => {
    actionRemoveFromQueue(track);
    setVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      visible={visible}
      style={{ zIndex: -1 }}
    >
      <RootSiblingParent>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <VStack>
              {/* Image */}
              <HStack
                justifyContent="center"
                style={{ paddingTop: dimessions.height * 0.2 }}
              >
                <FullWidthSquareImage
                  padding={dimessions.width * 0.3}
                  url={`https://picsum.photos/id/${track.id}/${350}/${350}`}
                ></FullWidthSquareImage>
              </HStack>

              <VerticalPadding />

              {/* Title */}
              <VStack alignItems="center">
                <Text fontWeight="600" fontSize="lg">
                  {track.name}
                </Text>
                <Text color="gray.400" fontSize="sm">
                  {track.name}
                </Text>
              </VStack>

              <VerticalPadding multiple={3} />

              {/* Actions */}
              <VStack>
                {!trackInQueue ? (
                  <TouchableOpacity onPress={onAddToQueue}>
                    <HStack
                      padding={DEFAULT_HORIZONTAL_PADDING}
                      alignItems="center"
                    >
                      <Icon as={<Ionicons name="list-outline" />}></Icon>
                      <Text ml={DEFAULT_HORIZONTAL_PADDING}>Add to queue</Text>
                    </HStack>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={onRemoveFromQueue}>
                    <HStack
                      padding={DEFAULT_HORIZONTAL_PADDING}
                      alignItems="center"
                    >
                      <Icon as={<Ionicons name="list-outline" />}></Icon>
                      <Text ml={DEFAULT_HORIZONTAL_PADDING}>Remove from queue</Text>
                    </HStack>
                  </TouchableOpacity>
                )}
              </VStack>
            </VStack>
          </ScrollView>
          <HStack justifyContent="center">
            <Button variant="ghost" onPress={() => setVisible(false)}>
              <Text>Close</Text>
            </Button>
          </HStack>
        </SafeAreaView>
      </RootSiblingParent>
    </Modal>
  );
}
