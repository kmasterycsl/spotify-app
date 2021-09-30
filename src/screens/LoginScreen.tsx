import useLoginByGoogle from "@/hooks/useLoginByGoogle";
import { Button } from "native-base";
import React from "react";

export default function LoginScreen() {
    const { request, response, promptAsync } = useLoginByGoogle();

    React.useEffect(() => {
        if (response?.type === "success") {
            const { authentication } = response;
        }
    }, [response]);

    return (
        <>
            <Button
                disabled={!request}
                onPress={() => {
                    promptAsync();
                }}
            >
                Google
            </Button>
        </>
    );
}
