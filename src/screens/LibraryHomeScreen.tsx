import VerticalPadding from "@/shared/components/VerticalPadding";
import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import { Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AlbumListItem, { AlbumListItemFragment } from "@/shared/components/AlbumListItem";
import ArtistListItem, { ArtistListItemFragment } from "@/shared/components/ArtistListItem";
import InfiniteFlatList from "@/shared/components/InfiniteFlatlist";
import SafeAreaView from "@/shared/components/SafeAreaView";
import TracksListItem, { TrackListItemFragment } from "@/shared/components/TrackListItem";
import { Album, Artist, Likeable, PaginationMeta, Query } from "@/types/graphql";
import { PaginationFragment } from "@/shared/fragments/pagination.fragment";
import { usePlayerStore } from "@/store/player.store";
import { SoundMetaFragment } from "@/shared/fragments/sound-meta.fragment";

export const GET_LIKEABLES_QUERY = gql`
    ${AlbumListItemFragment}
    ${TrackListItemFragment}
    ${ArtistListItemFragment}
    ${SoundMetaFragment}
    ${PaginationFragment}
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
                    sound {
                        meta {
                            ...SoundMetaFragment
                        }
                    }
                }
                artist {
                    ...ArtistListItemFragment
                }
            }
            pageInfo {
                ...PaginationFragment
            }
        }
    }
`;

export default function LibraryHomeScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const actionPlay = usePlayerStore(store => store.actionPlay);
    const [paginationMeta, setPaginationMeta] = useState<
        Pick<PaginationMeta, "currentPage" | "totalPages">
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
            setPaginationMeta(data.likeables.pageInfo);
        });
        fetched.finally(() => {
            setLoading(false);
        });
        return fetched;
    };

    const goToAlbum = (album: Album) => {
        navigation.navigate("AlbumDetail", { albumId: album.id });
    };

    const goToArtist = (artist: Artist) => {
        navigation.navigate("ArtistDetail", { artistId: artist.id });
    };

    const renderItem = (params: RenderItemParams<Likeable>) => (
        <>
            {params.item.track && (
                <TouchableOpacity onPress={() => actionPlay(params.item.track!)}>
                    <TracksListItem showType hideMenu track={params.item.track} />
                </TouchableOpacity>
            )}
            {params.item.album && (
                <TouchableOpacity onPress={() => goToAlbum(params.item.album!)}>
                    <AlbumListItem album={params.item.album} />
                </TouchableOpacity>
            )}
            {params.item.artist && (
                <TouchableOpacity onPress={() => goToArtist(params.item.artist!)}>
                    <ArtistListItem artist={params.item.artist} />
                </TouchableOpacity>
            )}
            <VerticalPadding />
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <InfiniteFlatList
                data={data?.likeables?.items || []}
                renderItem={renderItem}
                onLoadMore={onLoadMore}
                isLoading={loading}
                isFinished={false}
                keyExtractor={item => item.likeableType + item.likeableId}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, position: "relative" },
});
