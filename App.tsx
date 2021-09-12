import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { apolloClient } from "./src/config/apollo";
import theme, { colorModeManager } from "./src/config/theme";
import useAppStartup from "./src/hooks/useAppStartup";
import MainStack from "./src/routers/main-stack";
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

    if (!appIsReady) {
        return <AppLoading />;
    }

    return (
        <SafeAreaProvider>
            <MainStack />
            <GlobalToast />
        </SafeAreaProvider>
    );
}
