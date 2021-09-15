import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LibraryHomeScreen from "../screens/LibraryHomeScreen";
import { RootStackParamList } from "../types/routes.types";

const LibraryStack = createNativeStackNavigator<RootStackParamList>();

export default function LibraryStackScreen() {
    return (
        <LibraryStack.Navigator initialRouteName="LibraryHome">
            <LibraryStack.Screen name="LibraryHome" component={LibraryHomeScreen} />
        </LibraryStack.Navigator>
    );
}
