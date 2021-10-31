import { Artist } from "@/types/graphql";
import { Text } from "native-base";
import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import HorizontalPadding from "./HorizontalPadding";
import SafeAreaView from "./SafeAreaView";
import VerticalPadding from "./VerticalPadding";

interface TrackArtistsProps {
    artists: Artist[];
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onPressArtist: (artist: Artist) => void;
}

export default function TrackArtists({
    artists,
    visible,
    setVisible,
    onPressArtist,
}: TrackArtistsProps) {
    const goToArtist = (artist: Artist) => {
        setVisible(false);
        onPressArtist(artist);
    };

    return (
        <Modal animationType="slide" visible={visible} onRequestClose={() => setVisible(false)}>
            <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
                <HorizontalPadding>
                    <Text fontSize="xl" fontWeight="600">
                        Artists
                    </Text>
                </HorizontalPadding>
                <VerticalPadding />
                {artists.map(artist => (
                    <HorizontalPadding key={artist.id}>
                        <TouchableOpacity onPress={() => goToArtist(artist)}>
                            <Text>{artist.name}</Text>
                        </TouchableOpacity>
                        <VerticalPadding />
                    </HorizontalPadding>
                ))}
            </SafeAreaView>
        </Modal>
    );
}
