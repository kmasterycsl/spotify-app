import { Artist } from "@/types/graphql";
import { gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import { HStack, Text } from "native-base";
import React from "react";

export const ArtistNamesFragment = gql`
    fragment ArtistNamesFragment on Artist {
        id
        name
    }
`;

export default function ArtistNames({
    artists,
    color,
    numberOfLines,
}: {
    artists: Artist[];
    color?: string;
    numberOfLines?: number;
}) {
    const nav = useNavigation();

    const text = artists.map(artist => artist.name).join(" · ");

    return (
        <HStack alignItems="flex-end">
            <Text fontSize="xs" color={color} numberOfLines={numberOfLines}>
                {text}
            </Text>
        </HStack>
    );
}
