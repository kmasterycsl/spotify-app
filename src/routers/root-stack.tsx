import AlbumDetailScreen from "@/screens/AlbumDetailScreen";
import ArtistDetailScreen from "@/screens/ArtistDetailScreen";
import GenreDetailScreen from "@/screens/GenreDetailScreen";
import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import PlaylistDetailScreen from "@/screens/PlaylistDetailScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { useCommonStore } from "@/store/common.store";
import { RootStackParamList } from "@/types/routes.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainTab from "./main-tab";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackScreens() {
    const currentUser = useCommonStore(state => state.currentUser);

    return (
        <RootStack.Navigator initialRouteName="Login" screenOptions={{ header: () => null }}>
            {!currentUser && (
                <>
                    <RootStack.Screen name="Login" component={LoginScreen} />
                </>
            )}
            {currentUser && (
                <>
                    <RootStack.Screen name="MainTab" component={MainTab} />
                </>
            )}
        </RootStack.Navigator>
    );
}
