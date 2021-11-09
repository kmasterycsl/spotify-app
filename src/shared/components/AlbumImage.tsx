import { ImageMeta, Album } from "@/types/graphql";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Icon, useTheme } from "native-base";
import React from "react";
import { Dimensions, Image, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

const screenWidth = Dimensions.get("screen").width;

export default function AlbumImage({ album, style }: { album: Album; style?: ViewStyle }) {
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
            {album.coverImage ? (
                <Image
                    style={[
                        {
                            width: style?.width,
                            height: style?.width,
                        },
                    ]}
                    resizeMode="cover"
                    source={{
                        uri: (album.coverImage.meta as ImageMeta)?.source,
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
