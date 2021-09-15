import { gql } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Icon, IconButton, Text, useTheme, VStack } from "native-base";
import React from "react";
import { useState } from "react";
import { Image, ViewStyle } from "react-native";
import { usePlayerStore } from "../../store/player.store";
import { ImageMeta, Album } from "../../types/graphql";
import HorizontalPadding, { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export interface IAlbumsListItemProps {
    album: Album;
    index?: number;
    style?: ViewStyle;
}

export const AlbumListItemFragment = gql`
    fragment AlbumListItemFragment on Album {
        id
        name
        coverImage {
            meta {
                ... on ImageMeta {
                    source
                    width
                    height
                }
            }
        }
    }
`;

export default React.memo(function AlbumListItem({ album, style }: IAlbumsListItemProps) {
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
                        <Text bold color="primary.500">
                            {album.name}
                        </Text>
                    ) : (
                        <Text bold>{album.name}</Text>
                    )}
                    {/* <Box pt={1} overflow="hidden">
                        <ArtistNames artists={album.artists} />
                    </Box> */}
                </VStack>
                <IconButton
                    variant="ghost"
                    onPress={onOpenMenu}
                    icon={<Icon size="xs" as={<Ionicons name="ellipsis-horizontal-outline" />} />}
                />
            </HStack>
        </HorizontalPadding>
    );
});
