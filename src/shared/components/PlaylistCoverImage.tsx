import { Playlist } from "@/types/graphql";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { HStack, Icon, useTheme } from "native-base";
import React from "react";
import { Dimensions, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import PlaylistImage from "./PlaylistImage";

const screenWidth = Dimensions.get("screen").width;

export default function PlaylistCoverImage({
    style,
    playlist,
}: {
    style?: ViewStyle;
    playlist: Playlist;
}) {
    const { colors } = useTheme();

    return (
        <HStack
            style={{
                width: screenWidth,
                height: screenWidth,
            }}
            bg={"gray.500"}
            justifyContent="center"
            alignItems="center"
        >
            <PlaylistImage
                playlist={playlist}
                style={{
                    width: screenWidth / 2,
                    height: screenWidth / 2,
                }}
            />
        </HStack>
    );
}
