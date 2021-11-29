import GenreListItem from "@/shared/components/GenreListItem";
import HorizontalPadding, {
    _DEFAULT_HORIZONTAL_PADDING,
} from "@/shared/components/HorizontalPadding";
import SafeAreaView from "@/shared/components/SafeAreaView";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { GET_GENRES_QUERY } from "@/shared/queries/GET_GENRES_QUERY";
import { Genre, Query } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HStack, Icon, ScrollView, Text } from "native-base";
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
            limit: 9999,
        },
    });

    const goToDetail = (genre: Genre) => () => {
        nav.navigate("GenreDetail", { genreId: genre.id });
    };

    const goToSearch = () => {
        nav.navigate("Search");
    };

    return data?.genres ? (
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
            <HorizontalPadding>
                <TouchableOpacity onPress={goToSearch}>
                    <HStack bg="white" px={2} py={2} borderRadius={5} alignItems="center">
                        <Icon
                            as={<MaterialIcons name="search" />}
                            size={6}
                            ml="2"
                            color="muted.400"
                            mr={2}
                        />
                        <Text color="black">Artists, tracks or playlists</Text>
                    </HStack>
                </TouchableOpacity>
            </HorizontalPadding>
            <VerticalPadding />
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <HorizontalPadding>
                    <HStack flexWrap="wrap" justifyContent="space-between">
                        {data.genres.items.map((genre, index) => (
                            <TouchableOpacity
                                key={genre.id}
                                onPress={goToDetail(genre)}
                                style={{
                                    width: (screenWidth - _DEFAULT_HORIZONTAL_PADDING * 3) / 2,
                                    marginRight:
                                        index % 2 === 0 ? _DEFAULT_HORIZONTAL_PADDING / 2 : 0,
                                    marginLeft:
                                        index % 2 === 0 ? 0 : _DEFAULT_HORIZONTAL_PADDING / 2,
                                }}
                            >
                                <GenreListItem
                                    style={{
                                        height:
                                            (0.55 *
                                                (screenWidth - _DEFAULT_HORIZONTAL_PADDING * 3)) /
                                            2,
                                        marginBottom: _DEFAULT_HORIZONTAL_PADDING,
                                    }}
                                    genre={genre}
                                />
                            </TouchableOpacity>
                        ))}
                    </HStack>
                </HorizontalPadding>
            </ScrollView>
        </SafeAreaView>
    ) : null;
}
