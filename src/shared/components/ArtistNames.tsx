import { Artist } from "@/types/graphql";
import { gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import { HStack, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

export const ArtistNamesFragment = gql`
    fragment ArtistNamesFragment on Artist {
        id
        name
    }
`;

export default function ArtistNames({ artists, color }: { artists: Artist[]; color?: string }) {
    const nav = useNavigation();

    const goToArtist = (artist: Artist) => {
        nav.navigate({
            name: "ArtistDetail",
            key: `ArtistDetail${artist.id}`,
            params: { artistId: artist.id },
        });
    };

    return (
        <HStack alignItems="flex-end">
            {artists.map((artist, index) => (
                <>
                    <TouchableOpacity key={artist.id} onPress={() => goToArtist(artist)}>
                        <Text fontSize="xs" color={color}>
                            {artist.name}
                        </Text>
                    </TouchableOpacity>
                    {index !== artists.length - 1 && (
                        <Text fontSize="xs" color={color}>
                            {" · "}
                        </Text>
                    )}
                </>
            ))}
        </HStack>
    );
}
