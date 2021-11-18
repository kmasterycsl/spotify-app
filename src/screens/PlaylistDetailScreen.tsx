import FloatingPlayBtn, { PLAY_BTN_HEIGHT } from "@/shared/components/FloatingPlayBtn";
import HiddenBackIcon from "@/shared/components/HiddenBackIcon";
import HiddenHeader, { HEADER_HEIGHT } from "@/shared/components/HiddenHeader";
import HorizontalPadding, {
    _DEFAULT_HORIZONTAL_PADDING,
} from "@/shared/components/HorizontalPadding";
import PlaylistCoverImage from "@/shared/components/PlaylistCoverImage";
import SafeAreaView from "@/shared/components/SafeAreaView";
import TracksList from "@/shared/components/TracksList";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_PLAYLIST_BY_ID_QUERY } from "@/shared/queries/GET_PLAYLIST_BY_ID_QUERY";
import { usePlayerStore } from "@/store/player.store";
import { ImageMeta, PaginationMeta, Query } from "@/types/graphql";
import { RootStackParamList } from "@/types/routes.types";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { HStack, Icon, IconButton, Text, VStack } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedProps,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PlaylistDetailScreenRouteProp = RouteProp<RootStackParamList, "PlaylistDetail">;

const screenWidth = Dimensions.get("screen").width;
const ARTIST_NAME_HEIGHT = 35;

export default function PlaylistDetailScreen() {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    const { params } = useRoute<PlaylistDetailScreenRouteProp>();
    const [paginationMeta, setPaginationMeta] = useState<
        Pick<PaginationMeta, "currentPage" | "totalPages">
    >({
        currentPage: 1,
        totalPages: Infinity,
    });
    const [loading, setLoading] = useState(false);
    const { data, refetch, fetchMore } = useQuery<Query>(GET_PLAYLIST_BY_ID_QUERY, {
        variables: {
            id: params.playlistId,
            page: 1,
        },
    });
    const [getFullData, { data: fullData }] = useLazyQuery<Query>(GET_PLAYLIST_BY_ID_QUERY, {
        variables: {
            id: params.playlistId,
            page: 1,
            limit: 100000,
        },
        fetchPolicy: "no-cache",
    });
    const [waitingToAdd, setWaitingToAdd] = useState(false);
    const actionBulkAddToQueue = usePlayerStore(store => store.actionBulkAddToQueue);
    const actionPlayPlaylist = usePlayerStore(store => store.actionPlayPlaylist);
    const actionPause = usePlayerStore(store => store.actionPause);
    const isPlaying = usePlayerStore(
        state => state.soundControllerStatus?.isLoaded && state.soundControllerStatus.isPlaying
    );
    const playingPlaylistId = usePlayerStore(store => store.playingPlaylistId);

    useEffect(() => {
        refetch();
    }, [params.playlistId]);

    const scrollOffsetY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollOffsetY.value = event.contentOffset.y;
    });

    const coverImgStyle = useAnimatedStyle(() => ({
        opacity: 1 - scrollOffsetY.value / screenWidth,
    }));

    const titleStyle = useAnimatedStyle(() => ({
        top: screenWidth - ARTIST_NAME_HEIGHT - _DEFAULT_HORIZONTAL_PADDING - scrollOffsetY.value,
        opacity: 1 - (scrollOffsetY.value * 2) / screenWidth,
    }));

    const coverImgInnerStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: 1 - scrollOffsetY.value / (screenWidth * 1.5),
            },
        ],
    }));

    const hiddenHeaderStyle = useAnimatedStyle(() => ({
        opacity: (scrollOffsetY.value * 1.4) / screenWidth,
    }));

    const backIconStyle = useAnimatedProps(() => ({
        backgroundColor: scrollOffsetY.value / screenWidth > 0.5 ? "transparent" : "gray",
    }));

    const playBtnWrapperStyle = useAnimatedStyle(() => {
        return {
            top: Math.max(
                screenWidth + _DEFAULT_HORIZONTAL_PADDING - scrollOffsetY.value,
                insets.top + HEADER_HEIGHT - PLAY_BTN_HEIGHT / 2
            ),
        };
    });

    useEffect(() => {
        if (waitingToAdd && fullData) {
            if (fullData.playlist) {
                actionBulkAddToQueue(fullData.playlist.tracks.items);
            }
            setWaitingToAdd(false);
        }
    }, [waitingToAdd, fullData]);

    const onPlay = () => {
        if (!data?.playlist) return;
        // add current loaded
        actionPlayPlaylist(data.playlist.id, data.playlist.tracks.items);
        // then fetch all and add later
        setWaitingToAdd(true);
        getFullData();
    };

    const onOpenMenu = () => {
        nav.navigate("PlaylistMenu", { playlistId: params.playlistId });
    };

    const onLoadMore = () => {
        if (loading) return;
        if (paginationMeta.currentPage >= paginationMeta.totalPages) return;
        setLoading(true);
        const fetched = fetchMore({
            variables: {
                page: paginationMeta.currentPage + 1,
            },
        });
        fetched.then(({ data }) => {
            if (data.playlist) {
                setPaginationMeta(data.playlist.tracks.pageInfo);
            }
        });
        fetched.finally(() => {
            setLoading(false);
        });
        return fetched;
    };

    const ListHeaderComponent = useMemo(
        () =>
            data?.playlist ? (
                <VStack style={{ paddingVertical: _DEFAULT_HORIZONTAL_PADDING }}>
                    {data.playlist.tracks.items.length > 0 ? (
                        <HorizontalPadding>
                            <HStack w="100%" justifyContent="space-between">
                                {/* Menu btn */}
                                <IconButton
                                    variant="ghost"
                                    onPress={onOpenMenu}
                                    icon={
                                        <Icon
                                            name="ellipsis-horizontal-outline"
                                            size="xs"
                                            color="white"
                                            as={Ionicons}
                                        />
                                    }
                                />
                            </HStack>
                        </HorizontalPadding>
                    ) : null}
                </VStack>
            ) : null,
        [data?.playlist, isPlaying, playingPlaylistId]
    );

    return data?.playlist ? (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            {/* Hidden header */}
            <HiddenHeader
                title={data.playlist.name}
                style={[
                    hiddenHeaderStyle,
                    {
                        backgroundColor: (data?.playlist?.coverImage?.meta as ImageMeta)
                            ?.dominantColor,
                    },
                ]}
            />

            {/* Hidden back icon */}
            <HiddenBackIcon style={backIconStyle} />

            {/* Cover image */}
            <Animated.View style={[{ position: "absolute", zIndex: 0 }, coverImgStyle]}>
                <PlaylistCoverImage playlist={data.playlist} style={coverImgInnerStyle} />
            </Animated.View>

            {/* Playlist name */}
            <Animated.View style={[styles.trackTitle, titleStyle]}>
                <HorizontalPadding
                    style={{
                        height: ARTIST_NAME_HEIGHT,
                        justifyContent: "center",
                    }}
                >
                    <Text fontSize="3xl" fontWeight="500" color="white" numberOfLines={1}>
                        {data.playlist.name}
                    </Text>
                </HorizontalPadding>
            </Animated.View>

            {/* Play btn */}
            {data.playlist.tracks.items.length > 0 && (
                <FloatingPlayBtn
                    isPlaying={!!isPlaying && playingPlaylistId === data.playlist.id}
                    onPause={actionPause}
                    onPlay={onPlay}
                    style={playBtnWrapperStyle}
                />
            )}

            {/* Tracks list */}
            <TracksList
                styles={{
                    listContainer: styles.tracksListContainer,
                    footer: styles.tracksListFooter,
                }}
                onScroll={scrollHandler}
                headerComponent={ListHeaderComponent}
                isFinished={paginationMeta.currentPage >= paginationMeta.totalPages}
                isLoading={loading}
                onLoadMore={onLoadMore}
                tracks={data.playlist.tracks.items}
            />
        </SafeAreaView>
    ) : null;
}

