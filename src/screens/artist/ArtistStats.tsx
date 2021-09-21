import { useMutation } from "@apollo/client";
import { Button, HStack, Text, VStack } from "native-base";
import React from "react";
import HorizontalPadding from "@/shared/components/HorizontalPadding";
import { LIKE_MUTATION } from "@/shared/components/TrackMenu";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_ARTIST_BY_ID_QUERY } from "@/shared/queries/GET_ARTIST_BY_ID_QUERY";
import { useCommonStore } from "@/store/common.store";
import { Artist, Mutation } from "@/types/graphql";

export interface IArtistStatsProps {
    artist: Artist;
}

export default function ArtistStats({ artist }: IArtistStatsProps) {
    const [doLike] = useMutation<Mutation>(LIKE_MUTATION, {
        refetchQueries: [GET_ARTIST_BY_ID_QUERY],
    });
    const actionSetToastMessage = useCommonStore(store => store.actionSetToastMessage);
    const currentUser = useCommonStore(state => state.currentUser);

    const like = () => {
        const liked = doLike({
            variables: {
                likeableId: artist.id,
                likeableType: "ARTIST",
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

    return (
        <VerticalPadding>
            <HStack justifyContent="space-between">
                <VStack space={2}>
                    <Text fontSize="sm" fontWeight="300">
                        {Math.floor(Math.random() * 10000)} monthly listeners
                    </Text>
                    {currentUser && (
                        <Button size="xs" alignSelf="flex-start" onPress={like} variant={"outline"}>
                            {artist.isLiked ? "Unfollow" : "Follow"}
                        </Button>
                    )}
                </VStack>
            </HStack>
        </VerticalPadding>
    );
}
