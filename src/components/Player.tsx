import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import { gql, useQuery } from "@apollo/client";

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

export default function Player() {
  const { data, loading, error } = useQuery(SECTIONS_QUERY);

  const [sound, setSound] = React.useState<Audio.Sound>();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/demo.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return <Button title={"Play Sound" + data?.getArtists?.items?.[0]?.avatarImage?.type} onPress={playSound} />;
}
