import { DEFAULT_HORIZONTAL_PADDING } from "@/shared/components/HorizontalPadding";
import { GET_ALBUM_BY_ID_QUERY } from "@/shared/queries/GET_ALBUM_BY_ID_QUERY";
import { useCommonStore } from "@/store/common.store";
import { Album, Mutation } from "@/types/graphql";
import { useMutation } from "@apollo/client";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { HStack, Icon, IconButton } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { LIKE_MUTATION } from "../track/TrackMenuScreen";

export interface IAlbumActionsProp {
    album: Album;
}

export default function AlbumActions({ album }: IAlbumActionsProp) {
    const [doLike] = useMutation<Mutation>(LIKE_MUTATION, {
        refetchQueries: [GET_ALBUM_BY_ID_QUERY],
    });
    const currentUser = useCommonStore(state => state.currentUser);
    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);
    const nav = useNavigation();

    const like = () => {
        doLike({
            variables: {
                likeableId: album.id,
                likeableType: "ALBUM",
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

    const onOpenMenu = () => {
        nav.navigate("AlbumMenu", { albumId: album.id });
    };

    return currentUser ? (
        <HStack space={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
            <TouchableOpacity onPress={like}>
                <Icon
                    size="sm"
                    color="primary.400"
                    as={
                        album.isLiked ? (
                            <Ionicons name="heart" />
                        ) : (
                            <Ionicons name="heart-outline" />
                        )
                    }
                ></Icon>
            </TouchableOpacity>

            <IconButton
                variant="ghost"
                onPress={onOpenMenu}
                icon={
                    <Icon
                        name="ellipsis-horizontal-outline"
                        size="xs"
                        color="white"
                        as={Ionicons}
                    />
                }
            />
        </HStack>
    ) : null;
}
