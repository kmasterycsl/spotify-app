import { usePlayerStore } from "@/store/player.store";
import { ImageMeta, Track } from "@/types/graphql";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Box, HStack, Icon, IconButton, Text, VStack } from "native-base";
import React, { useState } from "react";
import { Image, ViewStyle } from "react-native";
import AddTrackToPlaylistModal from "./AddTrackToPlaylistModal";
import ArtistNames from "./ArtistNames";
import HorizontalPadding, { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";
import TrackArtists from "./TrackArtists";
import TrackMenu from "./TrackMenu";

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
    const [menuVisible, setMenuVisible] = useState(false);
    const [viewArtistsVisible, setViewArtistsVisible] = useState(false);
    const [viewAddToPlaylistVisible, setViewAddToPlaylistVisible] = useState(false);
    const playingTrack = usePlayerStore(state => state.playingTrack);
    const nav = useNavigation();

    const onOpenMenu = () => {
        setMenuVisible(true);
    };

    const onViewArtists = () => {
        setMenuVisible(false);
        if (track.artists.length === 1) {
            nav.navigate({
                name: "ArtistDetail",
                key: `ArtistDetail${track.artists[0].id}`,
                params: {
                    artistId: track.artists[0].id,
                },
            });
        } else {
            setViewArtistsVisible(true);
        }
    };

    const onViewAddToPlaylist = () => {
        setMenuVisible(false);
        setViewAddToPlaylistVisible(true);
    };

    return (
        <>
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
            <TrackMenu
                track={track}
                visible={menuVisible}
                setVisible={setMenuVisible}
                onViewArtists={onViewArtists}
                onAddTrackToPlaylist={onViewAddToPlaylist}
            />
            <TrackArtists
                artists={track.artists}
                visible={viewArtistsVisible}
                setVisible={setViewArtistsVisible}
            />
            <AddTrackToPlaylistModal
                track={track}
                visible={viewAddToPlaylistVisible}
                setVisible={setViewAddToPlaylistVisible}
            />
        </>
    );
});
