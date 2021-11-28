import useHidePlayer from "@/hooks/useHidePlayer";
import { usePlayerStore } from "@/store/player.store";
import { ImageMeta } from "@/types/graphql";
import { adjustColor } from "@/utils/convert";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Box, HStack, Icon, IconButton, Text, VStack } from "native-base";
import React from "react";
import FullWidthSquareImage from "../shared/components/FullWidthSquareImage";
import HorizontalPadding, {
    DEFAULT_HORIZONTAL_PADDING,
    _DEFAULT_HORIZONTAL_PADDING,
} from "../shared/components/HorizontalPadding";
import PlayerBarProgress from "../shared/components/PlayerBarProgress";
import PlayerControls from "../shared/components/PlayerControls";
import PlayerTimeline from "../shared/components/PlayerTimeline";
import SafeAreaView from "../shared/components/SafeAreaView";
import VerticalPadding from "../shared/components/VerticalPadding";

export default React.memo(function PlayerScreen({}: {}) {
    useHidePlayer();
    const playingTrack = usePlayerStore(state => state.playingTrack);
    const actionStop = usePlayerStore(state => state.actionStop);
    const nav = useNavigation();

    if (!playingTrack) return null;

    const onShowPlaylist = () => {
        nav.navigate("PlayerPlaylist");
    };

    const bgColor = adjustColor(
        (playingTrack.album.coverImage.meta as ImageMeta).dominantColor,
        -50
    );

    const onClose = () => {
        actionStop();
        nav.goBack();
    };

    return (
        <SafeAreaView
            style={{
                flexGrow: 1,
                backgroundColor: bgColor,
            }}
            mode="padding"
        >
            <VStack flexGrow={1}>
                {/* Top btns */}
                <Box
                    style={{
                        alignSelf: "stretch",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <IconButton
                        onPress={nav.goBack}
                        icon={
                            <Icon
                                color="white"
                                as={<Ionicons name="chevron-down-outline" />}
                            ></Icon>
                        }
                    />
                    <IconButton
                        onPress={onClose}
                        icon={<Icon color="white" as={<Ionicons name="close-outline" />}></Icon>}
                    />
                </Box>

                <VStack flexGrow={1} justifyContent="center">
                    {/* Image */}
                    <HStack justifyContent="center">
                        <FullWidthSquareImage
                            padding={_DEFAULT_HORIZONTAL_PADDING * 3}
                            url={playingTrack.album.coverImage.meta.source}
                        ></FullWidthSquareImage>
                    </HStack>

                    <VerticalPadding multiple={2} />

                    {/* Song name */}
                    <HStack>
                        <HorizontalPadding>
                            <VStack>
                                <Text fontSize="2xl" fontWeight="600">
                                    {playingTrack.name}
                                </Text>
                                <Text>{playingTrack.name}</Text>
                            </VStack>
                        </HorizontalPadding>
                    </HStack>

                    <VerticalPadding />

                    <HorizontalPadding>
                        <PlayerBarProgress />
                        <PlayerTimeline style={{ marginTop: _DEFAULT_HORIZONTAL_PADDING / 2 }} />
                    </HorizontalPadding>

                    <VerticalPadding />

                    <PlayerControls />

                    {/* Bottom bar */}
                    <HorizontalPadding multiple={(4 + 1.5) / DEFAULT_HORIZONTAL_PADDING}>
                        <HStack justifyContent="flex-end">
                            <IconButton
                                onPress={onShowPlaylist}
                                icon={
                                    <Icon
                                        color="white"
                                        size="sm"
                                        as={<Ionicons name="list-outline" />}
                                    />
                                }
                            ></IconButton>
                        </HStack>
                    </HorizontalPadding>
                </VStack>
            </VStack>
        </SafeAreaView>
    );
});
