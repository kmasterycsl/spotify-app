import { Playlist } from "@/types/graphql";
import { Ionicons } from "@expo/vector-icons";
import { Box, Flex, HStack, Text, useTheme, VStack } from "native-base";
import React from "react";
import { ViewStyle } from "react-native";

export interface IPlaylistsListItemProps {
    playlist: Playlist;
    index?: number;
    style?: ViewStyle;
    hideSubtitle?: boolean;
    showType?: boolean;
}

export default React.memo(function PlaylistListItem({
    playlist,
    style,
    hideSubtitle,
    showType,
}: IPlaylistsListItemProps) {
    const { colors } = useTheme();

    return (
        <HStack alignItems="center" style={style} space={2}>
            <Flex
                width={50}
                height={50}
                justifyContent="center"
                alignItems="center"
                borderWidth={1}
                borderColor={colors.primary[500]}
            >
                <Ionicons name={"musical-notes-outline"} size={28} color={colors.primary[500]} />
            </Flex>
            <VStack justifyContent="space-between" flexGrow={1} flexShrink={1}>
                <Text numberOfLines={2} fontSize="sm">
                    {playlist.name}
                </Text>
                {!hideSubtitle && (
                    <Box pt={1} overflow="hidden">
                        <Text fontSize="xs" color="gray.200">
                            {showType && <Text fontSize="xs">Playlist · </Text>}
                            {playlist.tracksCount || 0} songs
                        </Text>
                    </Box>
                )}
            </VStack>
        </HStack>
    );
});
