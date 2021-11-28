import { usePlayerStore } from "@/store/player.store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import {
    Box,
    HStack,
    Icon,
    IconButton,
    Spinner,
    Text,
    useColorModeValue,
    VStack,
} from "native-base";
import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import shallow from "zustand/shallow";
import ArtistNames from "./ArtistNames";
import { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";
import PlayerBarProgress from "./PlayerBarProgress";

export const PLAYER_BAR_HEIGHT = 50;

export default function PlayerBar() {
    const [
        actionPause,
        actionResume,
        playingTrack,
        soundControllerStatusIsLoaded,
        soundControllerStatusIsPlaying,
    ] = usePlayerStore(
        state => [
            state.actionPause,
            state.actionResume,
            state.playingTrack,
            state.soundControllerStatus?.isLoaded,
            state.soundControllerStatus?.isLoaded && state.soundControllerStatus?.isPlaying,
        ],
        shallow
    );
    const nav = useNavigation();
    const bg = useColorModeValue("white", "black");

    const goToPlayer = () => {
        nav.navigate("Player");
    };

    if (!playingTrack) return null;

    return (
        <VStack bg={bg}>
            <TouchableOpacity onPress={goToPlayer}>
                <HStack alignItems="center" space={DEFAULT_HORIZONTAL_PADDING}>
                    <Image
                        style={{
                            width: PLAYER_BAR_HEIGHT,
                            height: PLAYER_BAR_HEIGHT,
                        }}
                        source={{
                            uri: playingTrack.album.coverImage.meta.source,
                        }}
                    ></Image>
                    <VStack
                        justifyContent="space-between"
                        flexShrink={1}
                        flexGrow={1}
                        overflow="hidden"
                    >
                        <Text bold>{playingTrack.name}</Text>
                        <ArtistNames
                            numberOfLines={1}
                            color="white"
                            artists={playingTrack.artists}
                        />
                    </VStack>
                    <Box>
                        {soundControllerStatusIsLoaded && !soundControllerStatusIsPlaying && (
                            <IconButton
                                variant="ghost"
                                size="lg"
                                onPress={actionResume}
                                icon={
                                    <Icon
                                        size="sm"
                                        as={Ionicons}
                                        color="primary.400"
                                        name="play-circle-outline"
                                    ></Icon>
                                }
                            />
                        )}
                        {soundControllerStatusIsLoaded && soundControllerStatusIsPlaying && (
                            <IconButton
                                variant="ghost"
                                size="lg"
                                onPress={actionPause}
                                icon={
                                    <Icon
                                        size="sm"
                                        as={Ionicons}
                                        color="primary.400"
                                        name="pause-circle-outline"
                                    ></Icon>
                                }
                            />
                        )}
                        {!soundControllerStatusIsLoaded && (
                            <IconButton variant="ghost" size="lg" icon={<Spinner size="sm" />} />
                        )}
                    </Box>
                </HStack>
            </TouchableOpacity>
            <PlayerBarProgress />
        </VStack>
    );
}
