import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { NativeBaseProvider, theme } from "native-base";
import React, { useReducer } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { apolloClient } from "./src/config/apollo";
import useCustomFonts from "./src/hooks/useCustomFonts";
import MainStack from "./src/routers/main-stack";
import PlayerController from "./src/shared/components/PlayerController";
import { rootReducer } from "./src/store/reducer";
import { AppStateContext, INIT_APP_STATE } from "./src/store/store";

export default function App() {
  const [state, dispatch] = useReducer(rootReducer, INIT_APP_STATE);
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <AppStateContext.Provider value={{ state, dispatch }}>
        <NavigationContainer>
          <SafeAreaProvider>
            <NativeBaseProvider theme={theme}>
              <MainStack />
              <PlayerController />
            </NativeBaseProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </AppStateContext.Provider>
    </ApolloProvider>
  );
}
