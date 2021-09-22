import { Genre, ImageMeta } from "@/types/graphql";
import { Box, Text, VStack } from "native-base";
import React from "react";
import { Image, ImageBackground, ImageStyle, ViewStyle } from "react-native";

export interface IGenresListItemProps {
    genre: Genre;
    style: ViewStyle & { width: number; height: number };
}

export default React.memo(function GenreListItem({ genre, style }: IGenresListItemProps) {
    return (
        <Box
            style={[
                {
                    backgroundColor: (genre.coverImage.meta as ImageMeta).dominantColor,
                    padding: 5,
                    overflow: "hidden",
                    position: "relative",
                    borderRadius: 5,
                },
                style,
            ]}
        >
            <Box maxWidth="75%">
                <Text numberOfLines={2} fontSize="lg" fontWeight="600">
                    {genre.name}
                </Text>
            </Box>
            <Image
                style={[
                    {
                        position: "absolute",
                        bottom: 0.05 * style.height,
                        right: -(0.1 * style.width),
                        width: 0.35 * style.width,
                        height: 0.75 * style.height,
                        justifyContent: "center",
                        alignItems: "center",
                        transform: [{ rotate: "25deg" }],
                    },
                ]}
                resizeMode="cover"
                source={{
                    uri: (genre.coverImage.meta as ImageMeta).source,
                }}
            ></Image>
        </Box>
    );
});
