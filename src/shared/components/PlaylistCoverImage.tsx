import { ImageMeta, Playlist } from "@/types/graphql";
import { adjustColor } from "@/utils/convert";
import { HStack, useTheme } from "native-base";
import React from "react";
import { Dimensions, ViewStyle } from "react-native";
import PlaylistImage from "./PlaylistImage";

const screenWidth = Dimensions.get("screen").width;

export default function PlaylistCoverImage({
    style,
    playlist,
}: {
    style?: ViewStyle;
    playlist: Playlist;
}) {
    const bgColor = adjustColor((playlist.coverImage?.meta as ImageMeta)?.dominantColor, -70);

    return (
        <HStack
            style={{
                width: screenWidth,
                height: screenWidth,
            }}
            bg={bgColor}
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
