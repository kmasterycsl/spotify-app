import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../types/routes.types";

export default function HomeScreen() {
  const navigation = useNavigation();

  const goToArtist = (artistId: string) => {
    navigation.navigate("ArtistDetail", { artistId });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button onPress={() => goToArtist("1")} title="Go to detail artist 1"></Button>
      <Button onPress={() => goToArtist("2")} title="Go to detail artist 2"></Button>
      <Button onPress={() => goToArtist("3")} title="Go to detail artist 3"></Button>
    </View>
  );
}
