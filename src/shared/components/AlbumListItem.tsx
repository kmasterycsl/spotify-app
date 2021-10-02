import { usePlayerStore } from "@/store/player.store";
import { Album, ImageMeta } from "@/types/graphql";
import { Box, HStack, Text, VStack } from "native-base";
import React, { useState } from "react";
import { Image, ViewStyle } from "react-native";
import ArtistNames from "./ArtistNames";
import HorizontalPadding, { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export interface IAlbumsListItemProps {
    album: Album;
    index?: number;
    style?: ViewStyle;
    hideSubtitle?: boolean;
}

export default React.memo(function AlbumListItem({
    album,
    style,
    hideSubtitle,
}: IAlbumsListItemProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const playingAlbumId = usePlayerStore(state => state.playingAlbumId);

    const onOpenMenu = () => {
        setMenuVisible(true);
    };

    return (
        <HorizontalPadding>
            <HStack alignItems="center" style={style} space={DEFAULT_HORIZONTAL_PADDING}>
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
                        <Text numberOfLines={1} bold color="primary.500">
                            {album.name}
                        </Text>
                    ) : (
                        <Text numberOfLines={1} bold>
                            {album.name}
                        </Text>
                    )}
                    {!hideSubtitle && (
                        <Box pt={1} overflow="hidden">
                            <Text fontSize="xs" color="gray.200">
                                Album · <ArtistNames artists={album.allArtists} />
                            </Text>
                        </Box>
                    )}
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
