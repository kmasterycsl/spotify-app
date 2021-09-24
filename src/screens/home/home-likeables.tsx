import AlbumListItem from "@/shared/components/AlbumListItem";
import ArtistListItem from "@/shared/components/ArtistListItem";
import InfiniteFlatList from "@/shared/components/InfiniteFlatlist";
import PlaylistListItem from "@/shared/components/PlaylistListItem";
import TracksListItem from "@/shared/components/TrackListItem";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_LIKEABLES_QUERY } from "@/shared/queries/GET_LIKEABLES_QUERY";
import { usePlayerStore } from "@/store/player.store";
import { Album, Artist, Likeable, PaginationMeta, Playlist, Query } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeLikeables() {
    const [paginationMeta, setPaginationMeta] = useState<
        Pick<PaginationMeta, "currentPage" | "totalPages">
    >({
        currentPage: 1,
        totalPages: Infinity,
    });
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const actionPlay = usePlayerStore(store => store.actionPlay);

    const [loading, setLoading] = useState(false);

    const { data, refetch, fetchMore } = useQuery<Query>(GET_LIKEABLES_QUERY, {
        variables: {
            page: 1,
            limit: 6,
        },
    });

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
            {params.item.playlist && (
                <TouchableOpacity onPress={() => goToPlaylist(params.item.playlist!)}>
                    <PlaylistListItem playlist={params.item.playlist} />
                </TouchableOpacity>
            )}
            <VerticalPadding />
        </>
    );

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

    const goToPlaylist = (playlist: Playlist) => {
        navigation.navigate("PlaylistDetail", { playlistId: playlist.id });
    };

    return (
        <InfiniteFlatList
            data={data?.likeables?.items || []}
            renderItem={renderItem}
            onLoadMore={onLoadMore}
            numColumns={2}
            isLoading={loading}
            isFinished={false}
            keyExtractor={item => item.likeableType + item.likeableId}
        />
    );
}