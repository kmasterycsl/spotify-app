import { usePlayerStore } from "@/store/player.store";
import { Playlist, ImageMeta } from "@/types/graphql";
import { gql } from "@apollo/client";
import { Box, HStack, Text, VStack } from "native-base";
import React, { useState } from "react";
import { Image, ViewStyle } from "react-native";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import ArtistNames from "./ArtistNames";
import HorizontalPadding, { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export interface IPlaylistsListItemProps {
    playlist: Playlist;
    index?: number;
    style?: ViewStyle;
}

export const PlaylistListItemFragment = gql`
    ${ImageMetaFragment}
    fragment PlaylistListItemFragment on Playlist {
        id
        name
    }
`;

export default React.memo(function PlaylistListItem({ playlist, style }: IPlaylistsListItemProps) {
    const [menuVisible, setMenuVisible] = useState(false);

    const onOpenMenu = () => {
        setMenuVisible(true);
    };

    return (
        <HorizontalPadding>
            <HStack alignItems="center" style={style} space={DEFAULT_HORIZONTAL_PADDING}>
                <VStack justifyContent="space-between" flexGrow={1} flexShrink={1}>
                    <Text numberOfLines={1} bold>
                        {playlist.name}
                    </Text>
                    <Box pt={1} overflow="hidden">
                        <Text fontSize="xs" color="gray.200">
                            Playlist
                        </Text>
                    </Box>
                </VStack>
                {/* <IconButton
                    variant="ghost"
                    onPress={onOpenMenu}
                    icon={<Icon size="xs" as={<Ionicons name="ellipsis-horizontal-outline" />} />}
                /> */}
            </HStack>
        </HorizontalPadding>
    );
});
