import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeAreaView from "../shared/components/SafeAreaView";
import { gql, useQuery } from "@apollo/client";
import { Likeable, Query, Track, TrackEdge } from "../types/graphql";
import { useCommonStore } from "../store/common.store";
import { RenderItemParams } from "react-native-draggable-flatlist";
import TracksListItem from "../shared/components/TracksListItem";
import VerticalPadding from "../shared/components/VerticalPadding";
import InfiniteFlatList from "../shared/components/InfiniteFlatlist";
import { Text } from "native-base";

export const GET_LIKEABLES_QUERY = gql`
    query getLikeables($page: Int!, $limit: Int = 15) {
        likeables(page: $page, limit: $limit) {
            items {
                likeableId
                likeableType
                album {
                    name
                }
                track {
                    name
                }
                artist {
                    name
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
