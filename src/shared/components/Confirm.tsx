import { Button, HStack, Text, useColorModeValue, VStack } from "native-base";
import React from "react";
import { Dimensions, Modal } from "react-native";
const screenWidth = Dimensions.get("screen").width;

export default function Confirm({
    visible,
    onOk,
    onCancel,
    content,
    title,
}: {
    visible: boolean;
    content?: string;
    title?: string;
    onOk: () => void;
    onCancel: () => void;
}) {
    const borderColor = useColorModeValue("black", "white");
    const bgColor = useColorModeValue("white", "black");
    const textColor = useColorModeValue("black", "white");
    return (
        <Modal transparent animationType="fade" visible={visible} style={{ zIndex: -1 }}>
            <VStack flex={1} justifyContent="center" alignItems="center">
                <VStack
                    bg={bgColor}
                    width={screenWidth * 0.9}
                    borderWidth={1}
                    borderColor={borderColor}
                    px={5}
                    py={6}
                >
                    <HStack mb={3}>
                        <Text fontSize="xl" fontWeight="bold" color={textColor}>
                            {title || "Confirm"}
                        </Text>
                    </HStack>

                    <HStack mb={5}>
                        <Text color={textColor}>{content || "Are you sure?"}</Text>
                    </HStack>

                    <HStack justifyContent="flex-end">
                        <Button mr={3} colorScheme="green" variant="ghost" onPress={onCancel}>
                            Cancel
                        </Button>
                        <Button colorScheme="danger" onPress={onOk}>
                            OK
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </Modal>
    );
}
