import { Text, VStack } from "native-base";
import React, { useState } from "react";
import { ActivityIndicator, ListRenderItem, ViewStyle } from "react-native";
import AnimatedFlatlist from "./AnimatedFlatlist";
import Empty from "./Empty";

export default function InfiniteFlatList<T>({
    data,
    onLoadMore,
    keyExtractor,
    renderItem,
    isLoading,
    isFinished,
    numColumns,
    contentContainerStyle,
    onScroll,
    headerComponent,
}: {
    data: T[];
    onLoadMore: () => void;
    keyExtractor: (item: T) => string;
    renderItem: ListRenderItem<T>;
    isLoading: boolean;
    isFinished: boolean;
    numColumns?: number;
    contentContainerStyle?: ViewStyle;
    onScroll?: any;
    headerComponent?: React.ReactElement | null;
}) {
    const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);

    return (
        <AnimatedFlatlist
            contentContainerStyle={contentContainerStyle}
            onScroll={onScroll}
            ListHeaderComponent={headerComponent}
            ListEmptyComponent={<Empty text="There is no data." />}
            data={data}
            scrollEventThrottle={16}
            numColumns={numColumns}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
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
            columnWrapperStyle={
                numColumns && numColumns > 1
                    ? {
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 15,
                      }
                    : undefined
            }
            onEndReachedThreshold={0.7}
            ListFooterComponent={
                <VStack>
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
