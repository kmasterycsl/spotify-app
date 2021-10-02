import AlbumDetailScreen from "@/screens/AlbumDetailScreen";
import ArtistDetailScreen from "@/screens/ArtistDetailScreen";
import GenreDetailScreen from "@/screens/GenreDetailScreen";
import GenreListScreen from "@/screens/GenreListScreen";
import PlaylistDetailScreen from "@/screens/PlaylistDetailScreen";
import { RootStackParamList } from "@/types/routes.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const SearchStack = createNativeStackNavigator<RootStackParamList>();

export default function SearchStackScreen() {
    return (
        <SearchStack.Navigator initialRouteName="GenreList" screenOptions={{ header: () => null }}>
            <SearchStack.Screen name="GenreList" component={GenreListScreen} />
            <SearchStack.Screen name="GenreDetail" component={GenreDetailScreen} />
            <SearchStack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
            <SearchStack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
            <SearchStack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
        </SearchStack.Navigator>
    );
}
