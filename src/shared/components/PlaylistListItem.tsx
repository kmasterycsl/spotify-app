import { Playlist } from "@/types/graphql";
import { gql } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { Box, Flex, HStack, Text, useTheme, VStack } from "native-base";
import React, { useState } from "react";
import { ViewStyle } from "react-native";
import { ImageMetaFragment } from "../fragments/image-meta.fragment";
import HorizontalPadding, { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export interface IPlaylistsListItemProps {
    playlist: Playlist;
    index?: number;
    style?: ViewStyle;
}

export const PlaylistListItemFragment = gql`
    ${ImageMetaFragment}
    fragment PlaylistListItemFragment on Playlist {
        id
        name
    }
`;

export default React.memo(function PlaylistListItem({ playlist, style }: IPlaylistsListItemProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const { colors } = useTheme();

    const onOpenMenu = () => {
        setMenuVisible(true);
    };

    return (
        <HorizontalPadding>
            <HStack alignItems="center" style={style} space={DEFAULT_HORIZONTAL_PADDING}>
                <Flex
                    width={50}
                    height={50}
                    justifyContent="center"
                    alignItems="center"
                    borderWidth={1}
                    borderColor={colors.primary[500]}
                >
                    <Ionicons
                        name={"musical-notes-outline"}
                        size={28}
                        color={colors.primary[500]}
                    />
                </Flex>
                <VStack justifyContent="space-between" flexGrow={1} flexShrink={1}>
                    <Text numberOfLines={1} bold>
                        {playlist.name}
                    </Text>
                    <Box pt={1} overflow="hidden">
                        <Text fontSize="xs" color="gray.200">
                            Playlist
                        </Text>
                    </Box>
                </VStack>
                {/* <IconButton
                    variant="ghost"
                    onPress={onOpenMenu}
                    icon={<Icon size="xs" as={<Ionicons name="ellipsis-horizontal-outline" />} />}
                /> */}
            </HStack>
        </HorizontalPadding>
    );
});
