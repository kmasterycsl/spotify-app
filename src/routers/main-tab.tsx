import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./home-stack";
import LibraryStackScreen from "./library-stack";
import { useCommonStore } from "../store/common.store";

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function MainTab() {
    const currentUser = useCommonStore(state => state.currentUser);

    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeStack" component={HomeStackScreen} />
            <Tab.Screen name="Search" component={SettingsScreen} />
            {currentUser && <Tab.Screen name="Library" component={LibraryStackScreen} />}
        </Tab.Navigator>
    );
}
