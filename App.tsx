import RootStackScreens from "@/routers/root-stack";
import PlayerBar from "@/shared/components/PlayerBar";
import { usePlayerStore } from "@/store/player.store";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { Box, NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { apolloClient } from "./src/config/apollo";
import theme, { colorModeManager } from "./src/config/theme";
import useAppStartup from "./src/hooks/useAppStartup";
import { TAB_BAR_HEIGHT } from "./src/routers/main-tab";
import GlobalToast from "./src/shared/components/GlobalToast";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
    return (
        <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
            <ApolloProvider client={apolloClient}>
                <NavigationContainer>
                    <AppBoostraper />
                </NavigationContainer>
            </ApolloProvider>
        </NativeBaseProvider>
    );
}

function AppBoostraper() {
    const appIsReady = useAppStartup();
    const isPlayerVisible = usePlayerStore(store => store.isPlayerVisible);

    if (!appIsReady) {
        return <AppLoading />;
    }

    return (
        <SafeAreaProvider style={{ position: "relative" }}>
            <Box
                position="absolute"
                bottom={isPlayerVisible() ? TAB_BAR_HEIGHT : 0}
                width="100%"
                zIndex={1}
            >
                <PlayerBar />
            </Box>
            <RootStackScreens />
            <GlobalToast />
        </SafeAreaProvider>
    );
}
