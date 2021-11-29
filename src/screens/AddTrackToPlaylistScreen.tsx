import { useCommonStore } from "@/store/common.store";
import { Mutation, Playlist, Query } from "@/types/graphql";
import { RootStackParamList } from "@/types/routes.types";
import { useMutation, useQuery } from "@apollo/client";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { Button, HStack, Icon, IconButton, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ADD_TRACK_TO_PLAYLIST_MUTATION } from "../shared/mutations/ADD_TRACK_TO_PLAYLIST_MUTATION";
import { GET_OWN_PLAYLISTS_QUERY } from "../shared/queries/GET_OWN_PLAYLISTS_QUERY";
import Empty from "../shared/components/Empty";
import PlaylistListItem from "../shared/components/PlaylistListItem";
import SafeAreaView from "../shared/components/SafeAreaView";
import VerticalPadding from "../shared/components/VerticalPadding";
import HorizontalPadding from "@/shared/components/HorizontalPadding";
import { RootSiblingParent } from "react-native-root-siblings";

type AddTrackToPlaylistProp = RouteProp<RootStackParamList, "AddTrackToPlaylist">;

export default function AddTrackToPlaylistScreen() {
    const { params } = useRoute<AddTrackToPlaylistProp>();
    const trackId = params.trackId;
    const { data, loading } = useQuery<Query>(GET_OWN_PLAYLISTS_QUERY);
    const [doAdd] = useMutation<Mutation>(ADD_TRACK_TO_PLAYLIST_MUTATION, {
        refetchQueries: [GET_OWN_PLAYLISTS_QUERY],
    });
    const nav = useNavigation();
    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);

    const onAddTrackToPlaylist = (playlist: Playlist) => {
        const added = doAdd({
            variables: {
                playlistId: playlist.id,
                trackId: trackId,
            },
        });
        added.then(() => {
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

    const goToCreatePlaylist = () => {
        nav.navigate("CreatePlaylist");
    };

    return (
        <RootSiblingParent>
            <SafeAreaView style={{ flex: 1 }}>
                <HStack alignItems="center">
                    <IconButton
                        alignSelf="flex-start"
                        onPress={nav.goBack}
                        icon={<Icon color="white" as={<Ionicons name="close-outline" />}></Icon>}
                    />
                    <Text fontSize="xl" fontWeight="600">
                        Playlists
                    </Text>
                </HStack>

                <VerticalPadding />

                <HStack justifyContent="center">
                    <Button
                        size="sm"
                        onPress={goToCreatePlaylist}
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
                {!loading && data && data.getOwnPlaylists.length > 0 && (
                    <ScrollView flexGrow={1}>
                        {data.getOwnPlaylists.map(playlist => (
                            <HorizontalPadding key={playlist.id}>
                                <VStack>
                                    <TouchableOpacity
                                        onPress={() => onAddTrackToPlaylist(playlist)}
                                    >
                                        <PlaylistListItem playlist={playlist} />
                                    </TouchableOpacity>
                                    <VerticalPadding />
                                </VStack>
                            </HorizontalPadding>
                        ))}
                    </ScrollView>
                )}
            </SafeAreaView>
        </RootSiblingParent>
    );
}
