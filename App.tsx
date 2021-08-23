import { ApolloClient, ApolloProvider, gql, InMemoryCache } from "@apollo/client";
import Constants from 'expo-constants';
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Player from "./src/components/Player";


// Initialize Apollo Client
const apolloClient = new ApolloClient({
  uri: Constants?.manifest?.extra?.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const SECTIONS_QUERY = gql`
query Sections {
  getArtists(page: 1, limit: 5) {
    items {
      avatarImage {
        type
      }
    }
    meta {
      itemCount
      currentPage
      totalPages
      totalItems
    }
  }
}
`

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
        <Player />
      </View>
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
