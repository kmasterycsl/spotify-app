import { useCommonStore } from "@/store/common.store";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { gql, useMutation } from "@apollo/client";
import { Mutation } from "@/types/graphql";
import { useEffect } from "react";
import Constants from "expo-constants";

WebBrowser.maybeCompleteAuthSession();

const LOGIN_GOOGLE_MUTATION = gql`
    mutation loginBySocialProvider($idToken: String!, $providerId: String!) {
        loginBySocialProvider(idToken: $idToken, providerId: $providerId) {
            user {
                id
                name
            }
            accessToken
        }
    }
`;

export default function useLoginByGoogle() {
    const actionSetCurrentUser = useCommonStore(state => state.actionSetCurrentUser);
    const actionSetAccessToken = useCommonStore(state => state.actionSetAccessToken);
    const actionSetToastMessage = useCommonStore(state => state.actionSetToastMessage);
    const [loginByGoogle, { data, error }] = useMutation<Mutation>(LOGIN_GOOGLE_MUTATION);

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: Constants?.manifest?.extra?.GOOGLE_EXPO_CLIENT_ID,
        iosClientId: Constants?.manifest?.extra?.GOOGLE_IOS_CLIENT_ID,
        androidClientId: Constants?.manifest?.extra?.GOOGLE_ANDROID_CLIENT_ID,
        webClientId: Constants?.manifest?.extra?.GOOGLE_WEB_CLIENT_ID,
        responseType: ResponseType.IdToken,
    });

    useEffect(() => {
        if (response?.type === "success") {
            loginByGoogle({
                variables: {
                    idToken: response.params.id_token,
                    providerId: "GOOGLE",
                },
            });
        }
    }, [response]);

    useEffect(() => {
        if (!error) {
            if (data) {
                console.log("Token: ", data.loginBySocialProvider.accessToken);
                actionSetCurrentUser(data.loginBySocialProvider.user);
                actionSetAccessToken(data.loginBySocialProvider.accessToken);
                actionSetToastMessage({ title: "Login successfully.", status: "info" });
            }
        } else {
            actionSetToastMessage({ title: error.message, status: "error" });
        }
    }, [data, error]);

    return {
        request,
        response,
        promptAsync,
    };
}
