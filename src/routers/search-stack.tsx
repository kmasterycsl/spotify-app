import AddTrackToPlaylistScreen from "@/screens/AddTrackToPlaylistScreen";
import AlbumMenuScreen from "@/screens/album/AlbumMenuScreen";
import AlbumDetailScreen from "@/screens/AlbumDetailScreen";
import ArtistDetailScreen from "@/screens/ArtistDetailScreen";
import GenreDetailScreen from "@/screens/GenreDetailScreen";
import GenreListScreen from "@/screens/GenreListScreen";
import PlayerScreen from "@/screens/PlayerScreen";
import CreatePlaylist from "@/screens/playlist/CreatePlaylist";
import PlaylistMenu from "@/screens/playlist/PlaylistMenu";
import PlaylistDetailScreen from "@/screens/PlaylistDetailScreen";
import SearchScreen from "@/screens/SearchScreen";
import TrackMenuScreen from "@/screens/track/TrackMenuScreen";
import { RootStackParamList } from "@/types/routes.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const SearchStack = createNativeStackNavigator<RootStackParamList>();

export default function SearchStackScreen() {
    return (
        <SearchStack.Navigator initialRouteName="GenreList" screenOptions={{ header: () => null }}>
            <SearchStack.Screen name="GenreList" component={GenreListScreen} />
            <SearchStack.Screen name="Search" component={SearchScreen} />
            <SearchStack.Screen name="GenreDetail" component={GenreDetailScreen} />
            <SearchStack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
            <SearchStack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
            <SearchStack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
            <SearchStack.Group screenOptions={{ presentation: "fullScreenModal" }}>
                <SearchStack.Screen
                    name="TrackMenu"
                    component={TrackMenuScreen}
                    options={{ header: () => null }}
                />
                <SearchStack.Screen
                    name="PlaylistMenu"
                    component={PlaylistMenu}
                    options={{ header: () => null }}
                />
                <SearchStack.Screen
                    name="AlbumMenu"
                    component={AlbumMenuScreen}
                    options={{ header: () => null }}
                />
                <SearchStack.Screen
                    name="AddTrackToPlaylist"
                    component={AddTrackToPlaylistScreen}
                    options={{ header: () => null }}
                />
                <SearchStack.Screen
                    name="CreatePlaylist"
                    component={CreatePlaylist}
                    options={{ header: () => null }}
                />
            </SearchStack.Group>
        </SearchStack.Navigator>
    );
}
