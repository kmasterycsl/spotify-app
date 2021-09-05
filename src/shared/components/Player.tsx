import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Icon, IconButton, Text, VStack } from "native-base";
import React, { useState } from "react";
import { Modal } from "react-native";
import { usePlayerStore } from "../../store/player.store";
import PlayerTimeline from "../PlayerTimeline";
import FullWidthSquareImage from "./FullWidthSquareImage";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
  _DEFAULT_HORIZONTAL_PADDING,
} from "./HorizontalPadding";
import PlayerBarProgress from "./PlayerBarProgress";
import PlayerControls from "./PlayerControls";
import PlayerList from "./PlayerList";
import SafeAreaView from "./SafeAreaView";
import VerticalPadding from "./VerticalPadding";

export default React.memo(function Player({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const playingTrack = usePlayerStore((state) => state.playingTrack);

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

          <HorizontalPadding>
            {/* Song progress bar */}
            <PlayerBarProgress />
            {/* Song time */}
            <PlayerTimeline />
          </HorizontalPadding>

          <VerticalPadding />

          <PlayerControls />

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
});
