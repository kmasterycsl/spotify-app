import AlbumListItem from "@/shared/components/AlbumListItem";
import ArtistListItem from "@/shared/components/ArtistListItem";
import PlaylistListItem from "@/shared/components/PlaylistListItem";
import TracksListItem from "@/shared/components/TrackListItem";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_LIKEABLES_QUERY } from "@/shared/queries/GET_LIKEABLES_QUERY";
import { Artist, Likeable, PaginationMeta, Playlist, Query } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import { Box, HStack } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function HomeLikeables() {
    const [paginationMeta, setPaginationMeta] = useState<
        Pick<PaginationMeta, "currentPage" | "totalPages">
    >({
        currentPage: 1,
        totalPages: Infinity,
    });
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const { data, fetchMore } = useQuery<Query>(GET_LIKEABLES_QUERY, {
        variables: {
            page: 1,
            limit: 6,
        },
    });

    const renderItem = (item: Likeable) => (
        <Box width="50%" key={item.likeableType + item.likeableId}>
            {item.track && (
                <TouchableOpacity onPress={() => goToAlbum(item.track?.album.id!)}>
                    <TracksListItem hideArtistName showType hideMenu track={item.track} />
                </TouchableOpacity>
            )}
            {item.album && (
                <TouchableOpacity onPress={() => goToAlbum(item.album?.id!)}>
                    <AlbumListItem hideSubtitle album={item.album} />
                </TouchableOpacity>
            )}
            {item.artist && (
                <TouchableOpacity onPress={() => goToArtist(item.artist!)}>
                    <ArtistListItem hideSubtitle artist={item.artist} />
                </TouchableOpacity>
            )}
            {item.playlist && (
                <TouchableOpacity onPress={() => goToPlaylist(item.playlist!)}>
                    <PlaylistListItem hideSubtitle playlist={item.playlist} />
                </TouchableOpacity>
            )}
            <VerticalPadding />
        </Box>
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

    const goToAlbum = (albumId: string) => {
        navigation.navigate("AlbumDetail", { albumId });
    };

    const goToArtist = (artist: Artist) => {
        navigation.navigate("ArtistDetail", { artistId: artist.id });
    };

    const goToPlaylist = (playlist: Playlist) => {
        navigation.navigate("PlaylistDetail", { playlistId: playlist.id });
    };

    return <HStack flexWrap="wrap">{(data?.likeables?.items || []).map(renderItem)}</HStack>;
}
