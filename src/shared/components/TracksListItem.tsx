import React from "react";
import { View, Text, Image } from "react-native";
import { Track } from "../../types/graphql";
import HStack from "./HStack";
import VStack from "./VStack";

export default function TracksListItem({ track }: { track: Track }) {
  return (
    <HStack>
      <Image
        style={{
          width: 50,
          height: 50,
        }}
        source={{
          uri: `https://picsum.photos/${50}/${50}?random=${Math.random()}&grayscale&blur=2`,
        }}
      ></Image>
      <VStack>
        <Text>{track.name}</Text>
        <Text>{Math.floor(Math.random() * 100000)}</Text>
      </VStack>
    </HStack>
  );
}
