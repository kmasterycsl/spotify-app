import GenreListItem from "@/shared/components/GenreListItem";
import HorizontalPadding, {
    _DEFAULT_HORIZONTAL_PADDING,
} from "@/shared/components/HorizontalPadding";
import PlaylistCardListItem from "@/shared/components/PlaylistCardListItem";
import SafeAreaView from "@/shared/components/SafeAreaView";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_GENRES_QUERY } from "@/shared/queries/GET_GENRES_QUERY";
import { GET_HOME_GENRES_QUERY } from "@/shared/queries/GET_HOME_GENRES_QUERY";
import { Genre, Query } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { HStack, ScrollView, Text } from "native-base";
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
            limit: 10,
        },
    });

    const goToDetail = (genre: Genre) => () => {
        nav.navigate("GenreDetail", { genreId: genre.id });
    };

    return data?.genres ? (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <HStack flexWrap="wrap" justifyContent="space-between">
                    {data?.genres.map(genre => (
                        <TouchableOpacity key={genre.id} onPress={goToDetail(genre)}>
                            <HorizontalPadding>
                                <Text fontSize="2xl" fontWeight="500" numberOfLines={1}>
                                    {genre.name}
                                </Text>
                            </HorizontalPadding>
                            <VerticalPadding />
                            <ScrollView
                                horizontal
                                contentContainerStyle={{
                                    alignItems: "flex-start",
                                    marginLeft: _DEFAULT_HORIZONTAL_PADDING,
                                }}
                            >
                                {genre.playlists.items.map(playlist => (
                                    <PlaylistCardListItem
                                        onPress={() => {}}
                                        key={playlist.id}
                                        playlist={playlist}
                                        style={{
                                            width: screenWidth / 2.5,
                                            marginRight: _DEFAULT_HORIZONTAL_PADDING,
                                        }}
                                    />
                                ))}
                            </ScrollView>
                            <VerticalPadding />
                        </TouchableOpacity>
                    ))}
                </HStack>
            </ScrollView>
        </SafeAreaView>
    ) : null;
}
