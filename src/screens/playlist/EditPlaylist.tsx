import HorizontalPadding from "@/shared/components/HorizontalPadding";
import SafeAreaView from "@/shared/components/SafeAreaView";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_LIKEABLES_QUERY } from "@/shared/queries/GET_LIKEABLES_QUERY";
import { GET_OWN_PLAYLISTS_QUERY } from "@/shared/queries/GET_OWN_PLAYLISTS_QUERY";
import { GET_PLAYLIST_BY_ID_QUERY } from "@/shared/queries/GET_PLAYLIST_BY_ID_QUERY";
import { useCommonStore } from "@/store/common.store";
import { Mutation, Playlist } from "@/types/graphql";
import { gql, useMutation } from "@apollo/client";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Box, Button, Icon, IconButton, Input, VStack } from "native-base";
import React, { useState } from "react";
import { Modal } from "react-native";

interface EditPlaylistProps {
    playlist: Playlist;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const UPDATE_PLAYLIST_MUTATION = gql`
    mutation updatePlaylist($id: String!, $name: String!) {
        updatePlaylist(id: $id, name: $name) {
            name
        }
    }
`;

export default function EditPlaylist({ visible, setVisible, playlist }: EditPlaylistProps) {
    const [name, setName] = useState("");
    const [doUpdate] = useMutation<Mutation>(UPDATE_PLAYLIST_MUTATION, {
        refetchQueries: [GET_LIKEABLES_QUERY, GET_OWN_PLAYLISTS_QUERY, GET_PLAYLIST_BY_ID_QUERY],
    });
    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);

    const onSubmit = () => {
        if (!name) return;
        const updated = doUpdate({
            variables: {
                id: playlist.id,
                name,
            },
        });

        updated.then(res => {
            setVisible(false);
            actionSetToastMessage({
                title: "Updated",
                status: "info",
            });
        });

        updated.catch(e => {
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
                <IconButton
                    alignSelf="flex-end"
                    onPress={() => setVisible(false)}
                    icon={<Icon as={<Ionicons name="close-outline" />}></Icon>}
                />
                <VStack justifyContent="center" flexGrow={1}>
                    <HorizontalPadding>
                        <Input
                            defaultValue={playlist.name}
                            onChangeText={setName}
                            placeholder="My playlist"
                            autoFocus
                            fontSize="2xl"
                            variant="underlined"
                            onEndEditing={onSubmit}
                        ></Input>
                        <VerticalPadding />
                        <Button
                            disabled={!name}
                            alignSelf="center"
                            variant="outline"
                            onPress={onSubmit}
                        >
                            Save
                        </Button>
                    </HorizontalPadding>
                </VStack>
                <Box></Box>
            </SafeAreaView>
        </Modal>
    );
}
