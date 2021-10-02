import HorizontalPadding, {
    _DEFAULT_HORIZONTAL_PADDING,
} from "@/shared/components/HorizontalPadding";
import PlaylistCardListItem from "@/shared/components/PlaylistCardListItem";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_HOME_GENRES_QUERY } from "@/shared/queries/GET_HOME_GENRES_QUERY";
import { Genre, Playlist, Query } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { HStack, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("screen").width;

export default function HomeGenres() {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    const { data, refetch, fetchMore } = useQuery<Query>(GET_HOME_GENRES_QUERY, {
        variables: {
            page: 1,
            limit: 5,
        },
    });

    const goToGenre = (genre: Genre) => () => {
        nav.navigate("GenreDetail", { genreId: genre.id });
    };

    const goToPlaylist = (playlist: Playlist) => {
        nav.navigate("PlaylistDetail", { playlistId: playlist.id });
    };

    return data?.genres ? (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <HStack flexWrap="wrap" justifyContent="space-between">
                {data?.genres.items.map(genre => (
                    <VStack key={genre.id}>
                        <TouchableOpacity key={genre.id} onPress={goToGenre(genre)}>
                            <HorizontalPadding>
                                <Text fontSize="2xl" fontWeight="500" numberOfLines={1}>
                                    {genre.name}
                                </Text>
                            </HorizontalPadding>
                        </TouchableOpacity>
                        <VerticalPadding />
                        <ScrollView
                            horizontal
                            contentContainerStyle={{
                                alignItems: "flex-start",
                                marginLeft: _DEFAULT_HORIZONTAL_PADDING,
                                marginBottom: _DEFAULT_HORIZONTAL_PADDING * 1.5,
                            }}
                        >
                            {genre.playlists.items.map(playlist => (
                                <PlaylistCardListItem
                                    onPress={() => goToPlaylist(playlist)}
                                    key={playlist.id}
                                    playlist={playlist}
                                    style={{
                                        width: screenWidth / 2.5,
                                        marginRight: _DEFAULT_HORIZONTAL_PADDING,
                                    }}
                                />
                            ))}
                        </ScrollView>
                    </VStack>
                ))}
            </HStack>
        </ScrollView>
    ) : null;
}
