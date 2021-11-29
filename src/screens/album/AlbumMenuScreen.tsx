import ArtistNames from "@/shared/components/ArtistNames";
import FullWidthSquareImage from "@/shared/components/FullWidthSquareImage";
import { DEFAULT_HORIZONTAL_PADDING } from "@/shared/components/HorizontalPadding";
import TrackArtists from "@/shared/components/TrackArtists";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { LIKE_MUTATION } from "@/shared/mutations/LIKE_MUTATION";
import { GET_ALBUM_BY_ID_QUERY } from "@/shared/queries/GET_ALBUM_BY_ID_QUERY";
import { GET_LIKEABLES_QUERY } from "@/shared/queries/GET_LIKEABLES_QUERY";
import { useCommonStore } from "@/store/common.store";
import { Artist, Mutation, Query } from "@/types/graphql";
import { RootStackParamList } from "@/types/routes.types";
import { useMutation, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Button, HStack, Icon, ScrollView, Text, VStack } from "native-base";
import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, useWindowDimensions } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

type AlbumMenuScreenRouteProp = RouteProp<RootStackParamList, "AlbumMenu">;

export default function AlbumMenuScreen() {
    const [doLike, { data, error }] = useMutation<Mutation>(LIKE_MUTATION, {
        refetchQueries: [GET_ALBUM_BY_ID_QUERY, GET_LIKEABLES_QUERY],
    });
    const { params } = useRoute<AlbumMenuScreenRouteProp>();

    const { data: albumData } = useQuery<Query>(GET_ALBUM_BY_ID_QUERY, {
        variables: {
            id: params.albumId,
        },
    });
    const [viewArtistsVisible, setViewArtistsVisible] = useState(false);

    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);
    const currentUser = useCommonStore(state => state.currentUser);
    const nav = useNavigation();
    const dimessions = useWindowDimensions();

    const onViewArtists = () => {
        if (!albumData?.album) return;
        if (albumData.album.allArtists.length === 1) {
            goToArtist(albumData.album.allArtists[0]);
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

    const like = () => {
        if (!albumData?.album) return;
        const liked = doLike({
            variables: {
                likeableId: albumData.album.id,
                likeableType: "ALBUM",
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

    if (!albumData?.album) return null;

    return (
        <RootSiblingParent>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <VStack>
                        {/* Image */}
                        <HStack
                            justifyContent="center"
                            style={{ paddingTop: dimessions.height * 0.2 }}
                        >
                            <FullWidthSquareImage
                                padding={dimessions.width * 0.3}
                                url={albumData.album.coverImage.meta.source}
                            ></FullWidthSquareImage>
                        </HStack>

                        <VerticalPadding />

                        {/* Title */}
                        <VStack alignItems="center" flexShrink={1} flexGrow={1} overflow="hidden">
                            <Text fontWeight="600" fontSize="lg">
                                {albumData.album.name}
                            </Text>
                            <ArtistNames artists={albumData.album.allArtists} />
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
                                                    albumData.album.isLiked ? (
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
                    artists={albumData.album.allArtists}
                    visible={viewArtistsVisible}
                    setVisible={setViewArtistsVisible}
                    onPressArtist={goToArtist}
                />
            </SafeAreaView>
        </RootSiblingParent>
    );
}
