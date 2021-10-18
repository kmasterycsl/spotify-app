import AlbumListItem from "@/shared/components/AlbumListItem";
import ArtistListItem from "@/shared/components/ArtistListItem";
import HorizontalPadding, {
    DEFAULT_HORIZONTAL_PADDING,
} from "@/shared/components/HorizontalPadding";
import InfiniteFlatList from "@/shared/components/InfiniteFlatlist";
import PlaylistListItem from "@/shared/components/PlaylistListItem";
import SafeAreaView from "@/shared/components/SafeAreaView";
import TracksListItem from "@/shared/components/TrackListItem";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_LIKEABLES_QUERY } from "@/shared/queries/GET_LIKEABLES_QUERY";
import { Album, Artist, Likeable, PaginationMeta, Playlist, Query } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { HStack, Icon, IconButton, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";

export default function LibraryHomeScreen() {
    const navigation = useNavigation();
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

    const goToPlaylist = (playlist: Playlist) => {
        navigation.navigate("PlaylistDetail", { playlistId: playlist.id });
    };

    const goToCreatePlaylist = () => {
        navigation.navigate("CreatePlaylist");
    };

    const renderItem = (params: RenderItemParams<Likeable>) => (
        <HorizontalPadding>
            {params.item.track && (
                <TouchableOpacity onPress={() => goToAlbum(params.item.track?.album!)}>
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
        </HorizontalPadding>
    );

    return (
        <SafeAreaView style={styles.container}>
            <HStack
                alignItems="center"
                justifyContent="space-between"
                pl={DEFAULT_HORIZONTAL_PADDING}
            >
                <Text fontSize="2xl">Your library</Text>
                <IconButton
                    size="sm"
                    variant="ghost"
                    onPress={goToCreatePlaylist}
                    icon={<Icon color="gray.400" as={<Ionicons name="add-outline" />}></Icon>}
                />
            </HStack>
            <VerticalPadding />
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
