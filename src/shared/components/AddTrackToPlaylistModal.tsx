import CreateNewPlaylist from "@/screens/playlist/CreateNewPlaylist";
import { useCommonStore } from "@/store/common.store";
import { Mutation, Playlist, Query, Track } from "@/types/graphql";
import { useMutation, useQuery } from "@apollo/client";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { Button, HStack, Icon, IconButton, Text, VStack } from "native-base";
import React, { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { ADD_TRACK_TO_PLAYLIST_MUTATION } from "../queries/ADD_TRACK_TO_PLAYLIST_MUTATION";
import { GET_OWN_PLAYLISTS_QUERY } from "../queries/GET_OWN_PLAYLISTS_QUERY";
import Empty from "./Empty";
import PlaylistListItem from "./PlaylistListItem";
import SafeAreaView from "./SafeAreaView";
import VerticalPadding from "./VerticalPadding";

interface AddTrackToPlaylistModalProps {
    track: Track;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export default function AddTrackToPlaylistModal({
    track,
    visible,
    setVisible,
}: AddTrackToPlaylistModalProps) {
    const { data, loading } = useQuery<Query>(GET_OWN_PLAYLISTS_QUERY);
    const [doAdd] = useMutation<Mutation>(ADD_TRACK_TO_PLAYLIST_MUTATION, {
        refetchQueries: [GET_OWN_PLAYLISTS_QUERY],
    });
    const nav = useNavigation();
    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);
    const [isShowCreatePlaylist, setIsShowCreatePlaylist] = useState(false);

    const onAddToPlaylist = (playlist: Playlist) => {
        const added = doAdd({
            variables: {
                playlistId: playlist.id,
                trackId: track.id,
            },
        });
        added.then(() => {
            setVisible(false);
            actionSetToastMessage({
                title: "Added",
                status: "info",
            });
        });
        added.catch(e => {
            actionSetToastMessage({
                title: e.message,
                status: "error",
            });
            console.error(e);
        });
    };

    return (
        <Modal
            animationType="slide"
            presentationStyle="fullScreen"
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <VStack flexGrow={1}>
                    <HStack alignItems="center">
                        <IconButton
                            alignSelf="flex-start"
                            onPress={() => setVisible(false)}
                            icon={<Icon as={<Ionicons name="close-outline" />}></Icon>}
                        />
                        <Text fontSize="xl" fontWeight="600">
                            Playlists
                        </Text>
                    </HStack>

                    <VerticalPadding />

                    <HStack justifyContent="center">
                        <Button
                            onPress={() => setIsShowCreatePlaylist(true)}
                            startIcon={
                                <Icon size="sm" as={<Ionicons name="add-circle-outline" />}></Icon>
                            }
                        >
                            New playlist
                        </Button>
                    </HStack>

                    <VerticalPadding />

                    {loading && <Text>Loading...</Text>}
                    {!loading && data && data.getOwnPlaylists.length === 0 && (
                        <Empty text="You don't have any playlists" />
                    )}
                    {!loading &&
                        data &&
                        data.getOwnPlaylists.length > 0 &&
                        data.getOwnPlaylists.map(playlist => (
                            <VStack key={playlist.id}>
                                <TouchableOpacity onPress={() => onAddToPlaylist(playlist)}>
                                    <PlaylistListItem playlist={playlist} />
                                </TouchableOpacity>
                                <VerticalPadding />
                            </VStack>
                        ))}
                </VStack>
            </SafeAreaView>
            <CreateNewPlaylist
                visible={isShowCreatePlaylist}
                setVisible={setIsShowCreatePlaylist}
            />
        </Modal>
    );
}
