import useDebounce from "@/hooks/useDebounce";
import HorizontalPadding from "@/shared/components/HorizontalPadding";
import InfiniteFlatList from "@/shared/components/InfiniteFlatlist";
import PlaylistListItem from "@/shared/components/PlaylistListItem";
import SafeAreaView from "@/shared/components/SafeAreaView";
import TracksListItem from "@/shared/components/TrackListItem";
import { GET_PLAYLISTS_QUERY } from "@/shared/queries/GET_PLAYLISTS_QUERY";
import { GET_TRACKS_QUERY } from "@/shared/queries/GET_TRACKS_QUERY";
import { PaginationMeta, Query } from "@/types/graphql";
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

    const [getTracks, { data: tracksData, fetchMore: fetchMoreTracks }] = useLazyQuery<Query>(
        GET_TRACKS_QUERY,
        {
            variables: {
                page: 1,
                limit: 20,
            },
        }
    );

    const [getPlaylists, { data: playlistsData, fetchMore: fetchMorePlaylists }] =
        useLazyQuery<Query>(GET_PLAYLISTS_QUERY, {
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
        }
    }, [debouncedQuery, activedType]);

    const onChangeQuery = (q: string) => {
        setQuery(q);
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
        }
        fetched?.finally(() => {
            setLoading(false);
        });
        return fetched;
    };

    const renderItem = (params: RenderItemParams<any>) => {
        return (
            <>
                {activedType === "Tracks" && (
                    <TouchableOpacity>
                        <TracksListItem showType hideMenu track={params.item} />
                    </TouchableOpacity>
                )}
                {activedType === "Playlists" && (
                    <TouchableOpacity>
                        <PlaylistListItem playlist={params.item} />
                    </TouchableOpacity>
                )}
            </>
        );
    };

    const items: () => any[] = () => {
        switch (activedType) {
            case "Tracks":
                return tracksData?.tracks?.items || [];
            case "Playlists":
                return playlistsData?.playlists?.items || [];
        }

        return [];
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
                <HStack mt={2}>
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
            <Text>{items().length}</Text>
            <InfiniteFlatList
                data={items()}
                renderItem={renderItem}
                onLoadMore={onLoadMore}
                isLoading={loading}
                isFinished={false}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}
