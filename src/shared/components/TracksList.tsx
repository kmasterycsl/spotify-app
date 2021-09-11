import { Text } from "native-base";
import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { usePlayerStore } from "../../store/player.store";
import { Track } from "../../types/graphql";
import TracksListItem from "./TracksListItem";
import VerticalPadding from "./VerticalPadding";

export default function TracksList({
  tracks,
  onLoadMore,
  isLoading,
  isFinished,
  onReorderList,
}: {
  tracks: Track[];
  onLoadMore: () => void;
  onReorderList?: (tracks: Track[]) => void;
  isLoading: boolean;
  isFinished: boolean;
}) {
  const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);
  const actionPlay = usePlayerStore((store) => store.actionPlay);

  const onPressItem = (track: Track) => {
    actionPlay(track);
  };

  const renderItem = (params: RenderItemParams<Track>) => (
    <TouchableOpacity
      onPress={() => onPressItem(params.item)}
      onLongPress={onReorderList ? params.drag : undefined}
    >
      <TracksListItem
        track={params.item}
        index={params.index!}
      ></TracksListItem>
      <VerticalPadding />
    </TouchableOpacity>
  );

  return (
    <DraggableFlatList
      data={tracks}
      renderItem={renderItem}
      keyExtractor={(item) => `draggable-item-${item.id}`}
      onDragEnd={({ data }) => onReorderList && onReorderList(data)}
      initialNumToRender={10}
      onEndReached={() => setCallOnScrollEnd(true)}
      onMomentumScrollEnd={() => {
        if (callOnScrollEnd) {
          onLoadMore();
        }
        setCallOnScrollEnd(false);
      }}
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
    />
  );
}
