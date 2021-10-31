import FullWidthSquareImage from "@/shared/components/FullWidthSquareImage";
import HorizontalPadding, {
    _DEFAULT_HORIZONTAL_PADDING,
} from "@/shared/components/HorizontalPadding";
import SafeAreaView from "@/shared/components/SafeAreaView";
import TracksList from "@/shared/components/TracksList";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_ARTIST_BY_ID_QUERY } from "@/shared/queries/GET_ARTIST_BY_ID_QUERY";
import { usePlayerStore } from "@/store/player.store";
import { ImageMeta, PaginationMeta, Query } from "@/types/graphql";
import { RootStackParamList } from "@/types/routes.types";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Icon, Text, VStack } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
    useAnimatedProps,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArtistStats from "./artist/ArtistStats";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "ArtistDetail">;

const screenWidth = Dimensions.get("screen").width;

export default function ArtistDetailScreen() {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    const { params } = useRoute<ProfileScreenRouteProp>();
    const [paginationMeta, setPaginationMeta] = useState<
        Pick<PaginationMeta, "currentPage" | "totalPages">
    >({
        currentPage: 1,
        totalPages: Infinity,
    });
    const [loading, setLoading] = useState(false);
    const { data, refetch, fetchMore } = useQuery<Query>(GET_ARTIST_BY_ID_QUERY, {
        variables: {
            id: params.artistId,
            page: 1,
        },
    });

    const [getFullData, { data: fullData }] = useLazyQuery<Query>(GET_ARTIST_BY_ID_QUERY, {
        variables: {
            id: params.artistId,
            page: 1,
            limit: 100000,
        },
        fetchPolicy: "no-cache",
    });
    const [waitingToAdd, setWaitingToAdd] = useState(false);
    const actionBulkAddToQueue = usePlayerStore(store => store.actionBulkAddToQueue);
    const actionPlayArtist = usePlayerStore(store => store.actionPlayArtist);
    const actionPause = usePlayerStore(store => store.actionPause);
    const isPlaying = usePlayerStore(
        state => state.soundControllerStatus?.isLoaded && state.soundControllerStatus.isPlaying
    );
    const playingArtistId = usePlayerStore(store => store.playingArtistId);

    useEffect(() => {
        refetch();
    }, [params.artistId]);

    const scrollOffsetY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollOffsetY.value = event.contentOffset.y;
    });

    const coverImgStyle = useAnimatedStyle(() => ({
        opacity: 1 - scrollOffsetY.value / screenWidth,
    }));

    const hiddenHeaderStyle = useAnimatedStyle(() => ({
        opacity: (scrollOffsetY.value * 1.4) / screenWidth,
    }));

    const backIconStyle = useAnimatedProps(() => ({
        backgroundColor: scrollOffsetY.value / screenWidth > 0.5 ? "transparent" : "gray",
    }));

    const titleStyle = useAnimatedStyle(() => ({
        top: screenWidth - 95 - scrollOffsetY.value,
        opacity: 1 - (scrollOffsetY.value * 2) / screenWidth,
    }));

    const playBtnWrapperStyle = useAnimatedStyle(() => {
        return {
            top: Math.max(screenWidth - 30 - scrollOffsetY.value, 52),
        };
    });

    useEffect(() => {
        if (waitingToAdd && fullData) {
            actionBulkAddToQueue(fullData.artist.tracks.items);
            setWaitingToAdd(false);
        }
    }, [waitingToAdd, fullData]);

    const goBack = () => {
        nav.goBack();
    };

    const onPlay = () => {
        if (!data?.artist) return;
        // add current loaded
        actionPlayArtist(data.artist.id, data.artist.tracks.items);
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
            setPaginationMeta(data.artist.tracks.pageInfo);
        });
        fetched.finally(() => {
            setLoading(false);
        });
        return fetched;
    };

    const ListHeaderComponent = useMemo(
        () =>
            data?.artist ? (
                <VStack>
                    <VerticalPadding multiple={0.5} style={{ backgroundColor: "transparent" }} />
                    <HorizontalPadding>
                        <HStack w="100%" justifyContent="space-between" alignItems="center">
                            <ArtistStats artist={data.artist} />
                        </HStack>
                    </HorizontalPadding>
                    <HorizontalPadding>
                        <Text fontSize="lg" fontWeight="500">
                            Popular
                        </Text>
                    </HorizontalPadding>
                    <VerticalPadding />
                </VStack>
            ) : null,
        [data?.artist, isPlaying, playingArtistId]
    );

    return data?.artist ? (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            {/* Hidden header */}
            <Animated.View style={[styles.hiddenHeaderContainer, hiddenHeaderStyle]}>
                <HStack
                    style={[{ paddingTop: insets.top }, styles.hiddenHeader]}
                    bg={(data?.artist?.coverImage?.meta as ImageMeta)?.dominantColor}
                >
                    <Text>{data.artist.name}</Text>
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
                <FullWidthSquareImage
                    url={data?.artist?.coverImage?.meta?.source}
                ></FullWidthSquareImage>
            </Animated.View>

            {/* Artist name */}
            <Animated.View style={[styles.artistName, titleStyle]}>
                <HorizontalPadding style={{ backgroundColor: "transparent" }}>
                    <Text fontSize="4xl" fontWeight="500" color="white">
                        {data.artist.name}
                    </Text>
                </HorizontalPadding>
            </Animated.View>

            {/* Play btn */}
            <Animated.View style={[styles.playBtnWrapper, playBtnWrapperStyle]}>
                {isPlaying && playingArtistId === data.artist.id ? (
                    <Icon
                        onPress={actionPause}
                        size={68}
                        p={0}
                        color="primary.400"
                        as={<Ionicons name="pause-circle" />}
                    ></Icon>
                ) : (
                    <Icon
                        onPress={onPlay}
                        size={68}
                        p={0}
                        color="primary.400"
                        as={<Ionicons name="play-circle" />}
                    ></Icon>
                )}
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
                tracks={data.artist.tracks.items}
            />

            {/* Player bar */}
            <Box style={styles.playerBarContainer} bottom={0}>
                {/* <PlayerBar /> */}
            </Box>
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
    artistName: {
        position: "absolute",
        top: screenWidth - 80,
        left: 0,
        zIndex: 2,
        width: "100%",
    },
    playBtnWrapper: {
        position: "absolute",
        top: screenWidth - 30,
        left: screenWidth - 70,
        zIndex: 3,
        width: "100%",
    },
    tracksListContainer: {
        position: "absolute",
        paddingTop: screenWidth - 40,
        top: 0,
        left: 0,
        height: "100%",
        zIndex: 2,
    },
    tracksListFooter: {
        paddingBottom: screenWidth + 80 - 40,
    },
    playerBarContainer: { position: "absolute", zIndex: 4, width: "100%" },
});
