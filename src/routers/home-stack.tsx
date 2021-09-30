import AlbumDetailScreen from "@/screens/AlbumDetailScreen";
import ArtistDetailScreen from "@/screens/ArtistDetailScreen";
import GenreDetailScreen from "@/screens/GenreDetailScreen";
import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import PlaylistDetailScreen from "@/screens/PlaylistDetailScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { RootStackParamList } from "@/types/routes.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

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
