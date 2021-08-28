import { Button, HStack, Text, VStack } from "native-base";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import HorizontalPadding from "../../shared/components/HorizontalPadding";
import { TouchableOpacity } from "react-native";
import { AppStateContext } from "../../store/store";
import { ActionTypes } from "../../store/actions";

export interface IArtistStatsProps {
  onPressPlay: () => void;
}

export default function ArtistStats({ onPressPlay }: IArtistStatsProps) {
  const { dispatch } = useContext(AppStateContext);

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
        <TouchableOpacity onPress={onPressPlay}>
          <Ionicons name="play-circle-outline" size={48} />
        </TouchableOpacity>
      </HStack>
    </HorizontalPadding>
  );
}
