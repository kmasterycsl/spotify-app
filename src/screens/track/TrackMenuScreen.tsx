import ArtistNames from "@/shared/components/ArtistNames";
import FullWidthSquareImage from "@/shared/components/FullWidthSquareImage";
import { DEFAULT_HORIZONTAL_PADDING } from "@/shared/components/HorizontalPadding";
import TrackArtists from "@/shared/components/TrackArtists";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { LIKE_MUTATION } from "@/shared/mutations/LIKE_MUTATION";
import { GET_LIKEABLES_QUERY } from "@/shared/queries/GET_LIKEABLES_QUERY";
import { GET_TRACK_BY_ID_QUERY } from "@/shared/queries/GET_TRACK_BY_ID_QUERY";
import { useCommonStore } from "@/store/common.store";
import { usePlayerStore } from "@/store/player.store";
import { Artist, Mutation, Query } from "@/types/graphql";
import { RootStackParamList } from "@/types/routes.types";
import { useMutation, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Button, HStack, Icon, ScrollView, Text, VStack } from "native-base";
import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, useWindowDimensions } from "react-native";
import shallow from "zustand/shallow";

type TrackMenuScreenRouteProp = RouteProp<RootStackParamList, "TrackMenu">;

export default function TrackMenuScreen() {
    const [doLike, { data, error }] = useMutation<Mutation>(LIKE_MUTATION, {
        refetchQueries: [GET_TRACK_BY_ID_QUERY, GET_LIKEABLES_QUERY],
    });
    const { params } = useRoute<TrackMenuScreenRouteProp>();

    const { data: trackData } = useQuery<Query>(GET_TRACK_BY_ID_QUERY, {
        variables: {
            id: params.trackId,
        },
    });
    const [viewArtistsVisible, setViewArtistsVisible] = useState(false);

    const [actionAddToQueue, actionRemoveFromQueue, trackInQueue] = usePlayerStore(
        state => [
            state.actionAddToQueue,
            state.actionRemoveFromQueue,
            state.tracksQueue.find(t => t.id === params.trackId),
        ],
        shallow
    );
    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);
    const currentUser = useCommonStore(state => state.currentUser);
    const nav = useNavigation();
    const dimessions = useWindowDimensions();

    const onViewArtists = () => {
        if (!trackData?.track) return;
        if (trackData.track.artists.length === 1) {
            goToArtist(trackData.track.artists[0]);
        } else {
            setViewArtistsVisible(true);
        }
    };

    const goToArtist = (artist: Artist) => {
        setTimeout(() => {
            nav.goBack();

            nav.navigate({
                name: "ArtistDetail",
                params: {
                    artistId: artist.id,
                },
            });
        });
    };

    const onViewAddTrackToPlaylist = () => {
        nav.navigate("AddTrackToPlaylist", { trackId: params.trackId });
    };

    const onAddToQueue = () => {
        if (trackData?.track) {
            actionAddToQueue(trackData.track);
            nav.goBack();
        }
    };

    const onRemoveFromQueue = () => {
        if (trackData?.track) {
            actionRemoveFromQueue(trackData.track);
            nav.goBack();
        }
    };

    const like = () => {
        if (!trackData?.track) return;
        const liked = doLike({
            variables: {
                likeableId: trackData.track.id,
                likeableType: "TRACK",
            },
        });

        liked.then(res => {
            actionSetToastMessage({
                title: res.data?.like ? "Liked" : "Unliked",
                status: "info",
            });
        });

        liked.catch(e => {
            actionSetToastMessage({
                title: e.message,
                status: "error",
            });
            console.error(e);
        });
    };

    const goToAlbum = () => {
        if (trackData?.track) {
            nav.goBack();
            nav.navigate("AlbumDetail", { albumId: trackData.track.album.id });
        }
    };

    if (!trackData?.track) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <VStack>
                    {/* Image */}
                    <HStack justifyContent="center" style={{ paddingTop: dimessions.height * 0.2 }}>
                        <FullWidthSquareImage
                            padding={dimessions.width * 0.3}
                            url={trackData.track.album.coverImage.meta.source}
                        ></FullWidthSquareImage>
                    </HStack>

                    <VerticalPadding />

                    {/* Title */}
                    <VStack alignItems="center">
                        <Text fontWeight="600" fontSize="lg">
                            {trackData.track.name}
                        </Text>
                        <ArtistNames artists={trackData.track.artists} />
                    </VStack>

                    <VerticalPadding multiple={3} />

                    {/* Actions */}
                    <VStack>
                        {/* Like */}
                        {currentUser && (
                            <>
                                <TouchableOpacity onPress={like}>
                                    <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                        <Icon
                                            size="sm"
                                            color="primary.400"
                                            as={
                                                trackData.track.isLiked ? (
                                                    <Ionicons name="heart" />
                                                ) : (
                                                    <Ionicons name="heart-outline" />
                                                )
                                            }
                                        ></Icon>
                                        <Text ml={DEFAULT_HORIZONTAL_PADDING}>Like</Text>
                                    </HStack>
                                </TouchableOpacity>
                                <VerticalPadding />
                            </>
                        )}

                        {/* Add/remove from queue */}
                        {!trackInQueue ? (
                            <TouchableOpacity onPress={onAddToQueue}>
                                <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                    <Icon
                                        color="white"
                                        size="sm"
                                        as={<Ionicons name="list-outline" />}
                                    ></Icon>
                                    <Text ml={DEFAULT_HORIZONTAL_PADDING}>Add to queue</Text>
                                </HStack>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={onRemoveFromQueue}>
                                <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                    <Icon
                                        color="white"
                                        size="sm"
                                        as={<Ionicons name="list-outline" />}
                                    ></Icon>
                                    <Text ml={DEFAULT_HORIZONTAL_PADDING}>Remove from queue</Text>
                                </HStack>
                            </TouchableOpacity>
                        )}
                        <VerticalPadding />

                        {/* Add to playlist */}
                        {currentUser && (
                            <>
                                <TouchableOpacity onPress={onViewAddTrackToPlaylist}>
                                    <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                        <Icon
                                            color="white"
                                            size="sm"
                                            as={<Ionicons name="add-circle-outline" />}
                                        ></Icon>
                                        <Text ml={DEFAULT_HORIZONTAL_PADDING}>Add to playlist</Text>
                                    </HStack>
                                </TouchableOpacity>
                                <VerticalPadding />
                            </>
                        )}

                        {/* Go to album */}
                        <TouchableOpacity onPress={goToAlbum}>
                            <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                <Icon
                                    color="white"
                                    size="sm"
                                    as={<Ionicons name="musical-note" />}
                                ></Icon>
                                <Text ml={DEFAULT_HORIZONTAL_PADDING}>Go to album</Text>
                            </HStack>
                        </TouchableOpacity>
                        <VerticalPadding />

                        {/* View artists */}
                        <TouchableOpacity onPress={onViewArtists}>
                            <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                <Icon
                                    color="white"
                                    size="sm"
                                    as={<Ionicons name="people" />}
                                ></Icon>
                                <Text ml={DEFAULT_HORIZONTAL_PADDING}>View artists</Text>
                            </HStack>
                        </TouchableOpacity>
                    </VStack>
                </VStack>
            </ScrollView>
            <HStack justifyContent="center">
                <Button variant="ghost" onPress={() => nav.goBack()}>
                    <Text>Close</Text>
                </Button>
            </HStack>
            <TrackArtists
                artists={trackData.track.artists}
                visible={viewArtistsVisible}
                setVisible={setViewArtistsVisible}
                onPressArtist={goToArtist}
            />
        </SafeAreaView>
    );
}
