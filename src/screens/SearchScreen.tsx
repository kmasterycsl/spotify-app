import HorizontalPadding, {
    _DEFAULT_HORIZONTAL_PADDING,
} from "@/shared/components/HorizontalPadding";
import InfiniteFlatList from "@/shared/components/InfiniteFlatlist";
import PlaylistCardListItem from "@/shared/components/PlaylistCardListItem";
import SafeAreaView from "@/shared/components/SafeAreaView";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_GENRE_BY_ID_QUERY } from "@/shared/queries/GET_GENRE_BY_ID_QUERY";
import { ImageMeta, PaginationMeta, Playlist, Query } from "@/types/graphql";
import { RootStackParamList } from "@/types/routes.types";
import { useQuery } from "@apollo/client";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { HStack, Icon, IconButton, Text } from "native-base";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type GenreDetailScreenRouteProp = RouteProp<RootStackParamList, "GenreDetail">;

const screenWidth = Dimensions.get("screen").width;

export default function SearchScreen() {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    const { params } = useRoute<GenreDetailScreenRouteProp>();
    const [paginationMeta, setPaginationMeta] = useState<
        Pick<PaginationMeta, "currentPage" | "totalPages">
    >({
        currentPage: 1,
        totalPages: Infinity,
    });
    const [loading, setLoading] = useState(false);
    const { data, refetch, fetchMore } = useQuery<Query>(GET_GENRE_BY_ID_QUERY, {
        variables: {
            id: params.genreId,
            page: 1,
        },
    });

    const goToPlaylist = (playlist: Playlist) => {
        nav.navigate("PlaylistDetail", { playlistId: playlist.id });
    };

    const renderItem = (params: RenderItemParams<Playlist>) => (
        <PlaylistCardListItem
            onPress={() => goToPlaylist(params.item)}
            playlist={params.item}
            style={{
                width: screenWidth / 2 - _DEFAULT_HORIZONTAL_PADDING * 2,
            }}
        />
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
            setPaginationMeta(data.genre.playlists.pageInfo);
        });
        fetched.finally(() => {
            setLoading(false);
        });
        return fetched;
    };

    return data?.genre ? (
        <SafeAreaView style={{ flex: 1 }}>
            <HStack>
                <IconButton
                    hitSlop={10}
                    variant="ghost"
                    onPress={nav.goBack}
                    borderRadius={100}
                    icon={
                        <Icon
                            size="sm"
                            color="gray.400"
                            as={<Ionicons name="chevron-back-outline" />}
                        ></Icon>
                    }
                />
            </HStack>
            <InfiniteFlatList
                data={data?.genre?.playlists?.items || []}
                renderItem={renderItem}
                onLoadMore={onLoadMore}
                numColumns={2}
                isLoading={loading}
                isFinished={false}
                keyExtractor={playlist => playlist.id}
            />
        </SafeAreaView>
    ) : null;
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 170,
    },
});
