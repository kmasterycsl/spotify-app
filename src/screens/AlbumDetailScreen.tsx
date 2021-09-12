import { gql, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { HStack, Icon, IconButton, Image, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArtistNames from "../shared/components/ArtistNames";
import HorizontalPadding, {
    DEFAULT_HORIZONTAL_PADDING,
} from "../shared/components/HorizontalPadding";
import PlayerBar from "../shared/components/PlayerBar";
import SafeAreaView from "../shared/components/SafeAreaView";
import TracksList from "../shared/components/TracksList";
import VerticalPadding from "../shared/components/VerticalPadding";
import { usePlayerStore } from "../store/player.store";
import { ImageMeta, Query } from "../types/graphql";
import { RootStackParamList } from "../types/routes.types";

type AlbumDetailScreenRouteProp = RouteProp<RootStackParamList, "AlbumDetail">;

const getAlbumById = gql`
    query getAlbumById($id: String!) {
        album(id: $id) {
            id
            name
            type
            description
            createdAt
            allArtists {
                id
                name
            }
            coverImage {
                id
                meta {
                    ... on ImageMeta {
                        source
                        width
                        height
                        dominantColor
                    }
                }
            }
            tracks {
                id
                name
                sound {
                    id
                    meta {
                        ... on SoundMeta {
                            source
                            length
                        }
                    }
                }
                artists {
                    id
                    name
                }
                album {
                    id
                    coverImage {
                        id
                        meta {
                            ... on ImageMeta {
                                source
                                width
                                height
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default function AlbumDetailScreen() {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    const actionPlayAlbum = usePlayerStore(state => state.actionPlayAlbum);
    const actionPause = usePlayerStore(state => state.actionPause);
    const playingAlbumId = usePlayerStore(state => state.playingAlbumId);
    const isPlaying = usePlayerStore(
        state => state.soundControllerStatus?.isLoaded && state.soundControllerStatus.isPlaying
    );
    const { params } = useRoute<AlbumDetailScreenRouteProp>();
    const [loading, setLoading] = useState(false);
    const { data, error, refetch } = useQuery<Query>(getAlbumById, {
        variables: {
            id: params.albumId,
        },
    });
    if (error) {
        console.error(error);
    }
    useEffect(() => {
        refetch();
    }, [params.albumId]);

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

    return data?.album ? (
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <VStack justifyContent="flex-start">
                <LinearGradient
                    colors={[(data.album.coverImage.meta as ImageMeta).dominantColor, "gray"]}
                    style={styles.background}
                />
                <HStack
                    justifyContent="center"
                    position="relative"
                    mx={DEFAULT_HORIZONTAL_PADDING}
                    style={{ marginTop: insets.top }}
                >
                    <IconButton
                        position="absolute"
                        hitSlop={10}
                        top={0}
                        left={0}
                        variant="ghost"
                        mr="auto"
                        onPress={goBack}
                        borderRadius={100}
                        bg="gray.600"
                        icon={
                            <Icon
                                size="sm"
                                color="gray.400"
                                as={<Ionicons name="chevron-back-outline" />}
                            ></Icon>
                        }
                    />
                    <Image
                        shadow={2}
                        alt={data.album.name}
                        source={{ uri: data.album.coverImage.meta.source }}
                        style={{ width: 250, height: 250 }}
                    />
                </HStack>

                <VerticalPadding style={{ backgroundColor: "transparent" }} />

                <HorizontalPadding style={{ backgroundColor: "transparent" }}>
                    <Text fontSize="2xl" color="white">
                        {data.album.name}
                    </Text>
                    <ArtistNames color="white" artists={data.album.allArtists} />
                    <Text>
                        <Text color="white" textTransform="capitalize">
                            {data.album.type}
                        </Text>
                        <Text color="white"> - {new Date(data.album.createdAt).getFullYear()}</Text>
                    </Text>
                    <VerticalPadding style={{ backgroundColor: "transparent" }} />
                </HorizontalPadding>
            </VStack>
            <HorizontalPadding>
                <HStack justifyContent="space-between" alignItems="center">
                    <Text>Info</Text>
                    {isPlaying && playingAlbumId === data.album.id ? (
                        <IconButton
                            size="sm"
                            variant="ghost"
                            onPress={onPause}
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
            <TracksList
                isFinished={false}
                isLoading={loading}
                onLoadMore={() => {}}
                tracks={data.album.tracks}
            />
            <PlayerBar />
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
});
