import { ImageMeta, Playlist } from "@/types/graphql";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { HStack, Icon, useTheme } from "native-base";
import React from "react";
import { Image, Dimensions, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

const screenWidth = Dimensions.get("screen").width;

export default function PlaylistImage({
    playlist,
    style,
}: {
    playlist: Playlist;
    style?: ViewStyle;
}) {
    const { colors } = useTheme();

    return (
        <Animated.View
            style={[
                {
                    backgroundColor: colors.gray["700"],
                    justifyContent: "center",
                    alignItems: "center",
                },
                style,
            ]}
        >
            {playlist.coverImage ? (
                <Image
                    style={[
                        {
                            width: style?.width,
                            height: style?.width,
                        },
                    ]}
                    resizeMode="cover"
                    source={{
                        uri: (playlist.coverImage.meta as ImageMeta)?.source,
                    }}
                ></Image>
            ) : (
                <Icon
                    color="gray.200"
                    size={50}
                    as={<Ionicons name={"musical-notes-outline"} />}
                ></Icon>
            )}
        </Animated.View>
    );
}
