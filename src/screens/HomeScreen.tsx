import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../types/routes.types";

export default function HomeScreen() {
  const navigation = useNavigation();

  const goToArtist = () => {
    navigation.navigate("ArtistDetail", { artistId: "1" });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button onPress={goToArtist} title="Go to detail artist"></Button>
    </View>
  );
}
