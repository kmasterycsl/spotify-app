import { usePlayerStore } from "@/store/player.store";
import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Icon, IconButton, Text } from "native-base";
import React from "react";
import shallow from "zustand/shallow";
import HorizontalPadding, { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";

export default function PlayerControls() {
    const [
        shuffle,
        repeatMode,
        tracksQueue,
        playingIndex,
        soundControllerStatusIsLoaded,
        soundControllerStatusIsPlaying,
        actionToggleShuffleMode,
        actionToggleRepeatMode,
        actionResume,
        actionPause,
        actionNext,
        actionPrev,
    ] = usePlayerStore(
        state => [
            state.shuffle,
            state.repeatMode,
            state.tracksQueue,
            state.playingIndex,
            state.soundControllerStatus?.isLoaded,
            state.soundControllerStatus?.isLoaded && state.soundControllerStatus?.isPlaying,
            state.actionToggleShuffleMode,
            state.actionToggleRepeatMode,
            state.actionResume,
            state.actionPause,
            state.actionNext,
            state.actionPrev,
        ],
        shallow
    );

    return (
        <HorizontalPadding
            style={{ flexGrow: 1 }}
            multiple={(1.5 + 4) / DEFAULT_HORIZONTAL_PADDING}
        >
            <HStack justifyContent="space-between" alignItems="center">
                {/* shuffle */}
                <IconButton
                    onPress={actionToggleShuffleMode}
                    icon={
                        <Icon
                            size="sm"
                            color={shuffle ? "primary.500" : "white"}
                            as={<Ionicons name="shuffle-outline" />}
                        />
                    }
                ></IconButton>

                {/* prev */}
                <IconButton
                    onPress={actionPrev}
                    disabled={playingIndex === undefined ? true : playingIndex < 1}
                    icon={
                        <Icon
                            color={
                                (playingIndex === undefined ? true : playingIndex < 1)
                                    ? "gray.400"
                                    : "white"
                            }
                            size="sm"
                            name="play-skip-back"
                            as={Ionicons}
                        />
                    }
                ></IconButton>

                {/* play/pause */}
                {soundControllerStatusIsLoaded ? (
                    <>
                        {soundControllerStatusIsPlaying && (
                            <IconButton
                                onPress={actionPause}
                                icon={
                                    <Icon
                                        color="white"
                                        size="2xl"
                                        as={<Ionicons name="pause-circle" />}
                                    />
                                }
                            ></IconButton>
                        )}
                        {!soundControllerStatusIsPlaying && (
                            <IconButton
                                onPress={actionResume}
                                icon={
                                    <Icon
                                        color="white"
                                        size="2xl"
                                        as={<Ionicons name="play-circle" />}
                                    />
                                }
                            ></IconButton>
                        )}
                    </>
                ) : (
                    <IconButton
                        disabled
                        icon={
                            <Icon color="white" size="2xl" as={<Ionicons name="play-circle" />} />
                        }
                    ></IconButton>
                )}

                {/* next */}
                <IconButton
                    onPress={actionNext}
                    disabled={
                        playingIndex === undefined ? true : playingIndex >= tracksQueue.length - 1
                    }
                    icon={
                        <Icon
                            color={
                                (
                                    playingIndex === undefined
                                        ? true
                                        : playingIndex >= tracksQueue.length - 1
                                )
                                    ? "gray.400"
                                    : "white"
                            }
                            size="sm"
                            name="play-skip-forward"
                            as={Ionicons}
                        />
                    }
                ></IconButton>

                {/* repeat */}
                {repeatMode === "none" && (
                    <IconButton
                        onPress={actionToggleRepeatMode}
                        icon={
                            <Icon color="white" size="sm" as={<Ionicons name="repeat-outline" />} />
                        }
                    ></IconButton>
                )}
                {repeatMode === "once" && (
                    <IconButton
                        onPress={actionToggleRepeatMode}
                        icon={
                            <Box position="relative">
                                <Icon
                                    size="sm"
                                    color={"primary.500"}
                                    as={<Ionicons name="repeat-outline" />}
                                />
                                <Text
                                    position="absolute"
                                    top={-6}
                                    right={0}
                                    fontSize="xs"
                                    color="primary.500"
                                >
                                    1
                                </Text>
                            </Box>
                        }
                    ></IconButton>
                )}
                {repeatMode === "all" && (
                    <IconButton
                        onPress={actionToggleRepeatMode}
                        icon={
                            <Icon
                                size="sm"
                                color={"primary.500"}
                                as={<Ionicons name="repeat-outline" />}
                            />
                        }
                    ></IconButton>
                )}
            </HStack>
        </HorizontalPadding>
    );
}
