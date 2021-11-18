import AccountScreen from "@/screens/AccountScreen";
import AddTrackToPlaylistScreen from "@/screens/AddTrackToPlaylistScreen";
import AlbumMenuScreen from "@/screens/album/AlbumMenuScreen";
import AlbumDetailScreen from "@/screens/AlbumDetailScreen";
import ArtistDetailScreen from "@/screens/ArtistDetailScreen";
import GenreDetailScreen from "@/screens/GenreDetailScreen";
import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import PlayerScreen from "@/screens/PlayerScreen";
import CreatePlaylist from "@/screens/playlist/CreatePlaylist";
import PlaylistMenu from "@/screens/playlist/PlaylistMenu";
import PlaylistDetailScreen from "@/screens/PlaylistDetailScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import TrackMenuScreen from "@/screens/track/TrackMenuScreen";
import { RootStackParamList } from "@/types/routes.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const HomeStack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStackScreen() {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ header: () => null }} />
            <HomeStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ header: () => null }}
            />
            <HomeStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ header: () => null }}
            />
            <HomeStack.Screen
                name="AlbumDetail"
                component={AlbumDetailScreen}
                options={{ header: () => null }}
            />
            <HomeStack.Screen
                name="ArtistDetail"
                component={ArtistDetailScreen}
                options={{ header: () => null }}
            />
            <HomeStack.Screen
                name="GenreDetail"
                component={GenreDetailScreen}
                options={{ header: () => null }}
            />
            <HomeStack.Screen
                name="PlaylistDetail"
                component={PlaylistDetailScreen}
                options={{ header: () => null }}
            />
            <HomeStack.Screen
                name="Account"
                component={AccountScreen}
                options={{ headerShown: true }}
            />
            <HomeStack.Group screenOptions={{ presentation: "fullScreenModal" }}>
                <HomeStack.Screen
                    name="TrackMenu"
                    component={TrackMenuScreen}
                    options={{ header: () => null }}
                />
                <HomeStack.Screen
                    name="PlaylistMenu"
                    component={PlaylistMenu}
                    options={{ header: () => null }}
                />
                <HomeStack.Screen
                    name="AlbumMenu"
                    component={AlbumMenuScreen}
                    options={{ header: () => null }}
                />
                <HomeStack.Screen
                    name="AddTrackToPlaylist"
                    component={AddTrackToPlaylistScreen}
                    options={{ header: () => null }}
                />
                <HomeStack.Screen
                    name="CreatePlaylist"
                    component={CreatePlaylist}
                    options={{ header: () => null }}
                />
            </HomeStack.Group>
        </HomeStack.Navigator>
    );
}
