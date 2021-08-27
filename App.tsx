import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import React from "react";
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
import {
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";

const theme = extendTheme({
  fonts: {
    heading: "Roboto",
    body: "Roboto",
    mono: "RobotoMono",
  },
});

// Initialize Apollo Client
const apolloClient = new ApolloClient({
  uri: Constants?.manifest?.extra?.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoMono: RobotoMono_400Regular,
    Roboto: Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={apolloClient}>
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
          </NativeBaseProvider>
        </SafeAreaProvider>
      </NavigationContainer>
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
