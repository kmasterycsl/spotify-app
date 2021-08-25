import { Box } from "native-base";
import React from "react";
import { View } from "react-native";
import { Track } from "../../types/graphql";
import TracksListItem from "./TracksListItem";
import VerticalPadding from "./VerticalPadding";

export default function TracksList({ tracks }: { tracks: Track[] }) {
  return (
    <View>
      {tracks.map((track, index) => (
        <Box key={track.id}>
          <TracksListItem
            track={track}
            index={index}
          ></TracksListItem>
          {index !== tracks.length - 1 && <VerticalPadding />}
        </Box>
      ))}
    </View>
  );
}
