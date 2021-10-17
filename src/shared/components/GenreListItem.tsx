import { Genre, ImageMeta } from "@/types/graphql";
import { Box, Text } from "native-base";
import React from "react";
import { Image, ViewStyle } from "react-native";

export interface IGenresListItemProps {
    genre: Genre;
    style: ViewStyle;
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
                        bottom: "-10%",
                        right: "-15%",
                        width: "35%",
                        height: "75%",
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
