import { Playlist } from "@/types/graphql";
import { Box, Text } from "native-base";
import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import PlaylistImage from "./PlaylistImage";

export interface IPlaylistsCardListItemProps {
    playlist: Playlist;
    onPress: () => void;
    index?: number;
    style: ViewStyle & { width: number };
}

function PlaylistCardListItem({ playlist, style, onPress }: IPlaylistsCardListItemProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                {
                    borderRadius: 5,
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                },
                style,
            ]}
        >
            <PlaylistImage
                playlist={playlist}
                style={{
                    width: style.width,
                    height: style.width,
                }}
            />
            <Box alignSelf="flex-start" mt={1}>
                <Text numberOfLines={1} fontWeight="600">
                    {playlist.name}
                </Text>
            </Box>
        </TouchableOpacity>
    );
}

export default React.memo(PlaylistCardListItem);
