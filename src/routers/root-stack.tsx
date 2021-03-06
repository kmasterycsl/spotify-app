import AccountScreen from "@/screens/AccountScreen";
import AlbumDetailScreen from "@/screens/AlbumDetailScreen";
import ArtistDetailScreen from "@/screens/ArtistDetailScreen";
import GenreDetailScreen from "@/screens/GenreDetailScreen";
import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import PlayerScreen from "@/screens/PlayerScreen";
import PlaylistDetailScreen from "@/screens/PlaylistDetailScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import PlayerPlaylistScreen from "@/shared/components/PlayerListScreen";
import { useCommonStore } from "@/store/common.store";
import { RootStackParamList } from "@/types/routes.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainTab from "./main-tab";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackScreens() {
    const currentUser = useCommonStore(state => state.currentUser);

    return (
        <RootStack.Navigator initialRouteName="Login">
            {!currentUser && (
                <RootStack.Group screenOptions={{ header: () => null }}>
                    <RootStack.Screen name="Login" component={LoginScreen} />
                </RootStack.Group>
            )}
            {currentUser && (
                <>
                    <RootStack.Group screenOptions={{ header: () => null }}>
                        <RootStack.Screen name="MainTab" component={MainTab} />
                    </RootStack.Group>
                </>
            )}
            <RootStack.Group screenOptions={{ presentation: "fullScreenModal" }}>
                <RootStack.Screen
                    name="Player"
                    component={PlayerScreen}
                    options={{ header: () => null }}
                />
                <RootStack.Screen
                    name="PlayerPlaylist"
                    component={PlayerPlaylistScreen}
                    options={{ header: () => null }}
                />
            </RootStack.Group>
        </RootStack.Navigator>
    );
}
