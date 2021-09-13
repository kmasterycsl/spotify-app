import { FlatList, Text } from "native-base";
import React, { ReactNode, useState } from "react";
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

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

export default function TracksList({
    tracks,
    onLoadMore,
    isLoading,
    isFinished,
    onReorderList,
    headerComponent,
    onScroll,
    style,
}: {
    tracks: Track[];
    onLoadMore: () => void;
    onReorderList?: (tracks: Track[]) => void;
    isLoading: boolean;
    isFinished: boolean;
    onScroll?: any;
    headerComponent?: React.ReactElement;
    style?: ViewStyle;
}) {
    const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);
    const actionPlay = usePlayerStore(store => store.actionPlay);

    const onPressItem = (track: Track) => {
        actionPlay(track);
    };

    const renderItem = ({ item, index }: { item: Track; index: number }) => (
        <TouchableOpacity key={item.id} onPress={() => onPressItem(item)}>
            <TracksListItem track={item} index={index!}></TracksListItem>
            <VerticalPadding />
        </TouchableOpacity>
    );

    return (
        <AnimatedFlatlist
            style={style}
            onScroll={onScroll}
            ListHeaderComponent={headerComponent}
            data={tracks}
            scrollEventThrottle={16}
            renderItem={renderItem}
            keyExtractor={item => `draggable-item-${item.id}`}
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
