import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Button, HStack, Icon, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { Modal, TouchableOpacity, useWindowDimensions } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import shallow from "zustand/shallow";
import { usePlayerStore } from "../../store/player.store";
import { Track } from "../../types/graphql";
import ArtistNames from "./ArtistNames";
import FullWidthSquareImage from "./FullWidthSquareImage";
import { DEFAULT_HORIZONTAL_PADDING } from "./HorizontalPadding";
import SafeAreaView from "./SafeAreaView";
import VerticalPadding from "./VerticalPadding";

interface TrackMenuProps {
    track: Track;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export default function TrackMenu({ track, visible, setVisible }: TrackMenuProps) {
    const [actionAddToQueue, actionRemoveFromQueue, trackInQueue] = usePlayerStore(
        state => [
            state.actionAddToQueue,
            state.actionRemoveFromQueue,
            state.tracksQueue.find(t => t.id === track.id),
        ],
        shallow
    );
    const nav = useNavigation();
    const dimessions = useWindowDimensions();

    const onAddToQueue = () => {
        actionAddToQueue(track);
        setVisible(false);
    };

    const onRemoveFromQueue = () => {
        actionRemoveFromQueue(track);
        setVisible(false);
    };

    const goToAlbum = () => {
        nav.navigate("AlbumDetail", { albumId: track.album.id });
        setVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            presentationStyle="overFullScreen"
            visible={visible}
            style={{ zIndex: -1 }}
        >
            <RootSiblingParent>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>
                        <VStack>
                            {/* Image */}
                            <HStack
                                justifyContent="center"
                                style={{ paddingTop: dimessions.height * 0.2 }}
                            >
                                <FullWidthSquareImage
                                    padding={dimessions.width * 0.3}
                                    url={track.album.coverImage.meta.source}
                                ></FullWidthSquareImage>
                            </HStack>

                            <VerticalPadding />

                            {/* Title */}
                            <VStack alignItems="center">
                                <Text fontWeight="600" fontSize="lg">
                                    {track.name}
                                </Text>
                                <ArtistNames artists={track.artists} />
                            </VStack>

                            <VerticalPadding multiple={3} />

                            {/* Actions */}
                            <VStack>
                                {!trackInQueue ? (
                                    <TouchableOpacity onPress={onAddToQueue}>
                                        <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                            <Icon
                                                size="sm"
                                                as={<Ionicons name="list-outline" />}
                                            ></Icon>
                                            <Text ml={DEFAULT_HORIZONTAL_PADDING}>
                                                Add to queue
                                            </Text>
                                        </HStack>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={onRemoveFromQueue}>
                                        <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                            <Icon
                                                size="sm"
                                                as={<Ionicons name="list-outline" />}
                                            ></Icon>
                                            <Text ml={DEFAULT_HORIZONTAL_PADDING}>
                                                Remove from queue
                                            </Text>
                                        </HStack>
                                    </TouchableOpacity>
                                )}
                                <VerticalPadding />
                                <TouchableOpacity onPress={goToAlbum}>
                                    <HStack px={DEFAULT_HORIZONTAL_PADDING} alignItems="center">
                                        <Icon
                                            size="sm"
                                            as={<Ionicons name="musical-note" />}
                                        ></Icon>
                                        <Text ml={DEFAULT_HORIZONTAL_PADDING}>Go to album</Text>
                                    </HStack>
                                </TouchableOpacity>
                            </VStack>
                        </VStack>
                    </ScrollView>
                    <HStack justifyContent="center">
                        <Button variant="ghost" onPress={() => setVisible(false)}>
                            <Text>Close</Text>
                        </Button>
                    </HStack>
                </SafeAreaView>
            </RootSiblingParent>
        </Modal>
    );
}
