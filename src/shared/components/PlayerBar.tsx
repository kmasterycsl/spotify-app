import { usePlayerStore } from "@/store/player.store";
import { Ionicons } from "@expo/vector-icons";
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
import Player from "./Player";
import PlayerBarProgress from "./PlayerBarProgress";

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

    const [modalVisible, setModalVisible] = useState(false);
    const bg = useColorModeValue("white", "black");

    if (!playingTrack) return null;

    return (
        <VStack bg={bg}>
            <Player visible={modalVisible} setVisible={setModalVisible} />

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <HStack alignItems="center" space={DEFAULT_HORIZONTAL_PADDING}>
                    <Image
                        style={{
                            width: 50,
                            height: 50,
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
                        <ArtistNames color="white" artists={playingTrack.artists} />
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
