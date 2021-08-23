import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import React from "react";
import { StyleSheet } from "react-native";
import ArtistDetailScreen from "./src/screens/ArtistDetailScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { RootStackParamList } from "./src/types/routes.types";

// Initialize Apollo Client
const apolloClient = new ApolloClient({
  uri: Constants?.manifest?.extra?.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
        </Stack.Navigator>
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
