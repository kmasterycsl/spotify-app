import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Button, HStack, Icon, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { Modal, TouchableOpacity, useWindowDimensions } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import shallow from "zustand/shallow";
import { useCommonStore } from "../../store/common.store";
import { usePlayerStore } from "../../store/player.store";
import { Mutation, Track } from "../../types/graphql";
import { GET_ARTIST_BY_ID_QUERY } from "../queries/GET_ARTIST_BY_ID_QUERY";
import ArtistNames from "./ArtistNames";
import FullWidthSquareImage from "./FullWidthSquareImage";
import { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";
import SafeAreaView from "./SafeAreaView";
import VerticalPadding from "./VerticalPadding";

interface TrackMenuProps {
    track: Track;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const LIKE_MUTATION = gql`
    mutation like($likeableType: LikeableType!, $likeableId: String!) {
        like(likeableType: $likeableType, likeableId: $likeableId)
    }
`;

export default function TrackMenu({ track, visible, setVisible }: TrackMenuProps) {
    const [doLike, { data, error }] = useMutation<Mutation>(LIKE_MUTATION, {
        refetchQueries: [GET_ARTIST_BY_ID_QUERY],
    });
    const [actionAddToQueue, actionRemoveFromQueue, trackInQueue] = usePlayerStore(
        state => [
            state.actionAddToQueue,
            state.actionRemoveFromQueue,
            state.tracksQueue.find(t => t.id === track.id),
        ],
        shallow
    );
    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);
    const currentUser = useCommonStore(state => state.currentUser);
    const nav = useNavigation();
    const dimessions = useWindowDimensions();

    const onAddToQueue = () => {
        actionAddToQueue(track);
        setVisible(false);
    };

    const onRemoveFromQueue = () => {
        actionRemoveFromQueue(track);
        setVisible(false);
    };

    const like = () => {
        doLike({
            variables: {
                likeableId: track.id,
                likeableType: "TRACK",
            },
        })
            .then(res => {
                actionSetToastMessage({
                    title: res.data?.like ? "Liked" : "Unliked",
                    status: "info",
                });
            })
            .catch(e => {
                actionSetToastMessage({
                    title: e.message,
                    status: "error",
                });
                console.error(e);
            });
    };

    const goToAlbum = () => {
        nav.navigate("AlbumDetail", { albumId: track.album.id });
        setVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            presentationStyle="overFullScreen"
            visible={visible}
            style={{ zIndex: -1 }}
        >
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
                                    url={track.album.coverImage.meta.source}
                                ></FullWidthSquareImage>
                            </HStack>

                            <VerticalPadding />

                            {/* Title */}
                            <VStack alignItems="center">
                                <Text fontWeight="600" fontSize="lg">
                                    {track.name}
                                </Text>
                                <ArtistNames artists={track.artists} />
                            </VStack>

                            <VerticalPadding multiple={3} />

                            {/* Actions */}
                            <VStack>
                                {/* Like */}
                                {currentUser && (
                                    <>
                                        <TouchableOpacity onPress={like}>
                                            <HStack
                                                px={DEFAULT_HORIZONTAL_PADDING}
                                                alignItems="center"
                                            >
                                                <Icon
                                                    size="sm"
                                                    color="primary.400"
                                                    as={
                                                        track.isLiked ? (
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
                                                size="sm"
                                                as={<Ionicons name="list-outline" />}
                                            ></Icon>
                                            <Text ml={DEFAULT_HORIZONTAL_PADDING}>
                                                Add to queue
                                            </Text>
                                        </HStack>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={onRemoveFromQueue}>
                                        <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                            <Icon
                                                size="sm"
                                                as={<Ionicons name="list-outline" />}
                                            ></Icon>
                                            <Text ml={DEFAULT_HORIZONTAL_PADDING}>
                                                Remove from queue
                                            </Text>
                                        </HStack>
                                    </TouchableOpacity>
                                )}
                                <VerticalPadding />
                                {/* Go to album */}
                                <TouchableOpacity onPress={goToAlbum}>
                                    <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                        <Icon
                                            size="sm"
                                            as={<Ionicons name="musical-note" />}
                                        ></Icon>
                                        <Text ml={DEFAULT_HORIZONTAL_PADDING}>Go to album</Text>
                                    </HStack>
                                </TouchableOpacity>
                            </VStack>
                        </VStack>
                    </ScrollView>
                    <HStack justifyContent="center">
                        <Button variant="ghost" onPress={() => setVisible(false)}>
                            <Text>Close</Text>
                        </Button>
                    </HStack>
                </SafeAreaView>
            </RootSiblingParent>
        </Modal>
    );
}
