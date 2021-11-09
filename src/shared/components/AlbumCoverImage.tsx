import { ImageMeta, Album } from "@/types/graphql";
import { adjustColor } from "@/utils/convert";
import { HStack, useTheme } from "native-base";
import React from "react";
import { Dimensions, ViewStyle } from "react-native";
import AlbumImage from "./AlbumImage";

const screenWidth = Dimensions.get("screen").width;

export default function AlbumCoverImage({ style, album }: { style?: ViewStyle; album: Album }) {
    const bgColor = adjustColor((album.coverImage?.meta as ImageMeta)?.dominantColor, -70);

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
            <AlbumImage
                album={album}
                style={{
                    width: screenWidth / 2,
                    height: screenWidth / 2,
                }}
            />
        </HStack>
    );
}
