import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { apolloClient } from "./src/config/apollo";
import useCustomFonts from "./src/hooks/useCustomFonts";
import useDebugStore from "./src/hooks/useDebugStore";
import MainStack from "./src/routers/main-stack";
import GlobalToast from "./src/shared/components/GlobalToast";
import theme, { colorModeManager } from "./src/config/theme";

export default function App() {
  useDebugStore();
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
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
