import HorizontalPadding, {
    _DEFAULT_HORIZONTAL_PADDING,
} from "@/shared/components/HorizontalPadding";
import SafeAreaView from "@/shared/components/SafeAreaView";
import TracksList from "@/shared/components/TracksList";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_PLAYLIST_BY_ID_QUERY } from "@/shared/queries/GET_PLAYLIST_BY_ID_QUERY";
import { usePlayerStore } from "@/store/player.store";
import { PaginationMeta, Query } from "@/types/graphql";
import { RootStackParamList } from "@/types/routes.types";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Icon, IconButton, Text, useTheme, VStack } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
    useAnimatedProps,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PlaylistDetailScreenRouteProp = RouteProp<RootStackParamList, "PlaylistDetail">;

const screenWidth = Dimensions.get("screen").width;

export default function PlaylistDetailScreen() {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    const { colors } = useTheme();
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

    useEffect(() => {
        if (waitingToAdd && fullData) {
            actionBulkAddToQueue(fullData.playlist.tracks.items);
            setWaitingToAdd(false);
        }
    }, [waitingToAdd, fullData]);

    const goBack = () => {
        nav.goBack();
    };

    const onPlay = () => {
        if (!data?.playlist) return;
        // add current loaded
        actionPlayPlaylist(data.playlist.id, data.playlist.tracks.items);
        // then fetch all and add later
        setWaitingToAdd(true);
        getFullData();
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
            setPaginationMeta(data.playlist.tracks.pageInfo);
        });
        fetched.finally(() => {
            setLoading(false);
        });
        return fetched;
    };

    const ListHeaderComponent = useMemo(
        () =>
            data?.playlist ? (
                <VStack>
                    <HorizontalPadding style={{ backgroundColor: "transparent" }}>
                        <Text fontSize="3xl" color="white">
                            {data.playlist.name}
                        </Text>
                    </HorizontalPadding>
                    <VerticalPadding multiple={1} style={{ backgroundColor: "transparent" }} />
                    <HorizontalPadding>
                        <HStack w="100%" justifyContent="space-between">
                            {/* <ArtistStats artist={data.artist} /> */}
                            {isPlaying && playingPlaylistId === data.playlist.id ? (
                                <IconButton
                                    size="sm"
                                    variant="ghost"
                                    onPress={actionPause}
                                    icon={
                                        <Icon
                                            color="gray.400"
                                            as={<Ionicons name="pause-circle-outline" />}
                                        ></Icon>
                                    }
                                />
                            ) : (
                                <IconButton
                                    size="sm"
                                    variant="ghost"
                                    onPress={onPlay}
                                    icon={
                                        <Icon
                                            color="gray.400"
                                            as={<Ionicons name="play-circle-outline" />}
                                        ></Icon>
                                    }
                                />
                            )}
                        </HStack>
                    </HorizontalPadding>
                    <VerticalPadding />
                </VStack>
            ) : null,
        [data?.playlist, isPlaying, playingPlaylistId]
    );

    return data?.playlist ? (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            {/* Hidden header */}
            <Animated.View style={[styles.hiddenHeaderContainer, hiddenHeaderStyle]}>
                <HStack paddingTop={insets.top} style={styles.hiddenHeader} bg={"gray.500"}>
                    <Text>{data.playlist.name}</Text>
                </HStack>
            </Animated.View>

            {/* Hidden back icon */}
            <Box style={styles.backIconContainer}>
                <Animated.View style={[styles.backIconInner, { top: insets.top }]}>
                    <Animated.View style={[styles.backIcon, backIconStyle]}>
                        <Icon
                            onPress={goBack}
                            size={5}
                            color="gray.400"
                            as={<Ionicons name="chevron-back-outline" />}
                        ></Icon>
                    </Animated.View>
                </Animated.View>
            </Box>

            {/* Cover image */}
            <Animated.View style={[{ position: "absolute", zIndex: 0 }, coverImgStyle]}>
                <HStack
                    style={{
                        width: screenWidth,
                        height: screenWidth,
                    }}
                    bg={"gray.500"}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Animated.View
                        style={[
                            {
                                width: screenWidth / 2,
                                height: screenWidth / 2,
                                backgroundColor: colors.gray["700"],
                                justifyContent: "center",
                                alignItems: "center",
                            },
                            coverImgInnerStyle,
                        ]}
                    >
                        <Icon
                            color="gray.200"
                            size={50}
                            as={<Ionicons name={"musical-notes-outline"} />}
                        ></Icon>
                    </Animated.View>
                </HStack>
            </Animated.View>

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
        paddingBottom: _DEFAULT_HORIZONTAL_PADDING,
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
    tracksListContainer: {
        position: "absolute",
        paddingTop: screenWidth - 40,
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
});