import React from "react";
import { View } from "react-native";
import { Track } from "../../types/graphql";
import TracksListItem from "./TracksListItem";
import VerticalPadding from "./VerticalPadding";

export default function TracksList({ tracks }: { tracks: Track[] }) {
  return (
    <View>
      {tracks.map((track, index) => (
        <>
          <TracksListItem
            key={track.id}
            track={track}
            index={index}
          ></TracksListItem>
          {index !== tracks.length - 1 && <VerticalPadding />}
        </>
      ))}
    </View>
  );
}
