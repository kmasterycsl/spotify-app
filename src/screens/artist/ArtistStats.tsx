import { Ionicons } from "@expo/vector-icons";
import { Button, HStack, Icon, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import HorizontalPadding from "../../shared/components/HorizontalPadding";
import VerticalPadding from "../../shared/components/VerticalPadding";

export interface IArtistStatsProps {
    onPressPlay: () => void;
}

export default function ArtistStats({ onPressPlay }: IArtistStatsProps) {
    return (
        <HorizontalPadding>
            <VerticalPadding>
                <HStack justifyContent="space-between">
                    <VStack space={2}>
                        <Text fontSize="sm">
                            {Math.floor(Math.random() * 10000)} monthly listeners
                        </Text>
                        <Button size="xs" alignSelf="flex-start">
                            Follow
                        </Button>
                    </VStack>
                    <TouchableOpacity onPress={onPressPlay}>
                        <Icon as={<Ionicons name="play-circle-outline" size={48} />}></Icon>
                    </TouchableOpacity>
                </HStack>
            </VerticalPadding>
        </HorizontalPadding>
    );
}
