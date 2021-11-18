import AddTrackToPlaylistScreen from "@/screens/AddTrackToPlaylistScreen";
import AlbumMenuScreen from "@/screens/album/AlbumMenuScreen";
import AlbumDetailScreen from "@/screens/AlbumDetailScreen";
import ArtistDetailScreen from "@/screens/ArtistDetailScreen";
import LibraryHomeScreen from "@/screens/LibraryHomeScreen";
import PlayerScreen from "@/screens/PlayerScreen";
import CreatePlaylist from "@/screens/playlist/CreatePlaylist";
import PlaylistMenu from "@/screens/playlist/PlaylistMenu";
import PlaylistDetailScreen from "@/screens/PlaylistDetailScreen";
import TrackMenuScreen from "@/screens/track/TrackMenuScreen";
import { RootStackParamList } from "@/types/routes.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const LibraryStack = createNativeStackNavigator<RootStackParamList>();

export default function LibraryStackScreen() {
    return (
        <LibraryStack.Navigator
            initialRouteName="LibraryHome"
            screenOptions={{ header: () => null }}
        >
            <LibraryStack.Screen name="LibraryHome" component={LibraryHomeScreen} />
            <LibraryStack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
            <LibraryStack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
            <LibraryStack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
            <LibraryStack.Group screenOptions={{ presentation: "fullScreenModal" }}>
                <LibraryStack.Screen
                    name="TrackMenu"
                    component={TrackMenuScreen}
                    options={{ header: () => null }}
                />
                <LibraryStack.Screen
                    name="PlaylistMenu"
                    component={PlaylistMenu}
                    options={{ header: () => null }}
                />
                <LibraryStack.Screen
                    name="AlbumMenu"
                    component={AlbumMenuScreen}
                    options={{ header: () => null }}
                />
                <LibraryStack.Screen
                    name="AddTrackToPlaylist"
                    component={AddTrackToPlaylistScreen}
                    options={{ header: () => null }}
                />
                <LibraryStack.Screen
                    name="CreatePlaylist"
                    component={CreatePlaylist}
                    options={{ header: () => null }}
                />
            </LibraryStack.Group>
        </LibraryStack.Navigator>
    );
}
