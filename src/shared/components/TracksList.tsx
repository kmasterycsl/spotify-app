import React from "react";
import { View } from "react-native";
import { Track } from "../../types/graphql";
import TracksListItem from "./TracksListItem";

export default function TracksList({ tracks }: { tracks: Track[] }) {
  return (
    <View>
      {tracks.map((track) => (
        <TracksListItem key={track.id} track={track}></TracksListItem>
      ))}
    </View>
  );
}
