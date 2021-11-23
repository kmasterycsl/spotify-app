import useDebounce from "@/hooks/useDebounce";
import AlbumListItem from "@/shared/components/AlbumListItem";
import ArtistListItem from "@/shared/components/ArtistListItem";
import Empty from "@/shared/components/Empty";
import HorizontalPadding from "@/shared/components/HorizontalPadding";
import InfiniteFlatList from "@/shared/components/InfiniteFlatlist";
import PlaylistListItem from "@/shared/components/PlaylistListItem";
import SafeAreaView from "@/shared/components/SafeAreaView";
import TracksListItem from "@/shared/components/TrackListItem";
import TypesList from "@/shared/components/TypesList";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_ALBUMS_QUERY } from "@/shared/queries/GET_ALBUMS_QUERY";
import { GET_ARTISTS_QUERY } from "@/shared/queries/GET_ARTISTS_QUERY";
import { GET_PLAYLISTS_QUERY } from "@/shared/queries/GET_PLAYLISTS_QUERY";
import { GET_TRACKS_QUERY } from "@/shared/queries/GET_TRACKS_QUERY";
import { Album, Artist, PaginationMeta, Playlist, Query } from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Icon, IInputProps, Input, Text } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import type { OBJ_TYPE } from "../shared/components/TypesList";

type SEARCH_TYPE = OBJ_TYPE;

export default function SearchScreen() {
    const nav = useNavigation();
    const [loading, setLoading] = useState(false);
    const [activedType, setActivedType] = useState<SEARCH_TYPE>("TRACK");
    const [query, setQuery] = useState("");
    const [paginationMeta, setPaginationMeta] = useState<
        Pick<PaginationMeta, "currentPage" | "totalPages">
    >({
        currentPage: 1,
        totalPages: Infinity,
    });
    const debouncedQuery = useDebounce(query, 500);
    const inputRef = useRef<any>();

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
        inputRef?.current?.focus();
    }, []);

    useEffect(() => {
        setPaginationMeta({
            currentPage: 1,
            totalPages: Infinity,
        });
    }, [activedType]);

    useEffect(() => {
        if (!debouncedQuery) return;
        switch (activedType) {
            case "TRACK":
                getTracks({
                    variables: {
                        query: debouncedQuery,
                    },
                });
                break;
            case "PLAYLIST":
                getPlaylists({
                    variables: {
                        query: debouncedQuery,
                    },
                });
                break;
            case "ALBUM":
                getAlbums({
                    variables: {
                        query: debouncedQuery,
                    },
                });
                break;
            case "ARTIST":
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
            case "TRACK":
                if (!fetchMoreTracks) return;
                fetched = fetchMoreTracks({
                    variables: {
                        page: paginationMeta.currentPage + 1,
                    },
                }).then(({ data }) => {
                    setPaginationMeta(data.tracks.pageInfo);
                });
                break;
            case "PLAYLIST":
                if (!fetchMorePlaylists) return;
                fetched = fetchMorePlaylists({
                    variables: {
                        page: paginationMeta.currentPage + 1,
                    },
                }).then(({ data }) => {
                    setPaginationMeta(data.playlists.pageInfo);
                });
                break;
            case "ALBUM":
                if (!fetchMoreAlbums) return;
                fetched = fetchMoreAlbums({
                    variables: {
                        page: paginationMeta.currentPage + 1,
                    },
                }).then(({ data }) => {
                    setPaginationMeta(data.albums.pageInfo);
                });
                break;
            case "ARTIST":
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

    const renderItem = ({ item }: { item: any }) => {
        return (
            <HorizontalPadding>
                {activedType === "TRACK" && (
                    <TouchableOpacity onPress={() => goToAlbum(item.album)}>
                        <TracksListItem showType hideMenu track={item} />
                    </TouchableOpacity>
                )}
                {activedType === "PLAYLIST" && (
                    <TouchableOpacity onPress={() => goToPlaylist(item)}>
                        <PlaylistListItem playlist={item} />
                    </TouchableOpacity>
                )}
                {activedType === "ALBUM" && (
                    <TouchableOpacity onPress={() => goToAlbum(item)}>
                        <AlbumListItem album={item} />
                    </TouchableOpacity>
                )}
                {activedType === "ARTIST" && (
                    <TouchableOpacity onPress={() => goToArtist(item)}>
                        <ArtistListItem artist={item} />
                    </TouchableOpacity>
                )}
                <VerticalPadding />
            </HorizontalPadding>
        );
    };

    const items: () => any[] = () => {
        switch (activedType) {
            case "TRACK":
                return tracksData?.tracks?.items || [];
            case "PLAYLIST":
                return playlistsData?.playlists?.items || [];
            case "ALBUM":
                return albumsData?.albums?.items || [];
            case "ARTIST":
                return artistsData?.artists?.items || [];
        }
    };

    const isLoading: () => boolean = () => {
        switch (activedType) {
            case "TRACK":
                return loadingTracks;
            case "PLAYLIST":
                return loadingPlaylists;
            case "ALBUM":
                return loadingAlbums;
            case "ARTIST":
                return loadingArtists;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HorizontalPadding>
                <HStack alignItems="stretch">
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
                            ref={inputRef}
                            onChangeText={onChangeQuery}
                            borderRadius={5}
                            py={3}
                            placeholder="Artists, tracks or playlists"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onCancel}>
                        <Box pl={2} justifyContent="center" flexGrow={1}>
                            <Text>Cancel</Text>
                        </Box>
                    </TouchableOpacity>
                </HStack>
            </HorizontalPadding>
            <HorizontalPadding>
                <VerticalPadding>
                    <TypesList value={activedType} onChange={onChangeType} />
                </VerticalPadding>
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
