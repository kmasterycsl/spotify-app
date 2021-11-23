import AlbumListItem from "@/shared/components/AlbumListItem";
import ArtistListItem from "@/shared/components/ArtistListItem";
import Empty from "@/shared/components/Empty";
import HorizontalPadding, {
    DEFAULT_HORIZONTAL_PADDING,
} from "@/shared/components/HorizontalPadding";
import InfiniteFlatList from "@/shared/components/InfiniteFlatlist";
import PlaylistListItem from "@/shared/components/PlaylistListItem";
import SafeAreaView from "@/shared/components/SafeAreaView";
import TracksListItem from "@/shared/components/TrackListItem";
import TypesList, { OBJ_TYPE } from "@/shared/components/TypesList";
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
    const [activedType, setActivedType] = useState<OBJ_TYPE>("TRACK");

    const { data, refetch, fetchMore } = useQuery<Query>(GET_LIKEABLES_QUERY, {
        variables: {
            page: 1,
            likeableType: activedType,
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

    const renderItem = ({ item }: { item: Likeable }) => (
        <HorizontalPadding>
            {item.track && (
                <TouchableOpacity onPress={() => goToAlbum(item.track?.album!)}>
                    <TracksListItem hideMenu track={item.track} />
                </TouchableOpacity>
            )}
            {item.album && (
                <TouchableOpacity onPress={() => goToAlbum(item.album!)}>
                    <AlbumListItem album={item.album} />
                </TouchableOpacity>
            )}
            {item.artist && (
                <TouchableOpacity onPress={() => goToArtist(item.artist!)}>
                    <ArtistListItem artist={item.artist} />
                </TouchableOpacity>
            )}
            {item.playlist && (
                <TouchableOpacity onPress={() => goToPlaylist(item.playlist!)}>
                    <PlaylistListItem playlist={item.playlist} />
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

            <HorizontalPadding>
                <VerticalPadding>
                    <TypesList value={activedType} onChange={setActivedType} />
                </VerticalPadding>
            </HorizontalPadding>

            {!loading && data?.likeables?.items?.length === 0 && <Empty text="Nothing here." />}

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
