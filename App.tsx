import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { NativeBaseProvider, theme } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { apolloClient } from "./src/config/apollo";
import useCustomFonts from "./src/hooks/useCustomFonts";
import MainStack from "./src/routers/main-stack";
import PlayerController from "./src/shared/components/PlayerController";

export default function App() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <SafeAreaProvider>
          <NativeBaseProvider theme={theme}>
            <MainStack />
            <PlayerController />
          </NativeBaseProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}
