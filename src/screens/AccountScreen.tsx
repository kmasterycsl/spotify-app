import useLogout from "@/hooks/useLogout";
import HorizontalPadding from "@/shared/components/HorizontalPadding";
import { useCommonStore } from "@/store/common.store";
import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, ScrollView, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function AccountScreen() {
    const currentUser = useCommonStore(store => store.currentUser);
    const logout = useLogout();

    return (
        <ScrollView mt={2}>
            <TouchableOpacity>
                <HorizontalPadding>
                    <HStack flexWrap="wrap" py={3} justifyContent="space-between">
                        <Text>Your name: {currentUser?.name}</Text>
                    </HStack>
                </HorizontalPadding>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
                <HorizontalPadding>
                    <HStack flexWrap="wrap" py={3} justifyContent="space-between">
                        <Text>Sign out</Text>
                        <Icon
                            size="xs"
                            color="gray.400"
                            as={<Ionicons name="chevron-forward-outline" />}
                        ></Icon>
                    </HStack>
                </HorizontalPadding>
            </TouchableOpacity>
        </ScrollView>
    );
}
