import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, Text, useTheme, VStack } from "native-base";
import React from "react";
import { Image, ViewStyle } from "react-native";
import { Track } from "../../types/graphql";
import HorizontalPadding, {
  DEFAULT_HORIZONTAL_PADDING,
} from "./HorizontalPadding";

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
  // const {colors} = useTheme();

  return (
    <HorizontalPadding>
      <HStack
        alignItems="center"
        style={style}
        space={DEFAULT_HORIZONTAL_PADDING}
        // bgColor={colors.white}
      >
        <HStack
          minWidth={DEFAULT_HORIZONTAL_PADDING}
          justifyContent="flex-start"
        >
          <Text fontFamily="mono">
            {(index + 1).toString().padStart(2, "0")}
          </Text>
        </HStack>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={{
            uri: `https://picsum.photos/${50}/${50}?random=${track.id}`,
          }}
        ></Image>
        <VStack justifyContent="space-between" flexGrow={1}>
          <Text bold>{track.name}</Text>
          <Text fontSize="sm" pt={1}>
            {+track.id * 10000}
          </Text>
        </VStack>
        <Icon
          size="xs"
          as={<Ionicons name="ellipsis-horizontal-outline" />}
        ></Icon>
      </HStack>
    </HorizontalPadding>
  );
}
