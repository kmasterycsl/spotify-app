import { usePlayerStore } from "@/store/player.store";
import { Track } from "@/types/graphql";
import { Text, useColorModeValue, VStack } from "native-base";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, TouchableOpacity, ViewStyle } from "react-native";
import AnimatedFlatlist from "./AnimatedFlatlist";
import Empty from "./Empty";
import HorizontalPadding from "./HorizontalPadding";
import TracksListItem from "./TrackListItem";
import VerticalPadding from "./VerticalPadding";

export default function TracksList({
    tracks,
    onLoadMore,
    isLoading,
    isFinished,
    headerComponent,
    onScroll,
    styles,
}: {
    tracks: Track[];
    onLoadMore: () => void;
    isLoading: boolean;
    isFinished: boolean;
    onScroll?: any;
    headerComponent?: React.ReactElement | null;
    styles?: {
        listContainer?: ViewStyle;
        footer?: ViewStyle;
    };
}) {
    const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);
    const actionPlay = usePlayerStore(store => store.actionPlay);
    const bgColor = useColorModeValue("white", "black");

    const onPressItem = (track: Track) => {
        actionPlay(track);
    };

    const renderItem = useCallback(
        ({ item, index }: { item: Track; index: number }) => (
            <TouchableOpacity key={item.id} onPress={() => onPressItem(item)}>
                <HorizontalPadding>
                    <TracksListItem track={item} index={index!}></TracksListItem>
                    <VerticalPadding />
                </HorizontalPadding>
            </TouchableOpacity>
        ),
        []
    );

    return (
        <AnimatedFlatlist
            style={styles?.listContainer}
            onScroll={onScroll}
            contentContainerStyle={{
                backgroundColor: bgColor,
            }}
            ListHeaderComponent={headerComponent}
            ListEmptyComponent={<Empty text="There is no song." />}
            data={tracks}
            scrollEventThrottle={16}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            initialNumToRender={10}
            onEndReached={() => {
                setCallOnScrollEnd(true);
            }}
            onMomentumScrollEnd={() => {
                if (callOnScrollEnd) {
                    onLoadMore();
                }
                setCallOnScrollEnd(false);
            }}
            onEndReachedThreshold={0.7}
            ListFooterComponent={
                <VStack style={styles?.footer}>
                    {isLoading && <ActivityIndicator key="indicator" />}
                    {isFinished && (
                        <Text key="text" fontSize="sm" italic textAlign="center">
                            That's all for now
                        </Text>
                    )}
                </VStack>
            }
        />
    );
}
