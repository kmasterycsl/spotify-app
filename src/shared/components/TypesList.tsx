import { LikeableType } from "@/types/graphql";
import { HStack, Badge } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

export type OBJ_TYPE = LikeableType;
const TYPES: OBJ_TYPE[] = ["TRACK", "ALBUM", "ARTIST", "PLAYLIST"];

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
                        _text={{
                            textTransform: "capitalize",
                        }}
                    >
                        {type + "s"}
                    </Badge>
                </TouchableOpacity>
            ))}
        </HStack>
    );
}
