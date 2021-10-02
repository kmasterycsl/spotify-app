import GenreListItem from "@/shared/components/GenreListItem";
import { _DEFAULT_HORIZONTAL_PADDING } from "@/shared/components/HorizontalPadding";
import SafeAreaView from "@/shared/components/SafeAreaView";
import { GET_GENRES_QUERY } from "@/shared/queries/GET_GENRES_QUERY";
import { Genre, Query } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { HStack, ScrollView } from "native-base";
import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const screenWidth = Dimensions.get("screen").width;

export default function GenreListScreen() {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    const { data, refetch, fetchMore } = useQuery<Query>(GET_GENRES_QUERY, {
        variables: {
            page: 1,
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
                            <GenreListItem
                                style={{
                                    width: (screenWidth * 0.95) / 2,
                                    height: (0.55 * (screenWidth * 0.95)) / 2,
                                    marginBottom: _DEFAULT_HORIZONTAL_PADDING,
                                }}
                                genre={genre}
                            />
                        </TouchableOpacity>
                    ))}
                </HStack>
            </ScrollView>
        </SafeAreaView>
    ) : null;
}
