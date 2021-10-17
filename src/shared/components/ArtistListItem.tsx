import { usePlayerStore } from "@/store/player.store";
import { Artist, ImageMeta } from "@/types/graphql";
import { Box, HStack, Text, VStack } from "native-base";
import React, { useState } from "react";
import { Image, ViewStyle } from "react-native";
import HorizontalPadding, { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export interface IArtistsListItemProps {
    artist: Artist;
    index?: number;
    style?: ViewStyle;
    hideSubtitle?: boolean;
}

export default React.memo(function ArtistListItem({
    artist,
    style,
    hideSubtitle,
}: IArtistsListItemProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const playingArtistId = usePlayerStore(state => state.playingArtistId);

    return (
        <HStack alignItems="center" style={style} space={2}>
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
                    <Text fontSize="sm" color="primary.500" numberOfLines={2}>
                        {artist.name}
                    </Text>
                ) : (
                    <Text fontSize="sm" numberOfLines={2}>
                        {artist.name}
                    </Text>
                )}
                {!hideSubtitle && (
                    <Box pt={1} overflow="hidden">
                        <Text fontSize="xs" color="gray.200">
                            Artist
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
    );
});
