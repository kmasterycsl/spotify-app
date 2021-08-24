import React from "react";
import { View, Text } from "react-native";
import { Track } from "../../types/graphql";

export default function TracksListItem({ track }: { track: Track }) {
    return (
        <View>
            <Text>{track.name}</Text>
        </View>
    )
}
