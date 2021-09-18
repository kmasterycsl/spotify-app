import * as React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./home-stack";
import LibraryStackScreen from "./library-stack";
import { useCommonStore } from "@/store/common.store";
import { Ionicons } from "@expo/vector-icons";
import { useColorModeValue, useTheme, Text } from "native-base";

export const TAB_BAR_HEIGHT = 75;

function getTabIconName(screenName: string, props: any): React.ReactNode {
    let iconName: typeof Ionicons["name"];
    switch (screenName) {
        case "HomeStack":
            iconName = `home${props.focused ? "-sharp" : "-outline"}`;
            break;
        case "Search":
            iconName = `search${props.focused ? "-sharp" : "-outline"}`;
            break;
        case "LibraryStack":
            iconName = `library${props.focused ? "-sharp" : "-outline"}`;
            break;
        default:
            iconName = "ios-information-circle";
            break;
    }

    return <Ionicons name={iconName as any} size={18} color={props.color} />;
}

function getTabName(screenName: string, props: any): React.ReactNode {
    switch (screenName) {
        case "HomeStack":
            return (
                <Text fontSize="sm" color={props.color}>
                    Home
                </Text>
            );
        case "Search":
            return (
                <Text fontSize="sm" color={props.color}>
                    Search
                </Text>
            );
        case "LibraryStack":
            return (
                <Text fontSize="sm" color={props.color}>
                    Library
                </Text>
            );
        default:
            return <Text></Text>;
    }
}

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
    const bg = useColorModeValue("white", "black");
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: props => getTabIconName(route.name, props),
                tabBarActiveTintColor: colors.primary["300"],
                tabBarStyle: {
                    backgroundColor: bg,
                    paddingTop: 10,
                    height: TAB_BAR_HEIGHT,
                },
                tabBarLabel: props => getTabName(route.name, props),
                header: () => null,
            })}
        >
            <Tab.Screen name="HomeStack" component={HomeStackScreen} />
            <Tab.Screen name="Search" component={SettingsScreen} />
            {currentUser && <Tab.Screen name="LibraryStack" component={LibraryStackScreen} />}
        </Tab.Navigator>
    );
}
