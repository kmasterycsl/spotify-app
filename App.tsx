import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { NativeBaseProvider, theme } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { apolloClient } from "./src/config/apollo";
import useCustomFonts from "./src/hooks/useCustomFonts";
import MainStack from "./src/routers/main-stack";
import GlobalToast from "./src/shared/components/GlobalToast";

export default function App() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <NavigationContainer>
          <SafeAreaProvider>
            <MainStack />
            <GlobalToast />
          </SafeAreaProvider>
        </NavigationContainer>
      </ApolloProvider>
    </NativeBaseProvider>
  );
}
