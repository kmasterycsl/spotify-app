import { usePlayerStore } from "@/store/player.store";
import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, IconButton, Spinner, Text, useColorModeValue, VStack } from "native-base";
import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import shallow from "zustand/shallow";
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
                            uri: `https://picsum.photos/id/${playingTrack.id}/${50}/${50}`,
                        }}
                    ></Image>
                    <VStack justifyContent="space-between" flexGrow={1}>
                        <Text bold>{playingTrack.name}</Text>
                        <Text fontSize="sm" pt={1}>
                            {+playingTrack.id * 10000}
                        </Text>
                    </VStack>
                    {soundControllerStatusIsLoaded && !soundControllerStatusIsPlaying && (
                        <IconButton
                            variant="ghost"
                            size="lg"
                            onPress={actionResume}
                            icon={
                                <Icon size="sm" as={<Ionicons name="play-circle-outline" />}></Icon>
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
                                    as={<Ionicons name="pause-circle-outline" />}
                                ></Icon>
                            }
                        />
                    )}
                    {!soundControllerStatusIsLoaded && (
                        <IconButton variant="ghost" size="lg" icon={<Spinner size="sm" />} />
                    )}
                </HStack>
            </TouchableOpacity>
            <PlayerBarProgress />
        </VStack>
    );
}
