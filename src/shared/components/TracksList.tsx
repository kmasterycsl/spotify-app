import { Box } from "native-base";
import React from "react";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { Track } from "../../types/graphql";
import TracksListItem from "./TracksListItem";
import VerticalPadding from "./VerticalPadding";

export default function TracksList({
  tracks,
  onLoadMore,
}: {
  tracks: Track[];
  onLoadMore: () => void;
}) {
  const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);

  return (
    <FlatList
      data={tracks}
      keyExtractor={(item) => item.id}
      initialNumToRender={10}
      onEndReached={() => setCallOnScrollEnd(true)}
      onMomentumScrollEnd={() => {
        if (callOnScrollEnd) {
          onLoadMore();
        }
        setCallOnScrollEnd(false);
      }}
      renderItem={renderItem}
    ></FlatList>
  );
}

const renderItem = ({ item, index }: { item: Track; index: number }) => (
  <Box>
    <TracksListItem track={item} index={index}></TracksListItem>
    <VerticalPadding />
  </Box>
);
