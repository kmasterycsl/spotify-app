import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import React, { useReducer } from "react";
import { StyleSheet } from "react-native";
import ArtistDetailScreen from "./src/screens/ArtistDetailScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { RootStackParamList } from "./src/types/routes.types";
import { extendTheme, NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  RobotoMono_400Regular,
} from "@expo-google-fonts/roboto-mono";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import { PaginatedTrack } from "./src/types/graphql";
import { rootReducer } from "./src/store/reducer";
import { AppState, AppStateContext, INIT_APP_STATE } from "./src/store/store";
import PlayerController from "./src/shared/components/PlayerController";

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#e0ffeb",
      100: "#b8f6cf",
      200: "#8eefb1",
      300: "#63e792",
      400: "#39e074",
      500: "#1fc65a",
      600: "#149a45",
      700: "#096e30",
      800: "#00431b",
      900: "#001804",
    },
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
    mono: "RobotoMono",
  },
  config: {
    initialColorMode: "dark",
  },
});

const apolloCache = new InMemoryCache({
  typePolicies: {
    Artist: {
      fields: {
        tracks: {
          keyArgs: false,
          merge(
            existing: PaginatedTrack | undefined,
            incoming: PaginatedTrack
          ) {
            if (existing?.meta.currentPage === incoming.meta.currentPage) {
              return existing;
            }

            return {
              items: [...(existing?.items || []), ...incoming.items],
              meta: incoming.meta,
            };
          },
        },
      },
    },
  },
});

console.log({ apolloCache });

// Initialize Apollo Client
const apolloClient = new ApolloClient({
  uri: Constants?.manifest?.extra?.GRAPHQL_ENDPOINT,
  cache: apolloCache,
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoMono: RobotoMono_400Regular,
    Roboto: Roboto_400Regular,
  });

  const [state, dispatch] = useReducer(rootReducer, INIT_APP_STATE);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <AppStateContext.Provider value={{ state, dispatch }}>
        <NavigationContainer>
          <SafeAreaProvider>
            <NativeBaseProvider theme={theme}>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ header: () => null }}
                />
                <Stack.Screen
                  name="ArtistDetail"
                  component={ArtistDetailScreen}
                  options={{
                    headerTitle: () => null,
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
              <PlayerController />
            </NativeBaseProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </AppStateContext.Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
