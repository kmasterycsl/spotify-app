import { Box, Text } from "native-base";
import React from "react";
import { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Track } from "../../types/graphql";
import TracksListItem from "./TracksListItem";
import VerticalPadding from "./VerticalPadding";

export default function TracksList({
  tracks,
  onLoadMore,
  isLoading,
  isFinished,
}: {
  tracks: Track[];
  onLoadMore: () => void;
  isLoading: boolean;
  isFinished: boolean;
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
      ListFooterComponent={
        <>
          {isLoading && <ActivityIndicator />}
          {isFinished && (
            <Text fontSize="sm" italic textAlign="center">
              That's all for now
            </Text>
          )}
        </>
      }
    ></FlatList>
  );
}

const renderItem = ({ item, index }: { item: Track; index: number }) => (
  <Box>
    <TracksListItem track={item} index={index}></TracksListItem>
    <VerticalPadding />
  </Box>
);
