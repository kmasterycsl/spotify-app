import { Ionicons } from "@expo/vector-icons";
import { HStack, IconButton, Text, VStack } from "native-base";
import React, { useContext } from "react";
import { Image } from "react-native";
import { actionPause, actionResume } from "../../store/actions";
import { AppStateContext } from "../../store/store";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
} from "./HorizontalPadding";

export default function PlayerBar() {
  const {
    state: { player },
    dispatch,
  } = useContext(AppStateContext);
  const currentTrack =
    player.playingIndex === undefined
      ? null
      : player.tracksQueue[player.playingIndex];
  const onPause = () => {
    actionPause(dispatch)();
  };
  const onResume = () => {
    actionResume(dispatch)();
  };

  if (!currentTrack) return null;

  return (
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
          icon={<Ionicons name="play-circle-outline" size={24} />}
        />
      )}
      {player.playingState === "playing" && (
        <IconButton
          variant="ghost"
          size="lg"
          onPress={onPause}
          icon={<Ionicons name="pause-circle-outline" size={24} />}
        />
      )}
    </HStack>
  );
}
