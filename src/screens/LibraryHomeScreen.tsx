import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import { Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AlbumListItem, { AlbumListItemFragment } from "../shared/components/AlbumListItem";
import ArtistListItem, { ArtistListItemFragment } from "../shared/components/ArtistListItem";
import InfiniteFlatList from "../shared/components/InfiniteFlatlist";
import SafeAreaView from "../shared/components/SafeAreaView";
import TracksListItem, { TrackListItemFragment } from "../shared/components/TrackListItem";
import VerticalPadding from "../shared/components/VerticalPadding";
import { Likeable, Query, TrackEdge } from "../types/graphql";

export const GET_LIKEABLES_QUERY = gql`
    ${AlbumListItemFragment}
    ${TrackListItemFragment}
    ${ArtistListItemFragment}
    query getLikeables($page: Int!, $limit: Int = 15) {
        likeables(page: $page, limit: $limit) {
            items {
                likeableId
                likeableType
                album {
                    ...AlbumListItemFragment
                }
                track {
                    ...TrackListItemFragment
                }
                artist {
                    ...ArtistListItemFragment
                }
            }
            meta {
                itemCount
                totalItems
                itemsPerPage
                totalPages
                currentPage
            }
        }
    }
`;

export default function LibraryHomeScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [paginationMeta, setPaginationMeta] = useState<
        Pick<TrackEdge, "currentPage" | "totalPages">
    >({
        currentPage: 1,
        totalPages: Infinity,
    });
    const [loading, setLoading] = useState(false);

    const { data, refetch, fetchMore } = useQuery<Query>(GET_LIKEABLES_QUERY, {
        variables: {
            page: 1,
        },
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            refetch();
        });

        return unsubscribe;
    }, []);

    const onLoadMore = () => {
        if (loading) return;
        if (paginationMeta.currentPage >= paginationMeta.totalPages) return;
        setLoading(true);
        const fetched = fetchMore({
            variables: {
                page: paginationMeta.currentPage + 1,
            },
        });
        fetched.then(({ data }) => {
            setPaginationMeta(data.likeables.meta);
        });
        fetched.finally(() => {
            setLoading(false);
        });
        return fetched;
    };

    const renderItem = (params: RenderItemParams<Likeable>) => (
        <TouchableOpacity>
            <Text>{params.item.likeableType}</Text>
            {params.item.track && <TracksListItem track={params.item.track} />}
            {params.item.album && <AlbumListItem album={params.item.album} />}
            {params.item.artist && <ArtistListItem artist={params.item.artist} />}
            <VerticalPadding />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            <InfiniteFlatList
                data={data?.likeables?.items || []}
                renderItem={renderItem}
                onLoadMore={onLoadMore}
                isLoading={loading}
                isFinished={paginationMeta.currentPage >= paginationMeta.totalPages}
                keyExtractor={item => item.likeableType + item.likeableId}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, position: "relative" },
});
