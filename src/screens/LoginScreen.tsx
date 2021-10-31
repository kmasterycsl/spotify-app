import useLoginByGoogle from "@/hooks/useLoginByGoogle";
import SafeAreaView from "@/shared/components/SafeAreaView";
import { Button, HStack, Icon, Text } from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import HorizontalPadding from "@/shared/components/HorizontalPadding";
import { Image } from "react-native";

export default function LoginScreen() {
    const { request, response, promptAsync } = useLoginByGoogle();

    React.useEffect(() => {
        if (response?.type === "success") {
            const { authentication } = response;
        }
    }, [response]);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
            <HorizontalPadding style={{ alignItems: "center" }}>
                <Image
                    source={require("../../assets/icon.png")}
                    resizeMode="contain"
                    style={{
                        width: 100,
                        height: 100,
                    }}
                    width={100}
                    height={100}
                />
                <Text fontWeight="600" fontSize="3xl">
                    Millions of songs.
                </Text>
                <Text fontWeight="600" fontSize="3xl">
                    Free on OpenSpotify.
                </Text>
                <Button
                    mt={10}
                    alignSelf="stretch"
                    disabled={!request}
                    onPress={() => {
                        promptAsync();
                    }}
                    variant="outline"
                    borderColor="muted.400"
                    borderRadius="50"
                >
                    <HStack alignItems="center">
                        <Icon as={FontAwesome} name="google" ml="2" color="white" mr={2} />
                        <Text fontWeight="600">Continue with Google</Text>
                    </HStack>
                </Button>
            </HorizontalPadding>
        </SafeAreaView>
    );
}
