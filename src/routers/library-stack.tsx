import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LibraryHomeScreen from "@/screens/LibraryHomeScreen";
import { RootStackParamList } from "@/types/routes.types";
import AlbumDetailScreen from "@/screens/AlbumDetailScreen";
import ArtistDetailScreen from "@/screens/ArtistDetailScreen";
import PlaylistDetailScreen from "@/screens/PlaylistDetailScreen";

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
        </LibraryStack.Navigator>
    );
}
