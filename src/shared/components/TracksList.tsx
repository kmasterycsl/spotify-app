import { Text } from "native-base";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { useStore } from "../../store/store";
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
  const actionPlay = useStore((store) => store.actionPlay);

  const onPressItem = (track: Track) => {
    actionPlay(track);
  };

  const renderItem = ({ item, index }: { item: Track; index: number }) => (
    <TouchableOpacity onPress={() => onPressItem(item)}>
      <TracksListItem track={item} index={index}></TracksListItem>
      <VerticalPadding />
    </TouchableOpacity>
  );

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
      onEndReachedThreshold={0.7}
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
