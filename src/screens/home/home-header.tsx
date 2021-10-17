import { DEFAULT_HORIZONTAL_PADDING } from "@/shared/components/HorizontalPadding";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { HStack, Icon, IconButton, Text } from "native-base";
import React from "react";

export default function HomeHeader() {
    const nav = useNavigation();

    const goToAccount = () => {
        nav.navigate("Account");
    };

    return (
        <HStack alignItems="center" justifyContent="space-between" px={DEFAULT_HORIZONTAL_PADDING}>
            <Text fontSize="2xl">Good evening</Text>
            <IconButton
                p={0}
                variant="ghost"
                onPress={goToAccount}
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
