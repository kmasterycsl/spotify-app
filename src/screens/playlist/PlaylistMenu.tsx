import EditPlaylist from "@/screens/playlist/EditPlaylist";
import Confirm from "@/shared/components/Confirm";
import { DEFAULT_HORIZONTAL_PADDING } from "@/shared/components/HorizontalPadding";
import PlaylistCoverImage from "@/shared/components/PlaylistCoverImage";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { LIKE_MUTATION } from "@/shared/mutations/LIKE_MUTATION";
import { GET_PLAYLIST_BY_ID_QUERY } from "@/shared/queries/GET_PLAYLIST_BY_ID_QUERY";
import { useCommonStore } from "@/store/common.store";
import { Mutation, Query } from "@/types/graphql";
import { RootStackParamList } from "@/types/routes.types";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, StackActions, useNavigation, useRoute } from "@react-navigation/core";
import { Button, HStack, Icon, ScrollView, Text, VStack } from "native-base";
import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

export const DELETE_PLAYLIST_MUTATION = gql`
    mutation deletePlaylist($id: String!) {
        deletePlaylist(id: $id) {
            id
        }
    }
`;

type PlaylistMenuScreenRouteProp = RouteProp<RootStackParamList, "PlaylistMenu">;

export default function PlaylistMenu() {
    const [doLike] = useMutation<Mutation>(LIKE_MUTATION, {
        refetchQueries: [GET_PLAYLIST_BY_ID_QUERY],
    });
    const [doDelete] = useMutation<Mutation>(DELETE_PLAYLIST_MUTATION, {});
    const { params } = useRoute<PlaylistMenuScreenRouteProp>();
    const { data: dataPlaylist } = useQuery<Query>(GET_PLAYLIST_BY_ID_QUERY, {
        variables: {
            id: params.playlistId,
            page: 0,
        },
    });
    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);
    const currentUser = useCommonStore(state => state.currentUser);
    const nav = useNavigation();
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);

    const onDelete = () => {
        setIsConfirmVisible(true);
    };

    const onEdit = () => {
        setIsEditVisible(true);
    };

    const onDeleteConfirm = () => {
        if (!dataPlaylist?.playlist) return;
        const deleted = doDelete({
            variables: {
                id: dataPlaylist.playlist.id,
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

    const like = () => {
        if (!dataPlaylist?.playlist) return;
        const liked = doLike({
            variables: {
                likeableId: dataPlaylist.playlist.id,
                likeableType: "PLAYLIST",
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

    if (!dataPlaylist?.playlist) return null;

    return (
        <RootSiblingParent>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <VStack>
                        {/* Image */}
                        <PlaylistCoverImage playlist={dataPlaylist.playlist} />

                        <VerticalPadding />

                        {/* Title */}
                        <VStack alignItems="center">
                            <Text fontWeight="600" fontSize="lg">
                                {dataPlaylist.playlist.name}
                            </Text>
                        </VStack>

                        <VerticalPadding multiple={3} />

                        {/* Actions */}
                        <VStack>
                            {/* Non-owner actions */}
                            {/* Like */}
                            {currentUser && currentUser.id !== dataPlaylist.playlist.userId && (
                                <>
                                    <TouchableOpacity onPress={like}>
                                        <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                            <Icon
                                                size="sm"
                                                color="primary.400"
                                                as={
                                                    dataPlaylist.playlist.isLiked ? (
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

                            {/* Owner actions */}
                            {currentUser && currentUser.id === dataPlaylist.playlist.userId && (
                                <>
                                    {/* Edit */}
                                    <TouchableOpacity onPress={onEdit}>
                                        <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                            <Icon
                                                size="sm"
                                                color="white"
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
                                        <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                            <Icon
                                                size="sm"
                                                color="white"
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
                    <Button variant="ghost" onPress={() => nav.goBack()}>
                        <Text>Close</Text>
                    </Button>
                </HStack>

                <Confirm
                    visible={isConfirmVisible}
                    onOk={onDeleteConfirm}
                    onCancel={() => setIsConfirmVisible(false)}
                />

                <EditPlaylist
                    visible={isEditVisible}
                    playlist={dataPlaylist.playlist}
                    setVisible={setIsEditVisible}
                />
            </SafeAreaView>
        </RootSiblingParent>
    );
}
