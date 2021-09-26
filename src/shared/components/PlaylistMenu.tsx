import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { Ionicons } from "@expo/vector-icons";
import { StackActions, useNavigation } from "@react-navigation/core";
import { Button, HStack, Icon, ScrollView, Text, VStack } from "native-base";
import React, { useState } from "react";
import { Modal, TouchableOpacity, useWindowDimensions } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import shallow from "zustand/shallow";
import { useCommonStore } from "@/store/common.store";
import { usePlayerStore } from "@/store/player.store";
import { Mutation, Playlist, Track } from "@/types/graphql";
import { GET_ARTIST_BY_ID_QUERY } from "@/shared/queries/GET_ARTIST_BY_ID_QUERY";
import ArtistNames from "./ArtistNames";
import FullWidthSquareImage from "./FullWidthSquareImage";
import { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";
import SafeAreaView from "./SafeAreaView";
import VerticalPadding from "./VerticalPadding";
import Confirm from "./Confirm";
import EditPlaylist from "@/screens/playlist/EditPlaylist";
import PlaylistCoverImage from "./PlaylistCoverImage";

interface PlaylistMenuProps {
    playlist: Playlist;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onViewArtists?: () => void;
    onAddTrackToPlaylist?: () => void;
}

export const DELETE_PLAYLIST_MUTATION = gql`
    mutation deletePlaylist($id: String!) {
        deletePlaylist(id: $id) {
            id
        }
    }
`;

export default function PlaylistMenu({
    playlist,
    visible,
    onViewArtists,
    onAddTrackToPlaylist,
    setVisible,
}: PlaylistMenuProps) {
    const [doDelete, { data, error }] = useMutation<Mutation>(DELETE_PLAYLIST_MUTATION, {
        // refetchQueries: [GET_ARTIST_BY_ID_QUERY],
    });
    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);
    const currentUser = useCommonStore(state => state.currentUser);
    const nav = useNavigation();
    const dimessions = useWindowDimensions();
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);

    const onDelete = () => {
        setIsConfirmVisible(true);
    };

    const onEdit = () => {
        setIsEditVisible(true);
    };

    const onDeleteConfirm = () => {
        const deleted = doDelete({
            variables: {
                id: playlist.id,
            },
        });

        deleted.then(res => {
            setIsConfirmVisible(false);
            actionSetToastMessage({
                title: "Deleted",
                status: "info",
            });
            nav.dispatch(StackActions.popToTop());
        });

        deleted.catch(e => {
            actionSetToastMessage({
                title: e.message,
                status: "error",
            });
            console.error(e);
        });
    };

    return (
        <Modal
            animationType="fade"
            presentationStyle="overFullScreen"
            visible={visible}
            style={{ zIndex: -1 }}
        >
            <RootSiblingParent>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>
                        <VStack>
                            {/* Image */}
                            <PlaylistCoverImage playlist={playlist} />

                            <VerticalPadding />

                            {/* Title */}
                            <VStack alignItems="center">
                                <Text fontWeight="600" fontSize="lg">
                                    {playlist.name}
                                </Text>
                            </VStack>

                            <VerticalPadding multiple={3} />

                            {/* Actions */}
                            <VStack>
                                {/* Owner actions */}
                                {currentUser && currentUser.id === playlist.userId && (
                                    <>
                                        {/* Edit */}
                                        <TouchableOpacity onPress={onEdit}>
                                            <HStack
                                                px={DEFAULT_HORIZONTAL_PADDING}
                                                alignItems="center"
                                            >
                                                <Icon
                                                    size="sm"
                                                    as={<Ionicons name="remove-circle-outline" />}
                                                ></Icon>
                                                <Text ml={DEFAULT_HORIZONTAL_PADDING}>
                                                    Edit playlist
                                                </Text>
                                            </HStack>
                                        </TouchableOpacity>
                                        <VerticalPadding />

                                        {/* Delete */}
                                        <TouchableOpacity onPress={onDelete}>
                                            <HStack
                                                px={DEFAULT_HORIZONTAL_PADDING}
                                                alignItems="center"
                                            >
                                                <Icon
                                                    size="sm"
                                                    as={<Ionicons name="trash-outline" />}
                                                ></Icon>
                                                <Text ml={DEFAULT_HORIZONTAL_PADDING}>
                                                    Delete playlist
                                                </Text>
                                            </HStack>
                                        </TouchableOpacity>
                                        <VerticalPadding />
                                    </>
                                )}
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

            <Confirm
                visible={isConfirmVisible}
                onOk={onDeleteConfirm}
                onCancel={() => setIsConfirmVisible(false)}
            />

            <EditPlaylist
                visible={isEditVisible}
                playlist={playlist}
                setVisible={setIsEditVisible}
            />
        </Modal>
    );
}
