import { Button, HStack, Text, VStack } from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import HorizontalPadding from "../../shared/components/HorizontalPadding";
import { TouchableOpacity } from "react-native";

export interface IArtistStatsProps {}

export default function ArtistStats({}: IArtistStatsProps) {
  return (
    <HorizontalPadding>
      <HStack justifyContent="space-between">
        <VStack space={1}>
          <Text fontSize="sm">
            {Math.floor(Math.random() * 10000)} monthly listeners
          </Text>
          <Button size="xs" alignSelf="flex-start">
            Follow
          </Button>
        </VStack>
        <TouchableOpacity>
          <Ionicons name="play-circle-outline" size={48} />
        </TouchableOpacity>
      </HStack>
    </HorizontalPadding>
  );
}
