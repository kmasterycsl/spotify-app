import { gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import { HStack, Text } from "native-base";
import React from "react";
import { Artist } from "@/types/graphql";

export const ArtistNamesFragment = gql`
    fragment ArtistNamesFragment on Artist {
        id
        name
    }
`;

export default function ArtistNames({ artists, color }: { artists: Artist[]; color?: string }) {
    const nav = useNavigation();

    const goToArtist = (artist: Artist) => {
        nav.navigate("ArtistDetail", { artistId: artist.id });
    };

    return (
        <Text>
            {artists.map((artist, index) => (
                <Text key={artist.id}>
                    <Text fontSize="xs" color={color} onPress={() => goToArtist(artist)}>
                        {artist.name}
                    </Text>
                    {index !== artists.length - 1 && (
                        <Text fontSize="xs" color={color}>
                            {" · "}
                        </Text>
                    )}
                </Text>
            ))}
        </Text>
    );
}
