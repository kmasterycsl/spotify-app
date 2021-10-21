import useDebounce from "@/hooks/useDebounce";
import AlbumListItem from "@/shared/components/AlbumListItem";
import ArtistListItem from "@/shared/components/ArtistListItem";
import Empty from "@/shared/components/Empty";
import HorizontalPadding from "@/shared/components/HorizontalPadding";
import InfiniteFlatList from "@/shared/components/InfiniteFlatlist";
import PlaylistListItem from "@/shared/components/PlaylistListItem";
import SafeAreaView from "@/shared/components/SafeAreaView";
import TracksListItem from "@/shared/components/TrackListItem";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_ALBUMS_QUERY } from "@/shared/queries/GET_ALBUMS_QUERY";
import { GET_ARTISTS_QUERY } from "@/shared/queries/GET_ARTISTS_QUERY";
import { GET_PLAYLISTS_QUERY } from "@/shared/queries/GET_PLAYLISTS_QUERY";
import { GET_TRACKS_QUERY } from "@/shared/queries/GET_TRACKS_QUERY";
import { Album, Artist, PaginationMeta, Playlist, Query } from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Badge, Box, HStack, Icon, Input, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const screenWidth = Dimensions.get("screen").width;

type SEARCH_TYPE = "Tracks" | "Playlists" | "Albums" | "Artists";
const SEARCH_TYPES: SEARCH_TYPE[] = ["Tracks", "Playlists", "Albums", "Artists"];

