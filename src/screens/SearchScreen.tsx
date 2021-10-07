import GenreListItem from "@/shared/components/GenreListItem";
import HorizontalPadding, {
    _DEFAULT_HORIZONTAL_PADDING,
} from "@/shared/components/HorizontalPadding";
import SafeAreaView from "@/shared/components/SafeAreaView";
import { GET_GENRES_QUERY } from "@/shared/queries/GET_GENRES_QUERY";
import { Genre, Query } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { HStack, Icon, Text, ScrollView, Input, Box } from "native-base";
import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const screenWidth = Dimensions.get("screen").width;
import { MaterialIcons } from "@expo/vector-icons";
import VerticalPadding from "@/shared/components/VerticalPadding";
import { Badge } from "native-base";

const SEARCH_TYPES = ["Tracks", "Playlists", "Albums", "Artists"];

export default function SearchScreen() {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    // const { data, refetch, fetchMore } = useQuery<Query>(GET_GENRES_QUERY, {
    //     variables: {
    //         page: 1,
    //         limit: 9999,
    //     },
    // });

    // const goToDetail = (genre: Genre) => () => {
    //     nav.navigate("GenreDetail", { genreId: genre.id });
    // };

    // const goToSearch = () => {
    //     nav.navigate("Search");
    // };

    const onCancel = () => {
        nav.goBack();
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
                        <TouchableOpacity key={type}>
                            <Badge
                                colorScheme="primary"
                                borderRadius="50"
                                variant="outline"
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
            <VerticalPadding />
        </SafeAreaView>
    );
}
