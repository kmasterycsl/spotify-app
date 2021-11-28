import AlbumCoverImage from "@/shared/components/AlbumCoverImage";
import ArtistNames from "@/shared/components/ArtistNames";
import FloatingPlayBtn, { PLAY_BTN_HEIGHT } from "@/shared/components/FloatingPlayBtn";
import HiddenBackIcon from "@/shared/components/HiddenBackIcon";
import HiddenHeader, { HEADER_HEIGHT } from "@/shared/components/HiddenHeader";
import HorizontalPadding, {
    DEFAULT_HORIZONTAL_PADDING,
    _DEFAULT_HORIZONTAL_PADDING,
} from "@/shared/components/HorizontalPadding";
import SafeAreaView from "@/shared/components/SafeAreaView";
import TracksList from "@/shared/components/TracksList";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_ALBUM_BY_ID_QUERY } from "@/shared/queries/GET_ALBUM_BY_ID_QUERY";
import { usePlayerStore } from "@/store/player.store";
import { ImageMeta, Query } from "@/types/graphql";
import { RootStackParamList } from "@/types/routes.types";
import { useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { HStack, Icon, IconButton, Image, Text, VStack } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
    useAnimatedProps,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AlbumActions from "./album/AlbumActions";
const screenWidth = Dimensions.get("screen").width;

type AlbumDetailScreenRouteProp = RouteProp<RootStackParamList, "AlbumDetail">;
const ARTIST_NAME_HEIGHT = 35;

export default function AlbumDetailScreen() {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    const actionPlayAlbum = usePlayerStore(state => state.actionPlayAlbum);
    const actionPause = usePlayerStore(state => state.actionPause);
    const isPlaying = usePlayerStore(
        state => state.soundControllerStatus?.isLoaded && state.soundControllerStatus.isPlaying
    );
    const { params } = useRoute<AlbumDetailScreenRouteProp>();
    const [loading, setLoading] = useState(false);
    const playingAlbumId = usePlayerStore(store => store.playingAlbumId);
    const { data, error, refetch } = useQuery<Query>(GET_ALBUM_BY_ID_QUERY, {
        variables: {
            id: params.albumId,
        },
    });
    useEffect(() => {
        refetch();
    }, [params.albumId]);

    const scrollOffsetY = useSharedValue(0);

    const goBack = () => {
        nav.goBack();
    };

    const onPlay = () => {
        if (data?.album) {
            actionPlayAlbum(data.album);
        }
    };

    const onPause = () => {
        actionPause();
    };

    const hiddenHeaderStyle = useAnimatedStyle(() => ({
        opacity: (scrollOffsetY.value * 1.4) / screenWidth,
    }));

    const backIconStyle = useAnimatedProps(() => ({
        backgroundColor: scrollOffsetY.value / screenWidth > 0.5 ? "transparent" : "gray",
    }));

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

    const titleStyle = useAnimatedStyle(() => ({
        top: screenWidth - ARTIST_NAME_HEIGHT - _DEFAULT_HORIZONTAL_PADDING - scrollOffsetY.value,
        opacity: 1 - (scrollOffsetY.value * 2) / screenWidth,
    }));

    const playBtnWrapperStyle = useAnimatedStyle(() => {
        return {
            top: Math.max(
                screenWidth + _DEFAULT_HORIZONTAL_PADDING - scrollOffsetY.value,
                insets.top + HEADER_HEIGHT - PLAY_BTN_HEIGHT / 2
            ),
        };
    });

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollOffsetY.value = event.contentOffset.y;
    });

    const ListHeaderComponent = useMemo(
        () =>
            data?.album ? (
                <HorizontalPadding>
                    <VStack style={{ paddingVertical: _DEFAULT_HORIZONTAL_PADDING }}>
                        <AlbumActions album={data.album} />
                    </VStack>
                </HorizontalPadding>
            ) : null,
        [data?.album, isPlaying, playingAlbumId]
    );

    return data?.album ? (
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            {/* <LinearGradient
                    colors={[(data.album.coverImage.meta as ImageMeta).dominantColor, "gray"]}
                    style={styles.background}
                /> */}

            {/* Hidden header */}
            <HiddenHeader
                title={data.album.name}
                style={[
                    hiddenHeaderStyle,
                    {
                        backgroundColor: (data?.album?.coverImage?.meta as ImageMeta)
                            ?.dominantColor,
                    },
                ]}
            />

            {/* Hidden back icon */}
            <HiddenBackIcon style={backIconStyle} />

            {/* Cover image */}
            <Animated.View style={[{ position: "absolute", zIndex: 0 }, coverImgStyle]}>
                <AlbumCoverImage album={data.album} style={coverImgInnerStyle} />
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
                        {data.album.name}
                    </Text>
                </HorizontalPadding>
            </Animated.View>

            {/* Play btn */}
            <FloatingPlayBtn
                isPlaying={!!isPlaying && playingAlbumId === data.album.id}
                onPause={onPause}
                onPlay={onPlay}
                style={playBtnWrapperStyle}
            />

            {/* Tracks list */}
            <TracksList
                styles={{
                    listContainer: styles.tracksListContainer,
                    footer: styles.tracksListFooter,
                }}
                headerComponent={ListHeaderComponent}
                isFinished={false}
                isLoading={loading}
                onLoadMore={() => {}}
                onScroll={scrollHandler}
                tracks={data.album.tracks}
            />
        </SafeAreaView>
    ) : null;
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
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
        paddingBottom: screenWidth,
    },
});