export default function SearchScreen() {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    const [loading, setLoading] = useState(false);
    const [activedType, setActivedType] = useState<SEARCH_TYPE>("Tracks");
    const [query, setQuery] = useState("");
    const [paginationMeta, setPaginationMeta] = useState<
        Pick<PaginationMeta, "currentPage" | "totalPages">
    >({
        currentPage: 1,
        totalPages: Infinity,
    });
    const debouncedQuery = useDebounce(query, 500);

    const [getTracks, { data: tracksData, fetchMore: fetchMoreTracks, loading: loadingTracks }] =
        useLazyQuery<Query>(GET_TRACKS_QUERY, {
            variables: {
                page: 1,
                limit: 20,
            },
        });

    const [
        getPlaylists,
        { data: playlistsData, fetchMore: fetchMorePlaylists, loading: loadingPlaylists },
    ] = useLazyQuery<Query>(GET_PLAYLISTS_QUERY, {
        variables: {
            page: 1,
            limit: 20,
        },
    });

    const [getAlbums, { data: albumsData, fetchMore: fetchMoreAlbums, loading: loadingAlbums }] =
        useLazyQuery<Query>(GET_ALBUMS_QUERY, {
            variables: {
                page: 1,
                limit: 20,
            },
        });

    const [
        getArtists,
        { data: artistsData, fetchMore: fetchMoreArtists, loading: loadingArtists },
    ] = useLazyQuery<Query>(GET_ARTISTS_QUERY, {
        variables: {
            page: 1,
            limit: 20,
        },
    });

    useEffect(() => {
        setPaginationMeta({
            currentPage: 1,
            totalPages: Infinity,
        });
    }, [activedType]);

    useEffect(() => {
        if (!debouncedQuery) return;
        switch (activedType) {
            case "Tracks":
                getTracks({
                    variables: {
                        query: debouncedQuery,
                    },
                });
                break;
            case "Playlists":
                getPlaylists({
                    variables: {
                        query: debouncedQuery,
                    },
                });
                break;
            case "Albums":
                getAlbums({
                    variables: {
                        query: debouncedQuery,
                    },
                });
                break;
            case "Artists":
                getArtists({
                    variables: {
                        query: debouncedQuery,
                    },
                });
                break;
        }
    }, [debouncedQuery, activedType]);

    const onChangeQuery = (q: string) => {
        setQuery(q?.trim());
    };

    const onCancel = () => {
        nav.goBack();
    };

    const onChangeType = (type: SEARCH_TYPE) => {
        setActivedType(type);
    };

    const onLoadMore = () => {
        if (loading) return;
        if (paginationMeta.currentPage >= paginationMeta.totalPages) return;
        setLoading(true);
        let fetched;
        switch (activedType) {
            case "Tracks":
                if (!fetchMoreTracks) return;
                fetched = fetchMoreTracks({
                    variables: {
                        page: paginationMeta.currentPage + 1,
                    },
                }).then(({ data }) => {
                    setPaginationMeta(data.tracks.pageInfo);
                });
                break;
            case "Playlists":
                if (!fetchMorePlaylists) return;
                fetched = fetchMorePlaylists({
                    variables: {
                        page: paginationMeta.currentPage + 1,
                    },
                }).then(({ data }) => {
                    setPaginationMeta(data.playlists.pageInfo);
                });
                break;
            case "Albums":
                if (!fetchMoreAlbums) return;
                fetched = fetchMoreAlbums({
                    variables: {
                        page: paginationMeta.currentPage + 1,
                    },
                }).then(({ data }) => {
                    setPaginationMeta(data.albums.pageInfo);
                });
                break;
            case "Artists":
                if (!fetchMoreArtists) return;
                fetched = fetchMoreArtists({
                    variables: {
                        page: paginationMeta.currentPage + 1,
                    },
                }).then(({ data }) => {
                    setPaginationMeta(data.artists.pageInfo);
                });
                break;
        }
        fetched?.finally(() => {
            setLoading(false);
        });
        return fetched;
    };

    const goToAlbum = (album: Album) => {
        nav.navigate("AlbumDetail", { albumId: album.id });
    };

    const goToArtist = (artist: Artist) => {
        nav.navigate("ArtistDetail", { artistId: artist.id });
    };

    const goToPlaylist = (playlist: Playlist) => {
        nav.navigate("PlaylistDetail", { playlistId: playlist.id });
    };

    const renderItem = (params: RenderItemParams<any>) => {
        return (
            <HorizontalPadding>
                {activedType === "Tracks" && (
                    <TouchableOpacity onPress={() => goToAlbum(params.item.album)}>
                        <TracksListItem showType hideMenu track={params.item} />
                    </TouchableOpacity>
                )}
                {activedType === "Playlists" && (
                    <TouchableOpacity onPress={() => goToPlaylist(params.item)}>
                        <PlaylistListItem playlist={params.item} />
                    </TouchableOpacity>
                )}
                {activedType === "Albums" && (
                    <TouchableOpacity onPress={() => goToAlbum(params.item)}>
                        <AlbumListItem album={params.item} />
                    </TouchableOpacity>
                )}
                {activedType === "Artists" && (
                    <TouchableOpacity onPress={() => goToArtist(params.item)}>
                        <ArtistListItem artist={params.item} />
                    </TouchableOpacity>
                )}
                <VerticalPadding />
            </HorizontalPadding>
        );
    };

    const items: () => any[] = () => {
        switch (activedType) {
            case "Tracks":
                return tracksData?.tracks?.items || [];
            case "Playlists":
                return playlistsData?.playlists?.items || [];
            case "Albums":
                return albumsData?.albums?.items || [];
            case "Artists":
                return artistsData?.artists?.items || [];
        }
    };

    const isLoading: () => boolean = () => {
        switch (activedType) {
            case "Tracks":
                return loadingTracks;
            case "Playlists":
                return loadingPlaylists;
            case "Albums":
                return loadingAlbums;
            case "Artists":
                return loadingArtists;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HorizontalPadding>
                <HStack alignItems="center">
                    <TouchableOpacity style={{ flex: 1 }}>
                        <Input
                            InputLeftElement={
                                <Icon
                                    as={<MaterialIcons name="search" />}
                                    size={6}
                                    ml="2"
                                    color="muted.400"
                                    mr={2}
                                />
                            }
                            autoFocus
                            onChangeText={onChangeQuery}
                            borderRadius={5}
                            py={3}
                            placeholder="Artists, tracks or playlists"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onCancel}>
                        <Box pl={2}>
                            <Text>Cancel</Text>
                        </Box>
                    </TouchableOpacity>
                </HStack>
            </HorizontalPadding>
            <HorizontalPadding>
                <HStack mt={2} mb={2}>
                    {SEARCH_TYPES.map(type => (
                        <TouchableOpacity key={type} onPress={() => onChangeType(type)}>
                            <Badge
                                colorScheme="primary"
                                borderRadius="50"
                                variant={type === activedType ? "solid" : "outline"}
                                mr={2}
                                px={2}
                                py={1}
                            >
                                {type}
                            </Badge>
                        </TouchableOpacity>
                    ))}
                </HStack>
            </HorizontalPadding>

            {items().length > 0 && (
                <InfiniteFlatList
                    data={items()}
                    renderItem={renderItem}
                    onLoadMore={onLoadMore}
                    isLoading={loading}
                    isFinished={false}
                    keyExtractor={item => item.id}
                />
            )}

            {!isLoading() && items().length === 0 && debouncedQuery !== "" && (
                <Box mt={5}>
                    <Empty text={`No result matchs: "${debouncedQuery}"`} />
                </Box>
            )}
        </SafeAreaView>
    );
}
