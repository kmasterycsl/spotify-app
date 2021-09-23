import { ImageMeta, Playlist } from "@/types/graphql";
import { Box, Text } from "native-base";
import React from "react";
import { Image, TouchableOpacity, ViewStyle } from "react-native";

export interface IPlaylistsCardListItemProps {
    playlist: Playlist;
    onPress: () => void;
    index?: number;
    style: ViewStyle & { width: number };
}

export default React.memo(function PlaylistCardListItem({
    playlist,
    style,
    onPress,
}: IPlaylistsCardListItemProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                {
                    borderRadius: 5,
                    justifyContent: "center",
                    display: "flex",
                    padding: 10,
                    width: "50%",
                },
            ]}
        >
            <Image
                style={[
                    {
                        width: style.width,
                        height: style.width,
                    },
                ]}
                resizeMode="cover"
                source={{
                    uri: (playlist?.coverImage?.meta as ImageMeta)?.source,
                }}
            ></Image>
            <Box alignSelf="flex-start" mt={1}>
                <Text numberOfLines={2} fontWeight="600">
                    {playlist.name}
                </Text>
            </Box>
        </TouchableOpacity>
    );
});
