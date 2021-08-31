import { Button } from "native-base";
import React from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "1046589284135-jlm6k2ob8opn14vppvjh6sueqmk1e7sj.apps.googleusercontent.com",
    iosClientId: "1046589284135-jlm6k2ob8opn14vppvjh6sueqmk1e7sj.apps.googleusercontent.com",
    androidClientId: "1046589284135-jlm6k2ob8opn14vppvjh6sueqmk1e7sj.apps.googleusercontent.com",
    webClientId: "1046589284135-jlm6k2ob8opn14vppvjh6sueqmk1e7sj.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;

      console.log({ response });
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
    >
      Google
    </Button>
  );
}
