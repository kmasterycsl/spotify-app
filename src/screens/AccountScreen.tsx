import useLogout from "@/hooks/useLogout";
import HorizontalPadding from "@/shared/components/HorizontalPadding";
import SafeAreaView from "@/shared/components/SafeAreaView";
import { GET_GENRES_QUERY } from "@/shared/queries/GET_GENRES_QUERY";
import { useCommonStore } from "@/store/common.store";
import { Genre, Query } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { HStack, Icon, ScrollView, Text } from "native-base";
import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const screenWidth = Dimensions.get("screen").width;
import { Ionicons } from "@expo/vector-icons";

export default function AccountScreen() {
    const insets = useSafeAreaInsets();
    const currentUser = useCommonStore(store => store.currentUser);
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
        <ScrollView mt={2}>
            <TouchableOpacity>
                <HorizontalPadding>
                    <HStack flexWrap="wrap" py={3} justifyContent="space-between">
                        <Text>Your name: {currentUser?.name}</Text>
                    </HStack>
                </HorizontalPadding>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
                <HorizontalPadding>
                    <HStack flexWrap="wrap" py={3} justifyContent="space-between">
                        <Text>Sign out</Text>
                        <Icon
                            size="xs"
                            color="gray.400"
                            as={<Ionicons name="chevron-forward-outline" />}
                        ></Icon>
                    </HStack>
                </HorizontalPadding>
            </TouchableOpacity>
        </ScrollView>
    );
}
