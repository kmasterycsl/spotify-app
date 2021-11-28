import { PLAYER_BAR_HEIGHT } from "@/shared/components/PlayerBar";
import { useCommonStore } from "@/store/common.store";
import { usePlayerStore } from "@/store/player.store";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, useColorModeValue, useTheme } from "native-base";
import * as React from "react";
import HomeStackScreen from "./home-stack";
import LibraryStackScreen from "./library-stack";
import SearchStackScreen from "./search-stack";

function getTabIconName(screenName: string, props: any): React.ReactNode {
    let iconName: typeof Ionicons["name"];
    switch (screenName) {
        case "HomeStack":
            iconName = `home${props.focused ? "-sharp" : "-outline"}`;
            break;
        case "SearchStack":
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
        case "SearchStack":
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

const Tab = createBottomTabNavigator();

export default function MainTab() {
    const currentUser = useCommonStore(state => state.currentUser);
    const isPlayerVisible = usePlayerStore(state => state.isPlayerVisible);
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
                    marginTop: isPlayerVisible ? PLAYER_BAR_HEIGHT + 5 : 0,
                },
                tabBarLabel: props => getTabName(route.name, props),
                header: () => null,
            })}
        >
            <Tab.Screen name="HomeStack" component={HomeStackScreen} />
            <Tab.Screen name="SearchStack" component={SearchStackScreen} />
            {currentUser && <Tab.Screen name="LibraryStack" component={LibraryStackScreen} />}
        </Tab.Navigator>
    );
}
