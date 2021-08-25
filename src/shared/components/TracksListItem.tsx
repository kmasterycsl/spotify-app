import { Box, HStack, VStack } from "native-base";
import React from "react";
import { Image, ViewStyle } from "react-native";
import { Track } from "../../types/graphql";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
} from "./HorizontalPadding";
import { Text } from "native-base";
import VerticalPadding from "./VerticalPadding";

export interface ITracksListItemProps {
  track: Track;
  index: number;
  style?: ViewStyle;
}

export default function TracksListItem({
  track,
  index,
  style,
}: ITracksListItemProps) {
  return (
    <HorizontalPadding>
      <HStack alignItems="center" style={style} space={3}>
        <HStack width={DEFAULT_HORIZONTAL_PADDING} justifyContent="flex-start">
          <Text>{index + 1}</Text>
        </HStack>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={{
            uri: `https://picsum.photos/${50}/${50}?random=${Math.random()}`,
          }}
        ></Image>
        <VStack justifyContent="space-between">
          <Text bold>{track.name}</Text>
          <Text fontSize="sm" pt={1}>
            {Math.floor(Math.random() * 100000)}
          </Text>
        </VStack>
      </HStack>
    </HorizontalPadding>
  );
}
