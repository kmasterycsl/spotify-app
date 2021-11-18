import { HStack, Badge } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

export type OBJ_TYPE = "Tracks" | "Playlists" | "Albums" | "Artists";
const TYPES: OBJ_TYPE[] = ["Tracks", "Playlists", "Albums", "Artists"];

export default function TypesList({
    value,
    onChange,
}: {
    value?: OBJ_TYPE;
    onChange: (value: OBJ_TYPE) => void;
}) {
    return (
        <HStack>
            {TYPES.map(type => (
                <TouchableOpacity key={type} onPress={() => onChange(type)}>
                    <Badge
                        colorScheme="primary"
                        borderRadius="50"
                        variant={type === value ? "solid" : "outline"}
                        mr={2}
                        px={2}
                        py={1}
                    >
                        {type}
                    </Badge>
                </TouchableOpacity>
            ))}
        </HStack>
    );
}
