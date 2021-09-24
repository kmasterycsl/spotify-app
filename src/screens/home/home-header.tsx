import { DEFAULT_HORIZONTAL_PADDING } from "@/shared/components/HorizontalPadding";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { HStack, IconButton, Icon, Text } from "native-base";
import React from "react";

export default function HomeHeader() {
    return (
        <HStack alignItems="center" justifyContent="space-between" pl={DEFAULT_HORIZONTAL_PADDING}>
            <Text fontSize="2xl">Good evening</Text>
            <IconButton
                size="sm"
                variant="ghost"
                icon={
                    <Icon
                        size="sm"
                        color="gray.400"
                        as={<Ionicons name="settings-outline" />}
                    ></Icon>
                }
            />
        </HStack>
    );
}
