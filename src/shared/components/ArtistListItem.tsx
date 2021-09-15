import { gql } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Icon, IconButton, Text, useTheme, VStack } from "native-base";
import React from "react";
import { useState } from "react";
import { Image, ViewStyle } from "react-native";
import { usePlayerStore } from "../../store/player.store";
import { ImageMeta, Artist } from "../../types/graphql";
import HorizontalPadding, { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export interface IArtistsListItemProps {
    artist: Artist;
    index?: number;
    style?: ViewStyle;
}

export const ArtistListItemFragment = gql`
    fragment ArtistListItemFragment on Artist {
        id
        name
        avatarImage {
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

export default React.memo(function ArtistListItem({ artist, style }: IArtistsListItemProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const playingArtistId = usePlayerStore(state => state.playingArtistId);

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
                        uri: (artist.avatarImage.meta as ImageMeta).source,
                    }}
                ></Image>
                <VStack justifyContent="space-between" flexGrow={1} flexShrink={1}>
                    {playingArtistId === artist.id ? (
                        <Text bold color="primary.500">
                            {artist.name}
                        </Text>
                    ) : (
                        <Text bold>{artist.name}</Text>
                    )}
                    {/* <Box pt={1} overflow="hidden">
                        <ArtistNames artists={artist.artists} />
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
