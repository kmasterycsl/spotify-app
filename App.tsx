import RootStackScreens from "@/routers/root-stack";
import PlayerBar from "@/shared/components/PlayerBar";
import { useCommonStore } from "@/store/common.store";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { apolloClient } from "./src/config/apollo";
import theme, { colorModeManager, navigationTheme } from "./src/config/theme";
import useAppStartup from "./src/hooks/useAppStartup";
import GlobalToast from "./src/shared/components/GlobalToast";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
    return (
        <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
            <ApolloProvider client={apolloClient}>
                <NavigationContainer theme={navigationTheme}>
                    <StatusBar style="light" />
                    <AppBoostraper />
                </NavigationContainer>
            </ApolloProvider>
        </NativeBaseProvider>
    );
}

function AppBoostraper() {
    const appIsReady = useAppStartup();
    const bottomHeight = useCommonStore(store => store.bottomTabHeight);

    if (!appIsReady) {
        return <AppLoading />;
    }

    return (
        <SafeAreaProvider style={{ position: "relative" }}>
            <Box position="absolute" bottom={bottomHeight} width="100%" zIndex={1}>
                <PlayerBar />
            </Box>
            <RootStackScreens />
            <GlobalToast />
        </SafeAreaProvider>
    );
}
