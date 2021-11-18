import { usePlayerStore } from "@/store/player.store";
import { Album, ImageMeta } from "@/types/graphql";
import { Box, HStack, Text, VStack } from "native-base";
import React from "react";
import { Image, ViewStyle } from "react-native";
import ArtistNames from "./ArtistNames";

export interface IAlbumsListItemProps {
    album: Album;
    index?: number;
    style?: ViewStyle;
    hideSubtitle?: boolean;
    showType?: boolean;
}

export default React.memo(function AlbumListItem({
    album,
    style,
    hideSubtitle,
    showType,
}: IAlbumsListItemProps) {
    const playingAlbumId = usePlayerStore(state => state.playingAlbumId);

    return (
        <HStack alignItems="center" style={style} space={2}>
            <Image
                style={{
                    width: 50,
                    height: 50,
                }}
                source={{
                    uri: (album.coverImage.meta as ImageMeta).source,
                }}
            ></Image>
            <VStack justifyContent="space-between" flexGrow={1} flexShrink={1}>
                {playingAlbumId === album.id ? (
                    <Text numberOfLines={2} fontSize="sm" color="primary.500">
                        {album.name}
                    </Text>
                ) : (
                    <Text numberOfLines={2} fontSize="sm">
                        {album.name}
                    </Text>
                )}
                {!hideSubtitle && (
                    <Box pt={1} overflow="hidden">
                        <Text fontSize="xs" color="gray.200">
                            {showType && <Text fontSize="xs">Album · </Text>}
                            <ArtistNames artists={album.allArtists} />
                        </Text>
                    </Box>
                )}
            </VStack>
        </HStack>
    );
});