const styles = StyleSheet.create({
    container: { flex: 1, position: "relative" },
    hiddenHeaderContainer: {
        position: "absolute",
        width: "100%",
        opacity: 0,
        zIndex: 3,
    },
    hiddenHeader: {
        paddingLeft: _DEFAULT_HORIZONTAL_PADDING,
        paddingRight: _DEFAULT_HORIZONTAL_PADDING,
        paddingBottom: _DEFAULT_HORIZONTAL_PADDING / 2,
        justifyContent: "center",
        width: "100%",
        position: "absolute",
    },
    backIconContainer: { position: "absolute", zIndex: 3 },
    backIconInner: { position: "absolute", left: _DEFAULT_HORIZONTAL_PADDING },
    backIcon: {
        backgroundColor: "gray",
        borderRadius: 100,
    },
    trackTitle: {
        position: "absolute",
        left: 0,
        zIndex: 2,
        width: "100%",
    },
    tracksListContainer: {
        position: "absolute",
        paddingTop: screenWidth,
        top: 0,
        left: 0,
        height: "100%",
        zIndex: 2,
        width: "100%",
    },
    tracksListFooter: {
        paddingBottom: screenWidth + 80 - 40,
    },
    playerBarContainer: { position: "absolute", zIndex: 4, width: "100%" },
    playBtnWrapper: {
        position: "absolute",
        right: _DEFAULT_HORIZONTAL_PADDING,
        zIndex: 3,
    },
    playBtnWrapperInner: {
        width: PLAY_BTN_HEIGHT,
        height: PLAY_BTN_HEIGHT,
        justifyContent: "center",
        alignItems: "flex-end",
    },
});
