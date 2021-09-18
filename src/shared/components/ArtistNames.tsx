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
        nav.navigate({
            name: "ArtistDetail",
            key: `ArtistDetail${artist.id}`,
            params: { artistId: artist.id },
        });
    };

    return (
        <Text>
            {artists.map((artist, index) => (
                <Text key={artist.id} onPress={() => goToArtist(artist)}>
                    <Text fontSize="xs" color={color}>
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
