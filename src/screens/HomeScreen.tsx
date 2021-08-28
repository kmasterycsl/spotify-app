import { useApolloClient } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";
import { useToast } from "native-base";

export default function HomeScreen() {
  const navigation = useNavigation();
  const client = useApolloClient();
  const toast = useToast();

  const goToArtist = (artistId: string) => {
    navigation.navigate("ArtistDetail", { artistId });
  };

  const resetCache = () => {
    client.clearStore().then(() => {
      toast.show({ title: "Clear cache ok!" });
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button onPress={resetCache} title="Reset cache"></Button>
      <Button
        onPress={() => goToArtist("1")}
        title="Go to detail artist 1"
      ></Button>
      <Button
        onPress={() => goToArtist("2")}
        title="Go to detail artist 2"
      ></Button>
      <Button
        onPress={() => goToArtist("3")}
        title="Go to detail artist 3"
      ></Button>
    </View>
  );
}
