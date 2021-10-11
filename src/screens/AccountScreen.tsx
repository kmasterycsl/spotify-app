import useLogout from "@/hooks/useLogout";
import SafeAreaView from "@/shared/components/SafeAreaView";
import { GET_GENRES_QUERY } from "@/shared/queries/GET_GENRES_QUERY";
import { Genre, Query } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { HStack, ScrollView, Text } from "native-base";
import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const screenWidth = Dimensions.get("screen").width;

export default function AccountScreen() {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    const { data, refetch, fetchMore } = useQuery<Query>(GET_GENRES_QUERY, {
        variables: {
            page: 1,
            limit: 9999,
        },
    });

    const logout = useLogout();

    const goToDetail = (genre: Genre) => () => {
        nav.navigate("GenreDetail", { genreId: genre.id });
    };

    const goToSearch = () => {
        nav.navigate("Search");
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <TouchableOpacity onPress={logout}>
                    <HStack flexWrap="wrap" justifyContent="space-between">
                        <Text>Log out</Text>
                    </HStack>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
