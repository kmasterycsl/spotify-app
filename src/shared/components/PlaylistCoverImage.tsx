import Ionicons from "@expo/vector-icons/build/Ionicons";
import { HStack, Icon, useTheme } from "native-base";
import React from "react";
import { Dimensions, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

const screenWidth = Dimensions.get("screen").width;

export default function PlaylistCoverImage({ style }: { style?: ViewStyle }) {
    const { colors } = useTheme();

    return (
        <HStack
            style={{
                width: screenWidth,
                height: screenWidth,
            }}
            bg={"gray.500"}
            justifyContent="center"
            alignItems="center"
        >
            <Animated.View
                style={[
                    {
                        width: screenWidth / 2,
                        height: screenWidth / 2,
                        backgroundColor: colors.gray["700"],
                        justifyContent: "center",
                        alignItems: "center",
                    },
                    style,
                ]}
            >
                <Icon
                    color="gray.200"
                    size={50}
                    as={<Ionicons name={"musical-notes-outline"} />}
                ></Icon>
            </Animated.View>
        </HStack>
    );
}
