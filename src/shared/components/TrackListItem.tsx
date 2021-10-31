import { usePlayerStore } from "@/store/player.store";
import { ImageMeta, Track } from "@/types/graphql";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Box, HStack, Icon, IconButton, Text, VStack } from "native-base";
import React from "react";
import { Image, ViewStyle } from "react-native";
import ArtistNames from "./ArtistNames";
import { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export interface ITracksListItemProps {
    track: Track;
    index?: number;
    style?: ViewStyle;
    hideMenu?: boolean;
    hideArtistName?: boolean;
    showType?: boolean;
}

export default React.memo(function TracksListItem({
    track,
    index,
    style,
    hideMenu,
    hideArtistName,
    showType,
}: ITracksListItemProps) {
    const playingTrack = usePlayerStore(state => state.playingTrack);
    const nav = useNavigation();

    const onOpenMenu = () => {
        console.log("track.id: ", track.id);
        nav.navigate("TrackMenu", { trackId: track.id });
    };

    return (
        <HStack alignItems="center" style={style} space={2}>
            {index !== undefined && (
                <HStack minWidth={DEFAULT_HORIZONTAL_PADDING} justifyContent="flex-start">
                    <Text fontFamily="mono">{(index + 1).toString().padStart(2, "0")}</Text>
                </HStack>
            )}
            <Image
                style={{
                    width: 50,
                    height: 50,
                }}
                source={{
                    uri: (track.album.coverImage.meta as ImageMeta).source,
                }}
            ></Image>
            <VStack justifyContent="space-between" flexGrow={1} flexShrink={1}>
                {playingTrack?.id === track.id ? (
                    <Text fontSize="sm" color="primary.500" numberOfLines={2}>
                        {track.name}
                    </Text>
                ) : (
                    <Text fontSize="sm" numberOfLines={2}>
                        {track.name}
                    </Text>
                )}
                {!hideArtistName && (
                    <Box pt={1} overflow="hidden">
                        <Text>
                            {showType && <Text fontSize="xs">Song · </Text>}
                            <ArtistNames artists={track.artists} />
                        </Text>
                    </Box>
                )}
            </VStack>
            {!hideMenu && (
                <IconButton
                    variant="ghost"
                    onPress={onOpenMenu}
                    icon={
                        <Icon
                            size="xs"
                            as={Ionicons}
                            name="ellipsis-horizontal-outline"
                            color="gray.400"
                        />
                    }
                />
            )}
        </HStack>
    );
});
