import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LibraryHomeScreen from "@/screens/LibraryHomeScreen";
import { RootStackParamList } from "@/types/routes.types";
import AlbumDetailScreen from "@/screens/AlbumDetailScreen";
import ArtistDetailScreen from "@/screens/ArtistDetailScreen";

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
        </LibraryStack.Navigator>
    );
}
