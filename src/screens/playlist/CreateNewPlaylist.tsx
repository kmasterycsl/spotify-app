import HorizontalPadding from "@/shared/components/HorizontalPadding";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_LIKEABLES_QUERY } from "@/shared/queries/GET_LIKEABLES_QUERY";
import { useCommonStore } from "@/store/common.store";
import { Mutation } from "@/types/graphql";
import { gql, useMutation } from "@apollo/client";
import { Button, Input, Text } from "native-base";
import React, { useState } from "react";
import { Modal, SafeAreaView } from "react-native";

interface CreateNewPlaylistProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const CREATE_PLAYLIST_MUTATION = gql`
    mutation createPlaylist($name: String!) {
        createPlaylist(name: $name) {
            name
        }
    }
`;

export default function CreateNewPlaylist({ visible, setVisible }: CreateNewPlaylistProps) {
    const [name, setName] = useState("");
    const [doCreate] = useMutation<Mutation>(CREATE_PLAYLIST_MUTATION, {
        refetchQueries: [GET_LIKEABLES_QUERY],
    });
    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);

    const onSubmit = () => {
        const created = doCreate({
            variables: {
                name,
            },
        });

        created.then(res => {
            setVisible(false);
            actionSetToastMessage({
                title: "Created",
                status: "info",
            });
        });

        created.catch(e => {
            actionSetToastMessage({
                title: e.message,
                status: "error",
            });
            console.error(e);
        });
    };

    return (
        <Modal animationType="slide" visible={visible} onRequestClose={() => setVisible(false)}>
            <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
                <HorizontalPadding>
                    <Text fontSize="xl" fontWeight="600">
                        Artists
                    </Text>
                </HorizontalPadding>
                <VerticalPadding />
                <Input onChangeText={setName}></Input>
                <Button onPress={onSubmit}>Create</Button>
            </SafeAreaView>
        </Modal>
    );
}
