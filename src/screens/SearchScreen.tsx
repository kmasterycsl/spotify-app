import HorizontalPadding from "@/shared/components/HorizontalPadding";
import InfiniteFlatList from "@/shared/components/InfiniteFlatlist";
import SafeAreaView from "@/shared/components/SafeAreaView";
import useDebounce from "@/hooks/useDebounce";
import TracksListItem from "@/shared/components/TrackListItem";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_TRACKS_QUERY } from "@/shared/queries/GET_TRACKS_QUERY";
import { PaginationMeta, Query, Track } from "@/types/graphql";
import { useLazyQuery, useQuery } from "@apollo/client";
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

    useEffect(() => {
        getTracks({
            variables: {
                query: debouncedQuery,
            },
        });
    }, [debouncedQuery]);

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
        if (!fetchMoreTracks) return;
        const fetched = fetchMoreTracks({
            variables: {
                page: paginationMeta.currentPage + 1,
            },
        });
        fetched.then(({ data }) => {
            setPaginationMeta(data.tracks.pageInfo);
        });
        fetched.finally(() => {
            setLoading(false);
        });
        return fetched;
    };

    const renderItem = (params: RenderItemParams<Track>) => {
        return (
            <TouchableOpacity>
                <TracksListItem showType hideMenu track={params.item} />
            </TouchableOpacity>
        );
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
            <InfiniteFlatList
                data={tracksData?.tracks?.items || []}
                renderItem={renderItem}
                onLoadMore={onLoadMore}
                isLoading={loading}
                isFinished={false}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}
