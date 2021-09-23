import { Text } from "native-base";
import React, { ReactNode, useState } from "react";
import { ActivityIndicator } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";

export default function InfiniteFlatList<T>({
    data,
    onLoadMore,
    keyExtractor,
    renderItem,
    isLoading,
    isFinished,
    onReorderList,
    numColumns,
}: {
    data: T[];
    onLoadMore: () => void;
    keyExtractor: (item: T) => string;
    renderItem: (params: RenderItemParams<T>) => ReactNode;
    isLoading: boolean;
    isFinished: boolean;
    onReorderList?: (items: T[]) => void;
    numColumns?: number;
}) {
    const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);

    return (
        <DraggableFlatList
            data={data}
            renderItem={renderItem}
            numColumns={numColumns}
            keyExtractor={keyExtractor}
            onDragEnd={({ data }) => onReorderList && onReorderList(data)}
            initialNumToRender={10}
            onEndReached={() => setCallOnScrollEnd(true)}
            onMomentumScrollEnd={() => {
                if (callOnScrollEnd) {
                    onLoadMore();
                }
                setCallOnScrollEnd(false);
            }}
            columnWrapperStyle={
                numColumns && numColumns > 1
                    ? {
                          justifyContent: "space-around",
                      }
                    : undefined
            }
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
