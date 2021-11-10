import AlbumDetailScreen from "@/screens/AlbumDetailScreen";
import ArtistDetailScreen from "@/screens/ArtistDetailScreen";
import LibraryHomeScreen from "@/screens/LibraryHomeScreen";
import CreatePlaylist from "@/screens/playlist/CreatePlaylist";
import PlaylistDetailScreen from "@/screens/PlaylistDetailScreen";
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
                    name="CreatePlaylist"
                    component={CreatePlaylist}
                    options={{ header: () => null }}
                />
            </LibraryStack.Group>
        </LibraryStack.Navigator>
    );
}
