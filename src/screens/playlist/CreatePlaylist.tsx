import HorizontalPadding from "@/shared/components/HorizontalPadding";
import SafeAreaView from "@/shared/components/SafeAreaView";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_LIKEABLES_QUERY } from "@/shared/queries/GET_LIKEABLES_QUERY";
import { GET_OWN_PLAYLISTS_QUERY } from "@/shared/queries/GET_OWN_PLAYLISTS_QUERY";
import { useCommonStore } from "@/store/common.store";
import { Mutation } from "@/types/graphql";
import { gql, useMutation } from "@apollo/client";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { Box, Button, Icon, IconButton, Input, VStack } from "native-base";
import React, { useState } from "react";

export const CREATE_PLAYLIST_MUTATION = gql`
    mutation createPlaylist($name: String!) {
        createPlaylist(name: $name) {
            name
        }
    }
`;

export default function CreatePlaylist() {
    const [name, setName] = useState("");
    const [doCreate] = useMutation<Mutation>(CREATE_PLAYLIST_MUTATION, {
        refetchQueries: [GET_LIKEABLES_QUERY, GET_OWN_PLAYLISTS_QUERY],
    });
    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);
    const nav = useNavigation();

    const onSubmit = () => {
        if (!name) return;
        const created = doCreate({
            variables: {
                name,
            },
        });

        created.then(res => {
            nav.goBack();
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
        <SafeAreaView style={{ flex: 1 }}>
            <IconButton
                alignSelf="flex-end"
                onPress={() => nav.goBack()}
                icon={<Icon name="close-outline" as={Ionicons} color="white"></Icon>}
            />
            <VStack justifyContent="center" flexGrow={1}>
                <HorizontalPadding>
                    <Input
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
                        Create
                    </Button>
                </HorizontalPadding>
            </VStack>
            <Box></Box>
        </SafeAreaView>
    );
}
