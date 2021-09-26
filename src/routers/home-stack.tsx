import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArtistDetailScreen from "@/screens/ArtistDetailScreen";
import HomeScreen from "@/screens/HomeScreen";
import { RootStackParamList } from "@/types/routes.types";
import LoginScreen from "@/screens/LoginScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import AlbumDetailScreen from "@/screens/AlbumDetailScreen";
import PlaylistDetailScreen from "@/screens/PlaylistDetailScreen";
import GenreDetailScreen from "@/screens/GenreDetailScreen";

const HomeStack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStackScreen() {
    return (
        <HomeStack.Navigator initialRouteName="Home" screenOptions={{ header: () => null }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ header: () => null }} />
            <HomeStack.Screen name="Login" component={LoginScreen} />
            <HomeStack.Screen name="Profile" component={ProfileScreen} />
            <HomeStack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
            <HomeStack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
            <HomeStack.Screen name="GenreDetail" component={GenreDetailScreen} />
            <HomeStack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
        </HomeStack.Navigator>
    );
}
