import { FlatList, Text, VStack } from "native-base";
import React, { ReactNode, useCallback, useState } from "react";
import { ActivityIndicator, TouchableOpacity, ViewStyle } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { usePlayerStore } from "../../store/player.store";
import { Track } from "../../types/graphql";
import TracksListItem from "./TracksListItem";
import VerticalPadding from "./VerticalPadding";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
} from "react-native-reanimated";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList/types";

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

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
    headerComponent?: React.ReactElement;
    styles?: {
        listContainer?: ViewStyle;
        footer?: ViewStyle;
    };
}) {
    const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);
    const actionPlay = usePlayerStore(store => store.actionPlay);

    const onPressItem = (track: Track) => {
        actionPlay(track);
    };

    const renderItem = useCallback(
        ({ item, index }: { item: Track; index: number }) => (
            <TouchableOpacity key={item.id} onPress={() => onPressItem(item)}>
                <TracksListItem track={item} index={index!}></TracksListItem>
                <VerticalPadding />
            </TouchableOpacity>
        ),
        []
    );

    return (
        <AnimatedFlatlist
            style={styles?.listContainer}
            onScroll={onScroll}
            ListHeaderComponent={headerComponent}
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
