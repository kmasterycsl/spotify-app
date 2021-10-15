import AccountScreen from "@/screens/AccountScreen";
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
        </HomeStack.Navigator>
    );
}
