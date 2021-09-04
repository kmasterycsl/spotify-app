import { useApolloClient } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";
import { useColorMode, useToast } from "native-base";
import PlayerBar from "../shared/components/PlayerBar";
import useLogout from "../hooks/useLogout";
import { useCommonStore } from "../store/common.store";

export default function HomeScreen() {
  const navigation = useNavigation();
  const client = useApolloClient();
  const toast = useToast();
  const { toggleColorMode } = useColorMode();
  const logout = useLogout();
  const currentUser = useCommonStore((state) => state.currentUser);

  const goToArtist = (artistId: string) => {
    navigation.navigate("ArtistDetail", { artistId });
  };

  const goToLogin = () => {
    navigation.navigate("Login", {});
  };
  const goToProfile = () => {
    navigation.navigate("Profile", {});
  };

  const resetCache = () => {
    client.clearStore().then(() => {
      toast.show({ title: "Clear cache ok!" });
    });
  };

  const toggleDark = () => {
    toggleColorMode();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button onPress={toggleDark} title="Toggle dark"></Button>
      <Button onPress={resetCache} title="Reset cache"></Button>
      {!currentUser && (
        <Button onPress={() => goToLogin()} title="Go to login"></Button>
      )}
      <Button onPress={() => goToProfile()} title="Go to profile"></Button>
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
      {currentUser && (
        <Button
          onPress={() => {
            logout();
          }}
          title="Logout"
        ></Button>
      )}
    </View>
  );
}
